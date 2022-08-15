const fs = require('fs');
const path = require('path');

const loadProduct =()=>{
    const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    return Products

}
module.exports={
    loadProduct


}

