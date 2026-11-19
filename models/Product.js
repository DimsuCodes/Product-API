import { Schema } from 'mongoose' // Imports mongoose's Schema class to define the shape of documents. mongoose.Schema can be used too
import mongoose from  'mongoose' // Importing mongoose to connect and work with MongoDB

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    }, 
    inStock: {
        type: Boolean,
        default: true
    },
    tags: [String],
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
});

const Product = mongoose.model("Product", productSchema)
export default Product