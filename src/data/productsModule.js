const fs = require('fs');
const path = require('path');

const loadProduct =()=>{
    const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    return products

}
const storeProduct = (products)=>{
    fs.writeFileSync(path.join(__dirname,'productsDataBase.json'),JSON.stringify(products,null,3),'utf-8')
}
module.exports={
    loadProduct,
    storeProduct


}

