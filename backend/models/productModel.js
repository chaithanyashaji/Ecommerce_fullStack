import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: Array, required: true },
    bestseller: { type: Boolean, default: false },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes : {type: Array, required: true},
    date:{type:Number, required: true},
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
})

const productModel = mongoose.models.product || mongoose.model('product', productSchema);

export default productModel;