'use strict'

const { FileSystemWallet, Gateway } = require('fabric-network')
const fs = require('fs')
const path = require('path')

async function connect() {
  // Parse the connection profile. This would be the path to the file downloaded
  // from the IBM Blockchain Platform operational console.
  const ccpPath: string = path.join(__dirname, '../../connection.json')
  const ccp: object = JSON.parse(fs.readFileSync(ccpPath, 'utf8'))

  // Configure a wallet. This wallet must already be primed with an identity that
  // the application can use to interact with the peer node.
  const walletPath: string = path.join(__dirname, '../../wallet')
  const wallet = new FileSystemWallet(walletPath)

  // Create a new gateway, and connect to the gateway peer node(s). The identity
  // specified must already exist in the specified wallet.
  const gateway = new Gateway()
  await gateway.connect(ccp, {
    wallet,
    identity: 'user1',
    discovery: { enabled: true, asLocalhost: false },
  })

  // Get the network channel that the smart contract is deployed to.
  const network = await gateway.getNetwork('channel1')

  // Get the smart contract from the network channel.
  const contract = network.getContract('blockchain')

  return [gateway, contract]
}

export default class Blockchain {
  public async getFood(id: string) {
    try {
      const [gateway, contract] = await connect()

      // Submit the 'createCar' transaction to the smart contract, and wait for it
      // to be committed to the ledger.
      let resp = await contract.submitTransaction('readFood', id)
      console.log('Transaction has been submitted')
      const respString = resp.toString()
      console.log(respString)

      await gateway.disconnect()
      return respString
    } catch (error) {
      console.error(`Failed to submit transaction: ${error}`)
      return null
    }
  }

  public async createFood(id: string, arg: string) {
    try {
      const [gateway, contract] = await connect()

      // Submit the 'createCar' transaction to the smart contract, and wait for it
      // to be committed to the ledger.
      let resp = await contract.submitTransaction('createFood', id, arg)
      console.log('Transaction has been submitted')
      const respString = resp.toString()
      console.log(respString)

      await gateway.disconnect()
      return respString
    } catch (error) {
      console.error(`Failed to submit transaction: ${error}`)
      return null
    }
  }

  public async updateFood(id: string, arg: string) {
    try {
      const [gateway, contract] = await connect()

      // Submit the 'createCar' transaction to the smart contract, and wait for it
      // to be committed to the ledger.
      let resp = await contract.submitTransaction('updateFood', id, arg)
      console.log('Transaction has been submitted')
      const respString = resp.toString()
      console.log(respString)

      await gateway.disconnect()
      return respString
    } catch (error) {
      console.error(`Failed to submit transaction: ${error}`)
      return null
    }
  }

  public async deleteFood(id: string) {
    try {
      const [gateway, contract] = await connect()

      // Submit the 'createCar' transaction to the smart contract, and wait for it
      // to be committed to the ledger.
      let resp = await contract.submitTransaction('deleteFood', id)
      console.log('Transaction has been submitted')
      const respString = resp.toString()
      console.log(respString)

      await gateway.disconnect()
      return respString
    } catch (error) {
      console.error(`Failed to submit transaction: ${error}`)
      return null
    }
  }
}

export const blockchain = new Blockchain()
