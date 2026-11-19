import { Router } from 'express';
import Product from '../models/Product.js';

const router = Router();

// ========== POST /api/products (create) ==========
router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    }
    catch (e) {
        res.status(400).json({ message: e.message })
    }
})

// ========== GET /api/products/:id (read one) ==========
router.get('/:id', async (req, res) => {
    try {
        // 1. find the product by its id (req.params.id), save it in a box called product
        const product = await Product.findById(req.params.id);
        // 2. if there's no product, return a 404 with a message
            if(!product){
                return res.status(404).json({message: 'Product not found'})
            }

        // 3. send the product back
            res.json(product)

    } catch (e) {
        // 4. send a 500 with e.message
        res.status(500).json({ message: e.message })
    }
})

export default router;
