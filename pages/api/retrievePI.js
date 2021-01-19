import Stripe from 'stripe'

const stripe = new Stripe("sk_test_51Hv5XCLUcU5ulJ9yaqkDxgJ9NzEq3RDZkhdjVPzW2Vm56VhlI6FjPqqEZBVWQzzdRb1xTGx74CGsebmwhcBrLh4O00fyJC1yTM")

export default async function retrievePaymentIntent (req, res) {
    const { piID } = req.body
    const paymentIntent = await stripe.paymentIntents.retrieve(
        piID
    )
    res.send({
        pi: paymentIntent
    })
}