import mime from 'mime'
import fs from 'fs'
import ReactPDF from '@react-pdf/renderer'
import InvoiceTemplate from '../../components/invoiceTemplate'


export default function pdfServer(req, res) {
    const { pdfName, order, purpose } = req.body
    const pdfPath = `././files/_users_files/${pdfName}`

    ReactPDF.render(<InvoiceTemplate order={order}/>, pdfPath, () => {
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

