import { ProductContext } from "../contexts/ProductContext"
import React, { useState, useEffect, useContext } from "react"
import { Font } from "./Font"
import { FontFamily } from "./FontFamily"
import { Total } from "./Total"
import useWindowDimensions from "./useWindowDimensions";

export function Typeface({typeface}) {
    const { height, width } = useWindowDimensions();
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
        console.log(typeface.licenses[0].userss)
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
            <div className="buy">
                <div className="buy-container">
                    <div className="buy-caption">
                        Select your cuts and license type
                    </div>
                    <div className="buy-licenses">
                        <div className="buy-licenses-labels">
                            <div>Item</div>
                            <div className="desktop-web">
                                <div>Desktop</div>
                                <div>Web</div>
                            </div>
                        </div>
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
                        <div className="buy-licenses-fontfamily">
                            <div className="buy-licenses-fonts-title">
                                {typeface.familyPackage.familyPackageTitle}
                            </div>
                            <div className="buy-licenses-fonts-checkboxes">
                                {typeface.familyPackage.familyPackageLicenses.map(fpl => {
                                    return (
                                        <FontFamily
                                            name={typeface.familyPackage.familyPackageTitle}
                                            license={fpl.licenseTitle}
                                            value={fpl.userss[product.users.option-1].price}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="buy-container">
                    <div className="buy-caption">
                        Adjust number of people who are going to use it
                    </div>
                    <div className="buy-users">
                        <select className="dropdown" onChange={handleUserSelect}>
                            {typeface.licenses[0].userss.map(u => {
                                return (
                                    <option value={u.option} defaultValue={1}> {u.title} </option>
                                )
                            })}
                        </select>
                        {width > 375
                            ?
                                (<p>
                                    None of the above licenses cover your use case? <br/>
                                    <a href="mailto:info@kyivtypefoundry.com">Contact us</a> for more licensing options (logos, broadcasting, digital publishing, …)
                                </p>)
                            :

                                (<p>
                                    None of the above licenses cover your use case? <a href="mailto:info@kyivtypefoundry.com">Contact us</a> for more licensing options (logos, broadcasting, digital publishing, …)
                                </p>)
                        }
                    </div>
                </div>
            </div>

            <Total typeface={typeface}/>

        </>
    )
}