const dbase = require('../connection');

const autogenIdSupplier = async (namaSupplier) => {
    namaSupplier = namaSupplier.replace(' - ', ' ')
    let id = ''
    let ctr = 0
    let spasiKe = namaSupplier.indexOf(' ')
    if (spasiKe == -1) {
        id = namaSupplier.substring(0, 2)
        id = id.toUpperCase(id)
    }
    else {
        let start2 = parseInt(spasiKe) + 1
        id = namaSupplier.substring(0, 1) + namaSupplier.substring((spasiKe + 1), (spasiKe + 2));
    }
    qry = `select max(right(id_supplier,3)+1) as 'ctr' from supplier where substring(id_supplier,2,2)=?`
    let result = await dbase.executeQueryWithParam(qry, [id])
    // console.log(result[0].ctr);
    if (result[0].ctr == null) {
        ctr = parseInt(1)
    }
    else {
        ctr = parseInt(result[0].ctr)
    }
    let ctrString = ctr.toString()
    id = ("S" + id + ctrString.padStart(3, '0')).toUpperCase()
    return (id)
}

const autogenIdCustomer = async (namaCustomer) => {
    namaCustomer = namaCustomer.replace(' - ', ' ')
    let id = ''
    let ctr = 0
    let spasiKe = namaCustomer.indexOf(' ')
    if (spasiKe == -1) {
        id = namaCustomer.substring(0, 2)
        id = id.toUpperCase(id)
    }
    else {
        let start2 = parseInt(spasiKe) + 1
        id = namaCustomer.substring(0, 1) + namaCustomer.substring((spasiKe + 1), (spasiKe + 2));
    }
    qry = `select max(right(id_customer,3)+1) as 'ctr' from customer where substring(id_customer,2,2)=?`
    let result = await dbase.executeQueryWithParam(qry, [id])
    // console.log(result[0].ctr);
    if (result[0].ctr == null) {
        ctr = parseInt(1)
    }
    else {
        ctr = parseInt(result[0].ctr)
    }
    let ctrString = ctr.toString()
    id = ("C" + id + ctrString.padStart(3, '0')).toUpperCase()
    return (id)
}


module.exports = {
    "autogenIdSupplier": autogenIdSupplier,
    "autogenIdCustomer": autogenIdCustomer
}