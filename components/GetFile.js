export default function GetFile({name}) {

    const downloadFile = () => {
        fetch('/api/fileServer', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                filename: name
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
            <a href="#" onClick={downloadFile}>Download</a>
        </>
    )
}


