import { useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import GetFile from "../components/GetFile";
import GetAllFiles from "../components/GetAllFiles";
import GetPdf from "../components/GetPdf";
import {UserContext} from "../contexts/UserContext";
import createAndSendAllFiles from "../components/createAndSendAllFiles";
import {MainLayout} from "../components/MainLayout";

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
            company: '',
            products: [
                {
                    name: '',
                    license: '',
                    price: '',
                    filename: ''
                }
            ]
    })

    const [loading, setLoading] = useState(true)
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
                    company: data.pi.metadata['company'],
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
                        company: data.pi.metadata['company'],
                        products: products
                }, (message) => {
                    setMailMessage(message)
                })

                resetUser()
                setLoading(false)

            })
        }
    },[])

    return (
        <MainLayout title={'Cart • Kyiv Type Foundry'}>
            <div className="slug-nav">
                {loading
                    ?
                        (
                            <div>Loading...</div>
                        )
                    :
                        (
                            <div>
                                <span style={{color: "#003EDD"}}>H</span>
                                <span style={{color: "black"}}>o</span>
                                <span style={{color: "red"}}>r</span>
                                <span style={{color: "#1AC235"}}>r</span>
                                <span style={{color: "#F29100"}}>a</span>
                                <span style={{color: "#696969"}}>y</span>
                                <span style={{color: "black"}}>, </span>
                                <span style={{color: "#1AC235"}}>t</span>
                                <span style={{color: "#003EDD"}}>h</span>
                                <span style={{color: "black"}}>e</span>
                                <span style={{color: "red"}}>y'</span>
                                <span style={{color: "#F29100"}}>r</span>
                                <span style={{color: "#696969"}}>e </span>
                                <span style={{color: "#1AC235"}}>y</span>
                                <span style={{color: "#003EDD"}}>o</span>
                                <span style={{color: "#696969"}}>u</span>
                                <span style={{color: "black"}}>r</span>
                                <span style={{color: "red"}}>s</span>
                                <span style={{color: "black"}}>!</span>
                            </div>
                        )
                }
            </div>

            <div className="wrapper with-right-border">
                <div className="success">
                    <div className="success-info">
                        <div>
                            <p>
                                invoice-Nr.: {order.orderID} <br/>
                                <GetPdf order={order}/>
                            </p>
                            <p>
                                total: {order.charges.total} Eur <br/>
                                card: {order.charges.card.brand} ...{order.charges.card.last4}
                            </p>
                        </div>
                        <div>
                            <p>
                                customer name: {order.customer.name} <br/>
                                email: {order.customer.email} <br/>
                                {order.customer.phone && (<>phone: {order.customer.phone}<br/></>)}

                                {(
                                    order.customer.address.line2 ||
                                    order.customer.address.postal_code ||
                                    order.customer.address.city ||
                                    order.customer.address.country
                                ) && (
                                    <>
                                        address: {order.customer.address.line2} {order.customer.address.postal_code} {order.customer.address.city && `${order.customer.address.city}, `} {order.customer.address.country}
                                    </>
                                )}
                            </p>
                            {order.company && (
                                <p>
                                    license owner: {order.company}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="success-files">
                        {order.products.map(p => {
                            return (
                                <div className="success-file">
                                    <div>
                                        {p.name}
                                    </div>
                                    <div>
                                        <div>
                                            {p.license}
                                        </div>
                                        <div>
                                            <GetFile name={p.filename}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="success-download">
                        <div className="mailmessage">
                            {mailMessage}
                        </div>
                        <div>
                            <GetAllFiles order={order}/>
                        </div>
                    </div>
                    <div className="success-postman">
                        <img src="/postman.png"/>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}