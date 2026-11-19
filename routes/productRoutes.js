import { Router } from 'express';
import  Product  from  '../models/Product.js';

const router = Router();
router.post('/', async (req, res) => {
    try {
        const newProduct= await Product.create(req.body);
        res.status(201).json( newProduct);
    }
     catch(e){
        res.status(400).json({message: e.message})
    }
})
export default router;