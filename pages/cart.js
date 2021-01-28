import { UserContext } from "../contexts/UserContext"
import React, { useState, useEffect, useContext } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {CardElement, Elements} from "@stripe/react-stripe-js"
import CheckoutForm from "../components/CheckoutForm"
import {MainLayout} from "../components/MainLayout";
import Link from "next/link";

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
        document.body.style.backgroundColor = '#FFFFFF'
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
        <MainLayout title={'Cart • Kyiv Type Foundry'}>
            <div className="slug-nav violet">
                <div>You’re in a few steps away from having completed your order</div>
            </div>

            {user.products.length > 0
                ?
                    <div className="wrapper">
                        <div className="cart-items">
                            {user.products.map((up, key) => {
                                return (
                                    <div className="cart-item">
                                        <div className="cart-item-left">
                                            <div>{up.name}</div>
                                            <div>{up.license}</div>
                                            <div>{up.users}</div>
                                        </div>
                                        <div className="cart-item-right">
                                            <div>{up.price} Eur</div>
                                            <div>
                                                <a onClick={(e) => {
                                                    removeProduct(e, key)
                                                }}>
                                                    <img src="/close.svg" alt=""/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="cart-total">
                            <div className="cart-total-field">
                                <div>
                                    VAT{user.tax}%*
                                </div>
                                <div>
                                    {(user.subtotal * vat).toFixed(2)} Eur
                                </div>
                            </div>
                            <div className="cart-total-field">
                                <div>
                                    Subtotal
                                </div>
                                <div>
                                    {user.subtotal} Eur
                                </div>
                            </div>
                            <div className="cart-total-field">
                                <div>
                                    Total
                                </div>
                                <div>
                                    {user.total} Eur
                                </div>
                            </div>
                        </div>

                        <Elements stripe={promise}>
                            <CheckoutForm />
                        </Elements>
                    </div>
                :
                    <div className="wrapper empty">
                        <p>
                            {`The cart is now empty. `}
                            <Link href={'/'}>
                                <a>
                                    Select some products
                                </a>
                            </Link>
                            {` to buy before checking out.`}
                        </p>
                    </div>
            }
        </MainLayout>
    )
}