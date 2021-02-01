export default function GetPdf({order}) {

    const downloadFile = () => {
        const name = `Invoice-Nr. ${order.orderID} (for ${order.customer.email})` + '.pdf'

        fetch('/api/pdfServer', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pdfName: name,
                order: order,
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
    }

    return (
        <>
            <a href="#" onClick={downloadFile}>download</a>
        </>
    )
}


