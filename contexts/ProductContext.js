import React, { createContext, useState, useReducer } from 'react';

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
    const [ product, setProduct ] = useState({
        users: {
            option: 1,
            title: '1 user'
        },
        favorites: []
    })
    const storeProduct = product => {
        setProduct(product)
    }
    const resetProduct = () => {
        setProduct({
            users: {
                option: 1,
                title: '1 user'
            },
            favorites: []
        })
    }

    return (
        <ProductContext.Provider value={{ product, storeProduct, resetProduct }}>
            {props.children}
        </ProductContext.Provider>
    )
}
export default ProductContextProvider;


