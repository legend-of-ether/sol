const LegendOfEther = artifacts.require('LegendOfEther')
const assert = require('assert')

const RUSTY_SWORD = 0
const RUSTY_SHIELD = 1

const NULL_ADDRESS = 0

contract('LegendOfEther Construct', addresses => {

  it('should have a Rusty Sword', async () => {
    const instance = await LegendOfEther.deployed()
    const items = await instance.items.call(0)
    assert.equal(items[0], 'Rusty Sword')
    assert.equal(items[1], '')
    assert.equal(items[2].toString(), '10')
    assert.equal(items[3].toString(), '0')
  })

  it('should have a Rusty Shield', async () => {
    const instance = await LegendOfEther.deployed()
    const items = await instance.items.call(1)
    assert.equal(items[0], 'Rusty Shield')
    assert.equal(items[1], '')
    assert.equal(items[2].toString(), '0')
    assert.equal(items[3].toString(), '10')
  })

  it('should have 3 Rusty Yields out of the box', async () => {
    const instance = await LegendOfEther.deployed()
    const items = await instance.addressToItems(NULL_ADDRESS, RUSTY_SWORD)
    assert.equal(items.toString(), '3')
  })

  it('should have 3 Rusty Swords out of the box', async () => {
    const instance = await LegendOfEther.deployed()
    const items = await instance.addressToItems(NULL_ADDRESS, RUSTY_SHIELD)
    assert.equal(items.toString(), '3')
  })

})

contract('LegendOfEther Create', addresses => {

  it('should be able to create 10 Rusty Swords', async () => {
    const instance = await LegendOfEther.deployed()
    await instance.createItem(RUSTY_SWORD, 10)
    const items = await instance.addressToItems(NULL_ADDRESS, RUSTY_SWORD)
    assert.equal(items.toString(), '13')
  })

  it('should be able to create 10 Rusty Shields', async () => {
    const instance = await LegendOfEther.deployed()
    await instance.createItem(RUSTY_SHIELD, 10)
    const items = await instance.addressToItems(NULL_ADDRESS, RUSTY_SHIELD)
    assert.equal(items.toString(), '13')
  })

})

contract('LegendOfEther Transfer', addresses => {

  it('should be able to transfer 1 Rusty Sword from the pool', async () => {
    const addressTo = addresses[0]
    const instance = await LegendOfEther.deployed()

    const ownedSwordCountBefore = await instance.addressToItems(addressTo, RUSTY_SWORD)
    const unownedSwordCountBefore = await instance.addressToItems(NULL_ADDRESS, RUSTY_SWORD)

    await instance.transferItemOwnership(NULL_ADDRESS, addressTo, RUSTY_SWORD)

    const ownedSwordCountAfter = await instance.addressToItems(addressTo, RUSTY_SWORD)
    const unownedSwordCountAfter = await instance.addressToItems(NULL_ADDRESS, RUSTY_SWORD)

    assert.equal(ownedSwordCountBefore.toString(), '0')
    assert.equal(unownedSwordCountBefore.toString(), '3')

    assert.equal(ownedSwordCountAfter.toString(), '1')
    assert.equal(unownedSwordCountAfter.toString(), '2')
  })

})

contract('LegendOfEther Transfer Fail', addresses => {

  it('should fail to transfer more Rusty Swords from the pool than available', async () => {
    const addressTo = addresses[0]
    const instance = await LegendOfEther.deployed()
    const unownedSwordCountBefore = await instance.addressToItems(NULL_ADDRESS, RUSTY_SWORD)

    for (let i = 0; i < unownedSwordCountBefore; i++)
      await instance.transferItemOwnership(NULL_ADDRESS, addressTo, RUSTY_SWORD)

    try {
      await instance.transferItemOwnership(NULL_ADDRESS, addressTo, RUSTY_SWORD)
      throw 'Should have failed'
    } catch (error) {
      if (error === 'Should have failed')
        assert.fail(error)
      assert.equal(error, 'Error: VM Exception while processing transaction: revert')
    }

  })

})