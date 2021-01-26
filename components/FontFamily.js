import React, { useState, useEffect, useContext } from "react"
import { ProductContext } from "../contexts/ProductContext";

export function FontFamily({ name, license, value }) {
    const { product, storeProduct } = useContext(ProductContext)

    const favorite = product.favorites.some(u => u['name'] === name && u['license'] === license)

    const addFont = () => {
        // Remove non-Package favs
        let newFavs = []
        newFavs = product.favorites.filter(item => {
            return item.name.includes('Package')
        })

        // Add Package-Font
        storeProduct(prev => ({
            ...prev,
            favorites: [
                {
                    name: name,
                    license: license,
                    price: value,
                },
                ...newFavs
            ]
        }))
    }

    const removeFont = () => {
        let newFavs = []
        newFavs = product.favorites.filter(item => {
            return (item.name !== name || item.license !== license)
        })

        storeProduct(prev => ({
            ...prev,
            favorites: newFavs
        }))
    }

    const toggleFont = (e) => {
        !favorite
            ?
            addFont()
            :
            removeFont()
    }

    return (
        <>
            <input type="checkbox"
                   checked={favorite}
                   name={license}
                   className={license}
                   value={value}
                   onChange={toggleFont}
            />
        </>
    )
}