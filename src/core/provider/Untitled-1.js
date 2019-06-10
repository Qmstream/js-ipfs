'use strict'

// Libp2p Core
const { createLibp2p } = require('libp2p')
// Transports
const TCP = require('libp2p-tcp')
const Websockets = require('libp2p-websockets')
// Stream Muxer
const Mplex = require('pull-mplex')
// Connection Encryption
const Secio = require('libp2p-secio')
// Chat protocol
const ChatProtocol = require('./chat-protocol')

// Create the Node
createLibp2p({
  modules: {
    transport: [ TCP, Websockets ],
    streamMuxer: [ Mplex ]
  }
}, (err, libp2p) => {
  if (err) throw err

  // Wildcard listen on TCP and Websocket
  libp2p.peerInfo.multiaddrs.add('/ip4/0.0.0.0/tcp/0')
  libp2p.peerInfo.multiaddrs.add('/ip4/0.0.0.0/tcp/0/ws')

  // Listener for peer connection events
  libp2p.on('peer:connect', (peerInfo) => {
    console.info(`Connected to ${peerInfo.id.toB58String()}!`)
  })

  // Add chat handler
  libp2p.handle(ChatProtocol.PROTOCOL, ChatProtocol.handler)

  // Start libp2p
  libp2p.start((err) => {
    if (err) throw err

    libp2p.dialProtocol(peerInfo, ChatProtocol.PROTOCOL, (err, stream) => {
      if (err) return console.error('Could not negotiate chat protocol stream with peer', err)
      ChatProtocol.send(message, stream)
    })
  })
})

createLibp2p({
  modules: {
    transport: [TCP, Websockets],
    streamMuxer: [Mplex]
  },
  EXPERIMENTAL: {
    pubsub: true
  }
}, (err, libp2p) => {
  if (err) throw err

  // Wildcard listen on TCP and Websocket
  libp2p.peerInfo.multiaddrs.add('/ip4/0.0.0.0/tcp/0')
  libp2p.peerInfo.multiaddrs.add('/ip4/0.0.0.0/tcp/0/ws')

  // Listener for peer connection events
  libp2p.on('peer:connect', (peerInfo) => {
    console.info(`Connected to ${peerInfo.id.toB58String()}!`)
  })

  // -->
})