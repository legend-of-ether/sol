const LegendOfEther = artifacts.require('LegendOfEther')
const assert = require('assert')

contract('LegendOfEther', accounts => {
  it('should return Hello World', async () => {
    const instance = await LegendOfEther.deployed()
    const hello = await instance.hello.call()
    assert.equal(hello, 'Hello World')
  })
})