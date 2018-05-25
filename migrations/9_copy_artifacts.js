module.exports = (deployer, network) => {
    !(network === 'development') && process.exit(0)
}