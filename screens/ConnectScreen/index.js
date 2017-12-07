import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { styles, colors } from '../../config/styles';
import '../../shim.js'
import { RSA } from 'react-native-rsa-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import crypto from 'crypto'
import { NetworkInfo } from 'react-native-network-info';

global.Buffer = global.Buffer || require('buffer').Buffer
const dgram = require('react-native-udp')
const net = require('react-native-tcp')

export default class ConnectScreen extends React.Component {
  state = {
    key: null,
    heartbeatTimer: null,
    serverSocket:null
  };

  componentWillMount() {
    RNSecureKeyStore.get("keypub")
    .then(keypub => {
      RNSecureKeyStore.get("keypriv")
      .then(keypriv => {
        RNSecureKeyStore.get("id")
        .then(id => {
          RNSecureKeyStore.get("keyPC")
          .then(keyPC => {
            RNSecureKeyStore.get("username")
            .then(username => {
              RNSecureKeyStore.get("keyFile")
              .then(keyFile => {
                NetworkInfo.getIPAddress(ip => {
                  // CREATE WEBSOCKET FOR TCP LINK
                  const server = net.createServer(socket => {
                    socket.on('error', error => {
                      // alert('error')
                    })
                    //console.log('Connection Established')
                    socket.on('data', message => {
                      //console.log('Received: ' + message)
                      const data = crypto.privateDecrypt(keypriv, message).toString('utf8').split(' ')
                      //const data = message.toString('utf8').split(' ')
                      //if (validateTimestamp(parseInt(data[0])) TODOOOOOOOOOOO
                      const sessionKey = Buffer.from(data[1], 'hex')
                      const timestamp = Date.now()
                      const newMsg = timestamp + ' ' + keyFile.toString('hex')
                      const iv = '0000000000000000'
                      //console.log('Session key: ' + sessionKey.toString('hex'))
                      const cipher = crypto.createCipheriv('aes192', sessionKey, iv)
                      //console.log('Sending kfile: ' + key.toString('hex'))
                      let encryptedMsg = cipher.update(newMsg, 'utf8', 'hex')
                      encryptedMsg += cipher.final('hex')
                      encryptedMsg = Buffer.from(encryptedMsg, 'hex')
                      socket.write(encryptedMsg)
                      // Start sending Heartbeats
                      const timer = setInterval(() => {
                        const timestamp = Date.now()
                        const cipher = crypto.createCipheriv('aes192', sessionKey, iv)
                        let encryptedTimestamp = cipher.update(timestamp.toString(), 'utf8', 'hex')
                        encryptedTimestamp += cipher.final('hex')
                        //console.log('Sending Heartbeat')
                        socket.write(Buffer.from(encryptedTimestamp, 'hex'))
                      }, 5 * 1000)
                      this.setState({heartbeatTimer: timer})
                    })
                  }).listen(8080)
                  this.setState({serverSocket: server})

                  // SEND UDP BROADCAST ANNOUNCEMENT
                  let ipbroadcast = ip.split(".")
                  ipbroadcast = ipbroadcast[0]+'.'+ipbroadcast[1]+'.'+ipbroadcast[2]+'.255'
                  const PORT = 12345
              
                  const message = Buffer.from(ip + ' ' + id + ' ' + username)
                
                  const client = dgram.createSocket('udp4')
                  client.send(message, 0, message.length, PORT, ipbroadcast, function (err, bytes) {
                    if (err) throw err
                    client.close()
                  })
                })
              })
            })
          })
        })
      })
    })
  }

  componentWillUnmount() {
    if (this.state.heartbeatTimer != null) {
      clearInterval(this.state.heartbeatTimer)
    }
    if (this.state.serverSocket != null) {
      this.state.serverSocket.close()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Gwarant</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color={colors.PRIMARY_COLOR}
            title='STOP'
            onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
          />
        </View>
      </View>
    );
  }
}

ConnectScreen.propTypes = {
  navigation: PropTypes.any.isRequired
};