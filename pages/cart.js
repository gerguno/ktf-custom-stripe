import { UserContext } from "../contexts/UserContext"
import React, { useState, useEffect, useContext } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {CardElement, Elements} from "@stripe/react-stripe-js"
import CheckoutForm from "../components/CheckoutForm"

const promise = loadStripe("pk_test_51Hv5XCLUcU5ulJ9ybKRoOJupbE3qVziQqJCO66oYMHnRXAMolGpv2aKFw6t3r7fct4wB33O3gfE63dubwE0kJDh500wXZVkgvF")

export default function Cart() {
    const {user, storeUser, resetUser} = useContext(UserContext)
    const [vat, setVat] = useState(0.14)

    const calcTotal = () => {
        let subTotalSum = 0

        user.products.map(f => {
            subTotalSum += +f.price
        })

        storeUser(prev => ({
            ...prev,
            subtotal: subTotalSum,
            tax: Math.round(vat * 100),
            total: (subTotalSum + (subTotalSum * vat)).toFixed(2)
        }))
    }

    useEffect(() => {
        calcTotal()
    }, [])

    const removeProduct = (e, key) => {
        e.preventDefault()
        let newProducts = user.products
        newProducts.splice(key, 1)
        storeUser(prev => ({
            ...prev,
            products: newProducts
        }))
        calcTotal()
    }

    return (
        <>
            <h2>Cart</h2>

            {user.products.length > 0
                ?
                    <>
                        <ol>
                            {user.products.map((up, key) => {
                                return (
                                    <li>
                                        Name: {up.name} <br/>
                                        License: {up.license} <br/>
                                        Price: {up.price} <br/>
                                        Users: {up.users} <br/>
                                        <a onClick={(e) => {
                                            removeProduct(e, key)
                                        }}>
                                            Remove
                                        </a>
                                    </li>
                                )
                            })}
                        </ol>
                        <h3>Subtotal: {user.subtotal} EUR</h3>
                        <h3>VAT {user.tax}%*</h3>
                        <h3>Total: {user.total} EUR</h3>
                        <Elements stripe={promise}>
                            <CheckoutForm />
                        </Elements>
                    </>
                :
                    <p>
                        Your cart is empty.
                    </p>
            }
        </>
    )
}