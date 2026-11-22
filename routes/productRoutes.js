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
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        // 3. send the product back
        res.json(product)

    } catch (e) {
        // 4. send a 500 with e.message
        res.status(500).json({ message: e.message })
    }
})

router.put('/:id', async (req, res) => {
    try {

        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // 2. if there's no product, return a 404 with a message
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        // 3. send the product back
        res.json(product)

    } catch (e) {
        // 4. send a 500 with e.message
        res.status(500).json({ message: e.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {

        const product = await Product.findByIdAndDelete(req.params.id);
        // 2. if there's no product, return a 404 with a message
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        // 3. send delete message
        res.json({ message: 'Product deleted' })

    } catch (e) {
        // 4. send a 500 with e.message
        res.status(500).json({ message: e.message })
    }
})

router.get('/', async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    try {
        const results = await Product.find({})
             .skip((page - 1) * limit)
            // And finally, limit the amount of documents that we return.
            .limit(limit);
        res.json(results);
    } catch (err) {
       res.status(500).json({ message: err.message })
    }
    })

export default router;