'use strict'


// TODO Provide queue?
// All keys reprovided 12 in 12h?

const initialDelay = 10000

class Reprovider {
  /**
   * Reprovider goal is to reannounce blocks to the network.
   * @param {*} contentRouting
   * @param {*} blockstore
   * @param {*} options
   * @memberof Reprovider
   */
  constructor (contentRouting, blockstore, options) {
    this._contentRouting = contentRouting
    this._blockstore = blockstore // use query({})
    this._options = options

    this._running = false
  }

  /**
   * Begin processing the reprovider work and waiting for reprovide triggers
   */
  start () {
    this._running = true

    setTimeout(() => {
      this._runPeriodically()
    }, initialDelay)
  }

  async _runPeriodically () {
    while (this._running) {
      await this._reprovide()

      // Each subsequent reprovide should run on a `this._options.interval` interval
      await new Promise(resolve => setTimeout(resolve, this._options.interval))
    }
  }

  /**
   * provide all keys to libp2p content routing
   */
  async _reprovide () {

  }

  /**
   * Stops the reprovider
   */
  stop () {
    this._running = false
  }

  /**
   * trigger a reprovide
   */
  trigger () {

  }
}

exports = module.exports = Reprovider
