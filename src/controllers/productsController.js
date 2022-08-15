const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const product = products.find(product=>product.id === +req.params.id)
		return res.render('detail',{
			product,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		const product = products.find(product=>product.id===+req.params.id);
		return res.render('product-edit-form',{
			product
		})
	},
	// Update - Method to update
	update: (req, res) => {
		const{name,price,category,description,discount}=req.body;
		const productModify = products.map(product=>{
			if(product.id===+req.params.id){
				return {
					...product,
					name: name.trim(),
					price:+price,
					discount:+discount,
					description:description.trim(),
					category
				}
			}
			return product
		})
		fs.writeFileSync(path.join(__dirname,'..','data','productsDataBase.json'),JSON.stringify(productModify,null,3),'utf-8')
		return res.redirect('/')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;