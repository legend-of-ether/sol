const LegendOfEther = artifacts.require('LegendOfEther.sol')

module.exports = deployer => {
    deployer.deploy(LegendOfEther)
}