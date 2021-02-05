import {Text} from "@react-pdf/renderer";
import React from "react";

export default function MailBody({ order }) {
    const date = () => {
        const date = new Date()
        return date.getDate()+"."+(date.getMonth() + 1)+"."+date.getFullYear()
    }

    return (
        <div className="mail" style={{ width: '600px', margin: '0 auto', padding: '40px 0', fontFamily: `'Forma', sans-serif`, fontSize: '17px', lineHeight: '22px' }}>
            <div className="mail-customer" style={{ padding: '20px 0', borderBottom: '2px solid black' }}>
                <p>
                    <span style={{color: "#003EDD"}}>T</span>
                    <span style={{color: "black"}}>h</span>
                    <span style={{color: "red"}}>a</span>
                    <span style={{color: "#1AC235"}}>n</span>
                    <span style={{color: "#F29100"}}>k </span>
                    <span style={{color: "#696969"}}>y</span>
                    <span style={{color: "black"}}>o</span>
                    <span style={{color: "#1AC235"}}>u </span>
                    <span style={{color: "#003EDD"}}>f</span>
                    <span style={{color: "black"}}>o</span>
                    <span style={{color: "red"}}>r </span>
                    <span style={{color: "#F29100"}}>y</span>
                    <span style={{color: "#696969"}}>o</span>
                    <span style={{color: "#1AC235"}}>u</span>
                    <span style={{color: "#003EDD"}}>r </span>
                    <span style={{color: "#696969"}}>o</span>
                    <span style={{color: "black"}}>r</span>
                    <span style={{color: "red"}}>d</span>
                    <span style={{color: "black"}}>e</span>
                    <span style={{color: "#696969"}}>r </span>
                    <span style={{color: "#1AC235"}}>a</span>
                    <span style={{color: "#003EDD"}}>n</span>
                    <span style={{color: "#696969"}}>d </span>
                    <span style={{color: "#F4AE48"}}>p</span>
                    <span style={{color: "red"}}>a</span>
                    <span style={{color: "#43CD59"}}>y</span>
                    <span style={{color: "black"}}>m</span>
                    <span style={{color: "#D90033"}}>e</span>
                    <span style={{color: "#003EDD"}}>n</span>
                    <span style={{color: "black"}}>t</span>
                    <span style={{color: "black"}}>!</span>
                </p>
                <p>
                    date: {date()} <br/>
                    invoice-nr.: {order.orderID}
                </p>
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
            <div className="mail-dear" style={{ padding: '20px 0', borderBottom: '2px solid black' }}>
                <p>
                    Dear {order.customer.name},
                </p>
                <p>
                    Payment for your recent order at Kyiv Type Foundry has been successfully processed. Please find your files and receipt attached in this e-mail.
                </p>
                <p>
                    If you have any questions or experience any issues when downloading your fonts, please contact us at orders@kyivtypefoundry.com
                </p>
            </div>
            <div className="mail-info" style={{ padding: '20px 0' }}>
                <p>
                    Kyiv Type Foundry <br/>
                    Goldener Winkel 4 30159 Hannover DE <br/>
                    +49 (0) 162 795 98 69  info@kyivtypefoundry.com
                </p>
                <p>
                    Tax-IdNr.: 54 082 136 751 <br/>
                    Tax-Nr.:    24/101/23338 <br/>
                    VAT-Nr.:   DE290205066
                </p>
            </div>
        </div>
    )
}