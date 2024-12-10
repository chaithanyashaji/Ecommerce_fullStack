import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'
import { sendMail } from '../services/emailService.js';




//global variables
const currency = 'inr'
const deliverCharge = 10


//gateway initialize

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
}

)
//placing order using cod

const placeOrder = async (req,res) =>{

    try {
        
            const {userId,items,amount,address,email} = req.body;
            const orderData ={
                userId,
                items,
                amount,
                address,
                email,
                paymentMethod:"COD",
                payment:false,
                date:Date.now()

            }

            const newOrder = new orderModel(orderData)
            await newOrder.save()

            await userModel.findByIdAndUpdate(userId, {cartData:{}})
            res.json({success:true,message:"Order Placed"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}

//placing order using Stripe

const placeOrderStripe = async (req,res) =>{

    try {
        const {userId,items,amount,address,email} = req.body;
        const {origin} = req.headers
        const orderData ={
            userId,
            items,
            email,
            amount,
            address,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()

        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item)=>({
            price_data : {
                currency: currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data : {
                currency:currency,
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:deliverCharge*100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })

        res.json({success:true,session_url:session.url});


        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}

//Verify Stripe
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === "true") {
            const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            const { items, amount, address } = updatedOrder;

            // Extract email from the address field
            const { email, street,city,state,country,zipcode } = address;

            const itemSummary = items.map((item) => `${item.name} (x${item.quantity})`).join(', ');
            const emailText = `Dear User,
Thank you for your purchase! We are pleased to inform you that your payment for Order ID: ${orderId} has been successfully received.
            
Here are your order details:
            
------------------------------------------
Items: ${itemSummary}
Total Amount: ₹${amount}
------------------------------------------
            
Shipping Address:
${street}, ${city}, ${state}, ${country}, ${zipcode}
            
------------------------------------------
            
Thank you for shopping with us!
            
Best regards,
Forever
`;
            

            // Send email
            await sendMail(email, 'Payment Confirmation', emailText);

            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};


//placing order using Razorpay

const placeOrderRazorpay = async (req,res) =>{
    try {
        const {userId,items,amount,address} = req.body;
        
        const orderData ={
            userId,
            items,
            amount,
            address,
            paymentMethod:"Razorpay",
            payment:false,
            date:Date.now()

        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        
        const options={
            amount : amount*100,
            currency :currency.toUpperCase(),
            receipt:newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error)
                res.json({success:false,message:error.message})
            }
            res.json({success:true,order});
        })

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}

const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Fetch order details from Razorpay
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === 'paid') {
            // Verify signature
            const crypto = await import("crypto");
            const generatedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(`${razorpay_order_id}|${razorpay_payment_id}`)
                .digest("hex");

            if (generatedSignature !== razorpay_signature) {
                return res.json({ success: false, message: "Signature verification failed" });
            }

            // Update order in the database
            const updatedOrder = await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true }, { new: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });

            const { items, amount, address } = updatedOrder;
            const { email, street, city, state, country, zipcode } = address;

            const itemSummary = items.map((item) => `• ${item.name} (x${item.quantity})`).join('\n');

            const emailHTML = `
            <p>Dear ${email.split('@')[0]},</p>  
            <p>Thank you for your order! Your payment for <strong>Order ID: ${orderInfo.receipt}</strong> has been successfully received.</p>  
            
            <h3>Order Details:</h3>
            <ul>
                <li><strong>Order ID:</strong> ${orderInfo.receipt}</li>  
                <li><strong>Payment Status:</strong> Paid</li>  
                <li><strong>Total Amount:</strong> ₹${amount.toFixed(2)}</li>  
            </ul>
            
            <h3>Items Purchased:</h3>
            <ul>
                ${items.map((item) => `<li>${item.name} (x${item.quantity})</li>`).join('')}
            </ul>
            
            <h3>Shipping Address:</h3>
            <p>${street}, ${city}, ${state}, ${country} - ${zipcode}</p>  
            
            <p>If you have any questions about your order, feel free to contact our support team.</p>  
            
            <p><strong>Thank you for shopping with us!</strong></p>  
            <p>Best regards,<br><strong>Forever Team</strong></p>
            `;
            await sendMail(email, 'Payment Confirmation', emailHTML, true);

            return res.json({ success: true, message: "Payment successful" });
        } else {
            res.json({ success: false, message: "Payment not completed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


  
//all orders data displAY for admin

const allOrders = async(req,res)=>{

    try {
        
        const orders = await orderModel.find({})
        res.json({success:true,orders})
        console.log(orders)

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}

// user order data for frontend
const userOrders = async(req,res) =>{

    try {
        
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true, orders})

    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}

//update order status
const updateStatus = async (req,res) =>{

    try {
        
        const {orderId,status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true,message:"Order Status Updated"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }


}

export {placeOrder, placeOrderStripe, placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyStripe,verifyRazorpay}