export default function createAndSendAllFiles(order, callback) {
    const name = `KTF Fonts (for ${order.customer.email})` + '.zip'
    const pdfName = `Invoice-Nr. ${order.orderID} (for ${order.customer.email})` + '.pdf'

    console.log('Creating and sending files..')

    fetch('/api/pdfServer', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pdfName: pdfName,
            order: order,
            purpose: 'Email'
        })
    })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data.success)

            return fetch('/api/allFilesServer', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    zipName: name,
                    zipFiles: order.products,
                    pdfName: pdfName,
                    purpose: 'Email'
                })
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    console.log(data.success)

                    return fetch('/api/mailer', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            filenameForEmail: name,
                            order: order
                        })
                    })
                        .then(res => {
                            return res.json()
                        })
                        .then(data => {
                            console.log(data.success)
                            callback(data.success)
                        })
                        .catch(() => {
                            callback('Failed to send message. Please contact info@kyivtypefoundry.com')
                        })
                })
        })
}