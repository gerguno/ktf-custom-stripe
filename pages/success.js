import {useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import GetFile from "../components/GetFile";
import GetAllFiles from "../components/GetAllFiles";
import GetPdf from "../components/GetPdf";
import {UserContext} from "../contexts/UserContext";
import createAndSendAllFiles from "../components/createAndSendAllFiles";

export default function Success() {
    const router = useRouter()

    const {user, storeUser, resetUser} = useContext(UserContext)

    const [order, setOrder] = useState({
            orderID: '',
            charges: {
                total: '',
                subtotal: '',
                tax: '',
                currency: '',
                card: {
                    last4: '',
                    brand: ''
                },
            },
            customer: {
                name: '',
                email: '',
                phone: '',
                address: {
                    city: '',
                    country: '',
                    line2: '',
                    postal_code: ''
                }
            },
            products: [
                {
                    name: '',
                    license: '',
                    price: '',
                    filename: ''
                }
            ]
    })

    const [mailMessage, setMailMessage] = useState('')

    useEffect(() => {

        if (!router.query.id)  {
            router.push({pathname: '/404'})
        } else {

        // COLLECT DATA for ORDER

        // 1. From user
        let products = user.products,
            subtotal = user.subtotal,
            tax = user.tax

        // add filenames to order.products
        products.forEach(p => {
            p.filename =
                'KTF'
                + p.name
                    // .substr(p.name.indexOf(" ") + 1) // cut first word
                    .replace(/\s+/g, '-') + '-' // change spaces with dashes
                + p.license
                + '.zip'
        })

        // 2. From PaymentIntent
        fetch("/api/retrievePI", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                piID: router.query.id
            })
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setOrder({
                    orderID: data.pi.metadata['order_id'],
                    charges: {
                        total: (data.pi.amount / 100).toFixed(2),
                        subtotal: subtotal,
                        tax: tax,
                        currency: data.pi.currency,
                        card: {
                            last4: data.pi.charges.data[0].payment_method_details.card.last4,
                            brand: data.pi.charges.data[0].payment_method_details.card.brand
                        },
                    },
                    customer: {
                        name: data.pi.charges.data[0].billing_details.name,
                        email: data.pi.charges.data[0].billing_details.email,
                        phone: data.pi.charges.data[0].billing_details.phone,
                        address: {
                            city: data.pi.charges.data[0].billing_details.address.city,
                            country: data.pi.charges.data[0].billing_details.address.country,
                            line2: data.pi.charges.data[0].billing_details.address.line2,
                            postal_code: data.pi.charges.data[0].billing_details.address.postal_code
                        }
                    },
                    products: products
                })

                setMailMessage('Creating and sending files..')
                createAndSendAllFiles({
                        orderID: data.pi.metadata['order_id'],
                        charges: {
                            total: (data.pi.amount / 100).toFixed(2),
                            subtotal: subtotal,
                            tax: tax,
                            currency: data.pi.currency,
                            card: {
                                last4: data.pi.charges.data[0].payment_method_details.card.last4,
                                brand: data.pi.charges.data[0].payment_method_details.card.brand
                            },
                        },
                        customer: {
                            name: data.pi.charges.data[0].billing_details.name,
                            email: data.pi.charges.data[0].billing_details.email,
                            phone: data.pi.charges.data[0].billing_details.phone,
                            address: {
                                city: data.pi.charges.data[0].billing_details.address.city,
                                country: data.pi.charges.data[0].billing_details.address.country,
                                line2: data.pi.charges.data[0].billing_details.address.line2,
                                postal_code: data.pi.charges.data[0].billing_details.address.postal_code
                            }
                        },
                        products: products
                }, (message) => {
                    setMailMessage(message)
                })

                resetUser()

            })
        }
    },[])

    return (
        <>
            <h1>Success</h1>

            <p>order: {JSON.stringify(order)}</p>

            <ol>
                {order.products.map(p => {
                    return (
                        <li>
                            {p.name} {p.license} {p.filename} <GetFile name={p.filename}/>
                        </li>
                    )
                })}
            </ol>

            <GetPdf order={order}/>
            <br/> <br/>

            <GetAllFiles order={order}/>
            <br/> <br/>

            <p>{mailMessage}</p>

            <Link href={'/'}><a>Go Home</a></Link>
        </>
    )
}