import React, { useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Create Document Component
export default function InvoiceTemplate ({ email }) {
    Font.register({
        family: 'FormaNeretta',
        src: './public/fonts/Forma.ttf'
    })

    const styles = StyleSheet.create({
        body: {
            paddingTop: 15,
            paddingBottom: 65,
            paddingLeft: 60,
            paddingRight: 15,
            fontSize: 10,
            fontFamily: 'FormaNeretta',
            letterSpacing: 0.1
        },
        header: {
            flexDirection: "row"
        },
        logo: {
            width: '50%'
        },
        image: {
            height: 12,
            width: 90
        },
        companyInfo: {
            width: '50%'
        },
        thanks: {
            flexDirection: "row"
        },
        customer: {
            width: '60%',
            marginTop: 60
        },
        productsHeader: {
            width: '100%',
            borderTop: 0.75,
            flexDirection: "row",
            marginTop: 50
        },
        captionTypeface: {
            fontSize: 6.5,
            width: '50%',
            marginTop: 2,
            marginBottom: 8
        },
        captionLicense: {
            fontSize: 6.5,
            width: '15%',
            marginTop: 2,
            marginBottom: 8
        },
        captionUsers: {
            fontSize: 6.5,
            width: '20%',
            marginTop: 2,
            marginBottom: 8
        },
        captionPrice: {
            fontSize: 6.5,
            width: '15%',
            textAlign: 'right',
            marginTop: 2,
            marginBottom: 8
        },
        products: {
            width: '100%',
            paddingBottom: 15
        },
        product: {
            flexDirection: "row"
        },
        typeface: {
            width: '50%'
        },
        license: {
            width: '15%'
        },
        users: {
            width: '20%'
        },
        price: {
            width: '15%',
            textAlign: 'right'
        },
        listItem: {
            marginBottom: 4
        },
        summary: {
            borderTop: 0.75,
            borderBottom: 0.75,
            paddingBottom: 15
        },
        summaryCaption: {
            fontSize: 6.5,
            width: '100%',
            marginTop: 2,
            marginBottom: 8
        },
        summaryItem: {
            flexDirection: "row",
            marginBottom: 4
        },
        totals: {
            marginLeft: '65%',
            width: '20%'
        },
        amount: {
            width: '15%',
            textAlign: 'right'
        },
        more: {
            width: '100%',
            marginTop: 50
        }
    });

    const date = () => {
        const date = new Date()
        return date.getDate()+"."+(date.getMonth() + 1)+"."+date.getFullYear()
    }

    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <View style={styles.header}>
                    <View style={styles.logo}>
                        <Image
                            style={styles.image}
                            src="./public/invoice_logo.png"
                        />
                    </View>
                    <View style={styles.companyInfo}>
                        <Text>
                            Goldener Winkel 4 30159 Hannover DE
                        </Text>
                        <Text>
                            +49 (0) 162 795 98 69
                        </Text>
                        <Text>
                            info@kyivtypefoundry.com
                        </Text>
                        <Text>
                            {' '}
                        </Text>
                        <Text>
                            Tax-IdNr.: 54 082 136 751
                        </Text>
                        <Text>
                            Tax-Nr.:    24/101/23338
                        </Text>
                        <Text>
                            VAT-Nr.:   DE290205066
                        </Text>
                    </View>
                </View>
                <View style={styles.customer}>
                    <View style={styles.thanks}>
                        <Text>
                            <View style={{ color: '#003EDD' }}>
                                <Text>
                                    T
                                </Text>
                            </View>
                            <View style={{ color: 'black' }}>
                                <Text>
                                    h
                                </Text>
                            </View>
                            <View style={{ color: '#D90033' }}>
                                <Text>
                                    a
                                </Text>
                            </View>
                            <View style={{ color: '#1AC235' }}>
                                <Text>
                                    n
                                </Text>
                            </View>
                            <View style={{ color: '#F2A32E' }}>
                                <Text>
                                    k{' '}
                                </Text>
                            </View>
                            <View style={{ color: '#1AC235' }}>
                                <Text>
                                    y
                                </Text>
                            </View>
                            <View style={{ color: '#003EDD' }}>
                                <Text>
                                    o
                                </Text>
                            </View>
                            <View style={{ color: 'black' }}>
                                <Text>
                                    u{' '}
                                </Text>
                            </View>
                            <View style={{ color: '#D90033' }}>
                                <Text>
                                    f
                                </Text>
                            </View>
                            <View style={{ color: '#1AC235' }}>
                                <Text>
                                    o
                                </Text>
                            </View>
                            <View style={{ color: '#D90033' }}>
                                <Text>
                                    r{' '}
                                </Text>
                            </View>
                            <View style={{ color: '#F4AE48' }}>
                                <Text>
                                    y
                                </Text>
                            </View>
                            <View style={{ color: '#003EDD' }}>
                                <Text>
                                    o
                                </Text>
                            </View>
                            <View style={{ color: '#F4AE48' }}>
                                <Text>
                                    u
                                </Text>
                            </View>
                            <View style={{ color: '#D90033' }}>
                                <Text>
                                    r{' '}
                                </Text>
                            </View>
                            <View style={{ color: 'black' }}>
                                <Text>
                                    o
                                </Text>
                            </View>
                            <View style={{ color: '#003EDD' }}>
                                <Text>
                                    r
                                </Text>
                            </View>
                            <View style={{ color: '#F4AE48' }}>
                                <Text>
                                    d
                                </Text>
                            </View>
                            <View style={{ color: 'black' }}>
                                <Text>
                                    e
                                </Text>
                            </View>
                            <View style={{ color: '#696969' }}>
                                <Text>
                                    r{' '}
                                </Text>
                            </View>
                            <View style={{ color: '#003EDD' }}>
                                <Text>
                                    a
                                </Text>
                            </View>
                            <View style={{ color: 'black' }}>
                                <Text>
                                    n
                                </Text>
                            </View>
                            <View style={{ color: '#D90033' }}>
                                <Text>
                                    d{' '}
                                </Text>
                            </View>
                            <View style={{ color: '#F4AE48' }}>
                                <Text>
                                    p
                                </Text>
                            </View>
                            <View style={{ color: '#696969' }}>
                                <Text>
                                    a
                                </Text>
                            </View>
                            <View style={{ color: '#1AC235' }}>
                                <Text>
                                    y
                                </Text>
                            </View>
                            <View style={{ color: 'black' }}>
                                <Text>
                                    m
                                </Text>
                            </View>
                            <View style={{ color: '#D90033' }}>
                                <Text>
                                    e
                                </Text>
                            </View>
                            <View style={{ color: '#003EDD' }}>
                                <Text>
                                    n
                                </Text>
                            </View>
                            <View style={{ color: 'black' }}>
                                <Text>
                                    t
                                </Text>
                            </View>
                        </Text>
                    </View>
                    <Text>
                        {' '}
                    </Text>
                    <Text>
                        invoice date: {date()}
                    </Text>
                    <Text>
                        invoice-Nr.:    675763423
                    </Text>
                    <Text>
                        {' '}
                    </Text>
                    <Text>
                        customer name: Oles Gergun
                    </Text>
                    <Text>
                        email: {email}
                    </Text>
                    <Text>
                        phone: +49 162 795 98 69
                    </Text>
                    <Text>
                        address: Naberezhno-Luhova 16 (apt. 4) 67856 Kyiv, UA
                    </Text>
                    <Text>
                        {' '}
                    </Text>
                    <Text>
                        license owner: Yurko Hutsulyak
                    </Text>
                </View>
                <View style={styles.productsHeader}>
                    <View style={styles.captionTypeface}>
                        <Text>
                            typeface cut
                        </Text>
                    </View>
                    <View style={styles.captionLicense}>
                        <Text>
                            license type
                        </Text>
                    </View>
                    <View style={styles.captionUsers}>
                        <Text>
                            users
                        </Text>
                    </View>
                    <View style={styles.captionPrice}>
                        <Text>
                            price
                        </Text>
                    </View>
                </View>
                <View style={styles.products}>
                    <View style={styles.product}>
                        <View style={styles.typeface}>
                            <View style={styles.listItem}>
                                <Text>
                                    Jermilov Solid
                                </Text>
                            </View>
                        </View>
                        <View style={styles.license}>
                            <View style={styles.listItem}>
                                <Text>
                                    Desktop
                                </Text>
                            </View>
                        </View>
                        <View style={styles.users}>
                            <View style={styles.listItem}>
                                <Text>
                                    Up to 25 users
                                </Text>
                            </View>
                        </View>
                        <View style={styles.price}>
                            <View style={styles.listItem}>
                                <Text>
                                    60.00 Eur
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.product}>
                        <View style={styles.typeface}>
                            <View style={styles.listItem}>
                                <Text>
                                    Jermilov Solid
                                </Text>
                            </View>
                        </View>
                        <View style={styles.license}>
                            <View style={styles.listItem}>
                                <Text>
                                    Desktop
                                </Text>
                            </View>
                        </View>
                        <View style={styles.users}>
                            <View style={styles.listItem}>
                                <Text>
                                    Up to 25 users
                                </Text>
                            </View>
                        </View>
                        <View style={styles.price}>
                            <View style={styles.listItem}>
                                <Text>
                                    60.00 Eur
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.product}>
                        <View style={styles.typeface}>
                            <View style={styles.listItem}>
                                <Text>
                                    Jermilov Solid
                                </Text>
                            </View>
                        </View>
                        <View style={styles.license}>
                            <View style={styles.listItem}>
                                <Text>
                                    Desktop
                                </Text>
                            </View>
                        </View>
                        <View style={styles.users}>
                            <View style={styles.listItem}>
                                <Text>
                                    Up to 25 users
                                </Text>
                            </View>
                        </View>
                        <View style={styles.price}>
                            <View style={styles.listItem}>
                                <Text>
                                    60.00 Eur
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.summary}>
                    <View style={styles.summaryCaption}>
                        <Text>
                            order summary
                        </Text>
                    </View>
                    <View style={styles.summaryItem}>
                        <View style={styles.totals}>
                            <Text>
                                VAT 14%*
                            </Text>
                        </View>
                        <View style={styles.amount}>
                            <Text>
                                20.00 Eur
                            </Text>
                        </View>
                    </View>
                    <View style={styles.summaryItem}>
                        <View style={styles.totals}>
                            <Text>
                                Subtotal
                            </Text>
                        </View>
                        <View style={styles.amount}>
                            <Text>
                                180.00 Eur
                            </Text>
                        </View>
                    </View>
                    <View style={styles.summaryItem}>
                        <View style={styles.totals}>
                            <Text>
                                TOTAL
                            </Text>
                        </View>
                        <View style={styles.amount}>
                            <Text>
                                200.00 Eur
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.more}>
                    <Text>
                        Please print this document and keep on record.
                    </Text>
                    <Text>
                        Please contact us at info@kyivtypefoundry if you have any questions or experience any issues when
                    </Text>
                    <Text>
                        downloading your fonts.
                        For additional licensing options, please contact us at orders@kyivtypefoundry
                    </Text>
                </View>
            </Page>
        </Document>
    )
}