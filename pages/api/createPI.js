import Stripe from 'stripe'

const stripe = new Stripe("sk_test_51Hv5XCLUcU5ulJ9yaqkDxgJ9NzEq3RDZkhdjVPzW2Vm56VhlI6FjPqqEZBVWQzzdRb1xTGx74CGsebmwhcBrLh4O00fyJC1yTM")

export default async function createPaymentIntent (req, res) {
    const { amount, metadata } = req.body
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "eur",
        metadata: metadata
    })
    res.send({
        clientSecret: paymentIntent.client_secret
    })
}

