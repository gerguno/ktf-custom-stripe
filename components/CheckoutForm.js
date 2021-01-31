import React, { useState, useEffect, useContext } from "react"
import { useRouter } from 'next/router'
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js"
import {UserContext} from "../contexts/UserContext"
import Dropdown from 'react-dropdown'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import countries from '../countries'

export default function CheckoutForm() {
    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const stripe = useStripe()
    const elements = useElements()

    const { user, storeUser, resetUser } = useContext(UserContext)
    const { register, errors, handleSubmit } = useForm()

    const router = useRouter()

    const cardStyle = {
        hidePostalCode: true,
        style: {
            base: {
                color: "#000",
                fontFamily: 'Forma, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "14px",
                "::placeholder": {
                    color: "#000"
                }
            },
            invalid: {
                color: "red",
                iconColor: "red"
            }
        }
    };
    const handleChange = async (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "")
    }

    const changeColor = () => {
        document.querySelector('select[name="country"]').style.color = "#000000"
    }

    const onSubmit = async (data) => {
        console.log(data)

        storeUser(prev => ({
            ...prev,
            info: {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                phone: data.phone ? data.phone : '',
                address: {
                    city: data.city ? data.city : '',
                    country: data.country ? data.country : '',
                    line2: data.line2 ? data.line2 : '',
                    postal_code: data.postalCode ? data.postalCode : ''
                }
            }
        }))

        // Set or unset billing_details params
        let address = {}
        data.city ? address['city'] = data.city : ''
        data.country ? address['country'] = data.country : ''
        data.line2 ? address['line2'] = data.line2 : ''
        data.postalCode ? address['postal_code'] = data.postalCode : ''

        let billing_details = {}
        billing_details['name'] = `${data.firstName} ${data.lastName}`
        billing_details['email'] = data.email
        data.phone ? billing_details['phone'] = data.phone : ''
        billing_details['address'] = address

        let metadata = {}
        metadata[`order_id`] = JSON.stringify(new Date().valueOf()).substr(-6)
        data.company ? metadata['company'] = data.company : ''
        user.products.slice(0).reverse().map((f, id) => {
            metadata[`${id+1}. ${f.name}`] = `${f.license}, ${f.price} EUR, ${f.users}`
        })
        metadata[`subtotal`] = `${user.subtotal} EUR`

        // Create Payment Intent
        fetch("/api/createPI", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: Math.round(user.total * 100),
                metadata: metadata
            })
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setProcessing(true)

                // Confirm Card Payment with data.clientSecret
                return stripe.confirmCardPayment(data.clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: billing_details
                    }
                })
                    .then(res => {
                        if (res.error) {
                            setError(`Payment failed ${res.error.message}`);
                            setProcessing(false)
                        } else {
                            setError(null);
                            setProcessing(false);
                            setSucceeded(true);
                            console.log(res.paymentIntent)
                            router.push({
                                pathname: `/success`,
                                query: {
                                    id: res.paymentIntent.id
                                }
                            })
                        }
                    })
            })
    }


    return (
        <>
            <form id="payment-form" onSubmit={handleSubmit(onSubmit)}>

                <p>Who buys</p>
                <fieldset className="name-lastname">
                    <fieldset>
                        <input
                            name="firstName"
                            placeholder="Name*"
                            ref={register({ required: "First name is required"})}
                        />
                        <ErrorMessage errors={errors} name="firstName" as="p" />
                    </fieldset>

                    <fieldset>
                        <input
                            name="lastName"
                            placeholder="Last Name*"
                            ref={register({ required: "Last name is required" })}
                        />
                        <ErrorMessage errors={errors} name="lastName" as="p" />
                    </fieldset>
                </fieldset>

                <fieldset>
                    <input
                        name="email"
                        placeholder="E-mail*"
                        ref={register({
                            required: "E-mail is required",
                            pattern: {
                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: "Please enter a valid e-mail address"
                            }
                        })}
                    />
                    <ErrorMessage errors={errors} name="email" as="p" />
                </fieldset>

                <fieldset>
                    <input
                        name="phone"
                        placeholder="Phone"
                        ref={register}
                    />
                </fieldset>

                <fieldset>
                    <input
                        name="line2"
                        placeholder="Address"
                        ref={register}
                    />
                </fieldset>

                <fieldset className="city-postalcode">
                    <fieldset>
                        <input
                            name="city"
                            placeholder="City"
                            ref={register}
                        />
                    </fieldset>

                    <fieldset>
                        <input
                            name="postalCode"
                            placeholder="Postal Code"
                            ref={register}
                        />
                    </fieldset>
                </fieldset>

                <fieldset>
                    <select
                        className="dropdown"
                        name="country"
                        placeholder="Country"
                        onChange={changeColor}
                        ref={register}
                    >
                        {countries.map(v => {
                            return (
                                <option
                                    value={v.value}
                                    selected={v.value ? false : true}
                                    disabled={v.value ? false : true}
                                >
                                    {v.label}
                                </option>
                            )
                        })}
                    </select>
                    <ErrorMessage errors={errors} name="country" as="p" />
                </fieldset>

                <p>For whom</p>

                <fieldset>
                    <input
                        name="company"
                        placeholder="Name/Company name"
                        ref={register}
                    />
                </fieldset>

                <p>Purchase</p>

                <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                <button
                    disabled={processing || disabled || succeeded}
                    id="submit"
                    className="pay"
                >
                    <span id="button-text">
                      {processing ? (
                          <div className="spinner" id="spinner"></div>
                      ) : (
                          "Pay"
                      )}
                    </span>
                </button>

                {error && (
                    <div className="card-error" role="alert">
                        {error}
                    </div>
                )}


                <p className={succeeded ? "result-message" : "result-message hidden"}>
                    Hooray! Payment succeeded!
                </p>
            </form>
        </>
    )
}