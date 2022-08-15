const{loadProduct,storeProduct} = require('../data/productsModule')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products=loadProduct();
		return res.render('products',{
			products,
			toThousand
		})

	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const products = loadProduct();
		const product = products.find(product=>product.id === +req.params.id)
		return res.render('detail',{
			product,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form',{

		})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const{name,discount,price,category,description}=req.body
		const products=loadProduct()
		const newproduct={
			id:(products[products.length-1].id+1),
			name:name.trim(),
			description:description.trim(),
			price:+price,
			discount:+discount,
			category,
			image:'default-image.png'
		}
		const productsModify=[...products,newproduct]
		storeProduct(productsModify)
		return res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		const products = loadProduct();
		const product = products.find(product=>product.id===+req.params.id);
		return res.render('product-edit-form',{
			product
		})
	},
	// Update - Method to update
	update: (req, res) => {
		const products = loadProduct();
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
		storeProduct(productModify)
		
		return res.redirect('/products/detail/'+ req.params.id)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const{id}=req.params
		const products=loadProduct()
		const productModify = products.filter(product=>product.id!==+id) 
		storeProduct(productModify)
		return res.redirect('/products')
		
	}
};

module.exports = controller;