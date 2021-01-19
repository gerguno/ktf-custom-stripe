export default function GetPdf({order}) {

    const downloadFile = () => {
        const name = 'KTF ' + order.products[0].name.split(' ')[0] + ` License (for ${order.customer.email})` + '.pdf'

        fetch('/api/pdfServer', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pdfName: name,
                order: order
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
    }

    return (
        <>
            <a href="#" onClick={downloadFile}>Download PDF License</a>
        </>
    )
}


