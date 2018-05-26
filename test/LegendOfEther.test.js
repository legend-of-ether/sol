const LegendOfEther = artifacts.require('LegendOfEther')
const assert = require('assert')

const RUSTY_SWORD = 0
const RUSTY_SHIELD = 1

const NULL_ADDRESS = 0

contract('LegendOfEther', addresses => {
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