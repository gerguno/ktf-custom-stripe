import { useRouter } from "next/router"
import React, { useState, useEffect, useContext } from "react"
import { ProductContext } from "../contexts/ProductContext"
import { UserContext } from "../contexts/UserContext"

export function Total({ typeface }) {

    const router = useRouter()
    const { product, storeProduct } = useContext(ProductContext)
    const { user, storeUser } = useContext(UserContext)

    const [ total, setTotal ] = useState(0)

    const calcTotal = () => {
        let totalSum = 0
        product.favorites.map(f => {
            totalSum += +f.price
        })
        setTotal(totalSum)
    }

    useEffect(() => {
        calcTotal()
    }, [product])

    const addToCart = (e) => {
        e.preventDefault()
        let newProducts = []

        // From Product context to User context
        product.favorites.map(pf => {
            newProducts.push({
                name: pf.name,
                license: pf.license,
                price: pf.price,
                users: product.users.title
            })
        })
        storeUser(prev => ({
            ...prev,
            products: [
                ...newProducts,
                ...prev.products
            ]
        }))
    }

    return (
        <div className="total">
            <div className="buy-container">
                <div className="buy-caption">
                    Eventual tax on license will be calculated at checkout
                </div>

                Total: {total} Eur

                <button className="darkgrey" onClick={addToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}