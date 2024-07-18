import express from 'express';
import Product from '../database/products.js'


const router = express.Router();

router.post('/addproduct', async(req, res) => {
    const { name, category, description, price, imageUrl } = req.body;

    try {
      const newProduct = new Product({ name, category, description, price, imageUrl });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.get('/featured', async (req, res) => {
    try {
      const categories = await Product.distinct('category');
      console.log('cateogories',categories)

      const featuredProducts = await Promise.all(categories.map(async (category) => {
        const products = await Product.find({ category }).limit(6);
        console.log('products',products);
        console.log('category',category)
        return { category, products };
      }));
      res.json(featuredProducts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


export default router;