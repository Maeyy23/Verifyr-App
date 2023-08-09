const generatePaymentReference = () => {
    const prefix = "VRF-TF"
    const minm = 10000000000;
    const maxm = 99999999999;
    const generatedRandom = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    return prefix + generatedRandom
};

module.exports = generatePaymentReference;
