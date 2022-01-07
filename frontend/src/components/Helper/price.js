const convertToPrice = (num) => {

    let converted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(num)
    return converted
}

module.exports = {
    "convertToPrice": convertToPrice
}