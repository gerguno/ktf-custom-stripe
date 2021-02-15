import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_KEY)

export default async function retrievePaymentIntent (req, res) {
    const { piID } = req.body
    const paymentIntent = await stripe.paymentIntents.retrieve(
        piID
    )
    res.send({
        pi: paymentIntent
    })
}