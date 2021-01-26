import { ProductContext } from "../contexts/ProductContext"
import React, { useState, useEffect, useContext } from "react"
import { Font } from "./Font"
import { FontFamily } from "./FontFamily"
import { Total } from "./Total"

export function Typeface({typeface}) {
    const { product, storeProduct, resetProduct } = useContext(ProductContext)

    const defaultProduct = {
        users: {
            option: typeface.licenses[0].userss[0].option,
            title: typeface.licenses[0].userss[0].title
        },
        favorites: [
            {
                name: typeface.fonts[0].fontTitle,
                license: typeface.licenses[0].licenseTitle,
                price: typeface.licenses[0].userss[0].price
            }
        ]
    }

    useEffect(() => {
        storeProduct(defaultProduct)
    }, [])

    const handleUserSelect = (e) => {
        let newFavs = product.favorites

        // Update favs
        newFavs.map(f => {

            // Update Fonts
            f.license === 'Desktop' && !f.name.includes('Package')
                ?
                    f.price = typeface.licenses[0].userss[e.target.value-1].price
                :
                    ''
            f.license === 'Web' && !f.name.includes('Package')
                ?
                    f.price = typeface.licenses[1].userss[e.target.value-1].price
                :
                    ''

            // Update Family Package
            f.license === 'Desktop' && f.name.includes('Package')
                ?
                    f.price = typeface.familyPackage.familyPackageLicenses[0].userss[e.target.value-1].price
                :
                    ''
            f.license === 'Web' && f.name.includes('Package')
                ?
                    f.price = typeface.familyPackage.familyPackageLicenses[1].userss[e.target.value-1].price
                :
                    ''
        })

        // Store new users.option & favs
        storeProduct({
            users: {
                option: e.target.value,
                title: typeface.licenses[0].userss[e.target.value-1].title
            },
            favorites: newFavs
        })
    }

    return (
        <>
            <div className="buy-container">
                <div className="buy-caption">
                    <p>Select your cuts and license type</p>
                </div>
                <div className="buy-licenses">
                    {typeface.fonts.map(f => {
                        return (
                            <div className="buy-licenses-fonts">
                                <div className="buy-licenses-fonts-title">
                                    {f.fontTitle}
                                </div>
                                <div className="buy-licenses-fonts-checkboxes">
                                    {typeface.licenses.map(pl => {
                                        return (
                                            <Font
                                                name={f.fontTitle}
                                                license={pl.licenseTitle}
                                                value={pl.userss[product.users.option-1].price}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}

                    <p>{typeface.familyPackage.familyPackageTitle}</p>
                    {typeface.familyPackage.familyPackageLicenses.map(fpl => {
                        return (
                            <>
                                <FontFamily
                                    name={typeface.familyPackage.familyPackageTitle}
                                    license={fpl.licenseTitle}
                                    value={fpl.userss[product.users.option-1].price}
                                />
                            </>
                        )
                    })}
                </div>
            </div>


            <select onChange={handleUserSelect}>
                {typeface.licenses[0].userss.map(u => {
                    return (
                        <option value={u.option} defaultValue={1}> {u.title} </option>
                    )
                })}
            </select>

            <Total typeface={typeface}/>

        </>
    )
}