import mime from 'mime'
import fs from 'fs'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import ReactPDF from '@react-pdf/renderer'

export default async function pdfServer(req, res) {
    const { pdfName, order, purpose } = req.body
    const pdfPath = `././files/_users_files/${pdfName}`

    // Create styles
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#FFFFFF'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    })

    // Create Document Component
    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>KTF License #{order.orderID}</Text>
                    {order.products.map(f => {
                        return (
                            <>
                                <Text> Name: {f.name} </Text>
                                <Text> License: {f.license} </Text>
                                <Text> Price: {f.price} </Text>
                            </>
                        )
                    })}
                </View>
            </Page>
        </Document>
    )

    ReactPDF.render(<MyDocument />, pdfPath, () => {
        if (purpose === 'notEmail') {
            const mimetype = mime.lookup(pdfPath)
            res.setHeader('Content-disposition', 'attachment; filename=' + pdfPath)
            res.setHeader('Content-type', mimetype)
            const filestream = fs.createReadStream(pdfPath)
            filestream.pipe(res)
        } else {
            res.status(200).json({ success: `License was created: ${pdfName}`})
        }
    })

}

