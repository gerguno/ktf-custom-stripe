export default function GetAllFiles({order}) {

    const downloadFile = () => {
        const name = 'KTF ' + order.products[0].name.split(' ')[0] + ` (for ${order.customer.email})` + '.zip'
        const pdfName = 'KTF ' + order.products[0].name.split(' ')[0] + ` License (for ${order.customer.email})` + '.pdf'

        fetch('/api/pdfServer', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pdfName: pdfName,
                order: order,
                purpose: 'notEmail'
            })
        })
            .then(res => {
                return fetch('/api/allFilesServer', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        zipName: name,
                        zipFiles: order.products,
                        pdfName: pdfName,
                        purpose: 'notEmail'
                    })
                })
                    .then(response => {
                        response.blob().then(blob => {
                            let url = window.URL.createObjectURL(blob);
                            let a = document.createElement('a');
                            a.href = url;
                            a.download = name;
                            a.click();
                        })
                    })
            })

    }

    return (
        <>
            <button href="#" onClick={downloadFile} className="darkgrey">Download all files!</button>
        </>
    )
}


