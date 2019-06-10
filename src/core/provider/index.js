'use strict'

const errCode = require('err-code')
const promisify = require('promisify-es6')

const CID = require('cids')

const Reprovider = require('./reprovider')

class Provider {
  /**
   * Provider goal is to announce blocks to the network.
   * It keeps track of which blocks are provided, and allow them to be reprovided
   * @param {*} libp2p
   * @param {*} blockstore
   * @param {object} options
   * @memberof Provider
   */
  constructor(libp2p, blockstore, options) {
    // the CIDs for which provide announcements should be made
    // this.tracker = [] // TODO queue
    this._running = false

    this._contentRouting = libp2p.contentRouting
    this._blockstore = blockstore

    this.reprovider = new Reprovider(this._contentRouting, this._blockstore, options)
  }

  /**
   * Begin processing the provider work
   */
  start () {
    // do not run twice
    if (this._running) {
      return
    }

    this._running = true

    // Start reprovider
    this.reprovider.start()
  }

  /**
   * Stop the provider
   */
  stop () {
    this._running = true

    // stop the reprovider
    return this.reprovider.stop()
  }

  /**
   * Announce block to the network and add and entry to the tracker
   * Takes a cid and makes an attempt to announce it to the network
   */
  async provide (cid) {
    if (!CID.isCID(key)) {
      throw errCode('invalid CID to provide', 'ERR_INVALID_CID')
    }

    await promisify((callback) => {
      this._contentRouting.provide(cid, callback)
    })
  }

  async findProviders (cid, options) {
    if (!CID.isCID(key)) {
      throw errCode('invalid CID to find', 'ERR_INVALID_CID')
    }

    return promisify((callback) => {
      this._contentRouting.findProviders(cid, options, callback)
    })
  }
}

exports = module.exports = Provider
