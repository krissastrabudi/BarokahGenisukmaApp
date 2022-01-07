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

const autogenIdBarang = async (namaBarang, conn) => {
    try {
        namaBarang = namaBarang.replace(' - ', ' ')
        let id = ''
        let ctr = 0
        let spasiKe = namaBarang.indexOf(' ')
        if (spasiKe == -1) {
            id = namaBarang.substring(0, 2)
            id = id.toUpperCase(id)
        }
        else {
            let start2 = parseInt(spasiKe) + 1
            id = namaBarang.substring(0, 1) + namaBarang.substring((spasiKe + 1), (spasiKe + 2));
        }
        qry = `select max(right(id_barang,3)+1) as 'ctr' from barang where substring(id_barang,2,2)=?`
        let result = await dbase.executeQueryWithParam(qry, [id], 1, conn)
        // console.log(result[0].ctr);
        if (result[0].ctr == null) {
            ctr = parseInt(1)
        }
        else {
            ctr = parseInt(result[0].ctr)
        }
        let ctrString = ctr.toString()
        id = ("B" + id + ctrString.padStart(3, '0')).toUpperCase()
        return (id)
    } catch (error) {
        console.log(error);
        throw error
    }
}

const autogenIdBarangSupplier = async (conn) => {
    try {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = dd + mm + yyyy
        let qry = `select ifnull(max(substring(id_barang_supplier,9,11))+1,1) as id from barang_supplier where substring(id_barang_supplier,1,8)=?`
        let result = await dbase.executeQueryWithParam(qry, [today], 1, conn)
        return today + ((result[0].id).toString().padStart(3, '0'))
    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports = {
    "autogenIdSupplier": autogenIdSupplier,
    "autogenIdCustomer": autogenIdCustomer,
    "autogenIdBarang": autogenIdBarang,
    "autogenIdBarangSupplier": autogenIdBarangSupplier
}