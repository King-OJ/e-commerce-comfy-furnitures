// domain/.netlify/functions/create-payment-intent
require('dotenv').config()

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async function(event, context) {
    if(event.body){

        const {cart, shipping_fee, total_amount} = JSON.parse(event.body)
        
        function calculateOrderAmount(){
            return shipping_fee + total_amount
        }

       try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(),
            currency: "ngn", 
        })
        return {
            statusCode: 200,
            body: JSON.stringify({clientSecret: paymentIntent.client_secret})
        }
       } catch (error) {
           return {
               statusCode: 500,
               body: JSON.stringify({ msg: error.message})
           }
       }
    }
    return {
        statusCode: 200,
        body: "create payment intent"
    }
}

// const express = require("express");
// const app = express();
// // This is your test secret API key.
// const stripe = require("stripe")('sk_test_51KWeSlAIcoherC0M0qi7mwqZ1lfgtzRnb4QzjMucph93sQT77RexXnQCVk7pzDlwVFbx94fjQW7wy4dzovDzsmp500AD0bIj7H');

// app.use(express.static("public"));
// app.use(express.json());

// const calculateOrderAmount = (items) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400;
// };

// app.post("/create-payment-intent", async (req, res) => {
//   const { items } = req.body;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "eur",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

// app.listen(4242, () => console.log("Node server listening on port 4242!"));