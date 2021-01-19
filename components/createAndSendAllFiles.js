export default function createAndSendAllFiles(order, callback) {
    const name = 'KTF ' + order.products[0].name.split(' ')[0] + ` (for ${order.customer.email})` + '.zip'
    const pdfName = 'KTF ' + order.products[0].name.split(' ')[0] + ` License (for ${order.customer.email})` + '.pdf'

    console.log('Creating and sending files..')

    fetch('/api/pdfServer', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pdfName: pdfName,
            order: order
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
                    pdfName: pdfName
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