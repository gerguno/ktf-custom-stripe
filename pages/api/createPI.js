import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_KEY)

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

