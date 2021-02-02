import mime from 'mime';
import fs from 'fs';
import archiver from 'archiver';

export default async function allFilesServer(req, res) {
    const { zipName, zipFiles, pdfName, purpose } = req.body

    // make ZIP
    const zipPath = `././files/_users_files/${zipName}`

    // create a file to stream archive data to.
    const output = fs.createWriteStream(zipPath)
    const archive = archiver('zip')

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', function() {
        console.log(archive.pointer() + ' total bytes')
        console.log('archiver has been finalized and the output file descriptor has closed.')

        if (purpose === 'notEmail') {
            // stream ZIP
            const mimetype = mime.lookup(zipPath)
            res.setHeader('Content-disposition', 'attachment; filename=' + zipName)
            res.setHeader('Content-type', mimetype)
            const filestream = fs.createReadStream(zipPath)
            filestream.pipe(res)
        } else {
            res.status(200).json({ success: `All files ZIP was created: ${zipName}`})
        }
    })

    archive.on('error', function(err) {
        throw err
    })

    // pipe archive data to the file
    archive.pipe(output)

    zipFiles.map(zf => {
        // Add Font .zip's to Font Folder
        archive.append(fs.createReadStream(`././files/${zf.filename.split('-')[0]}/${zf.filename}`),
            { name: `${zf.filename.split('-')[0]}/${zf.filename}` })

        // Add Specimen.pdf to Font Folder
        archive.append(fs.createReadStream(`././files/${zf.filename.split('-')[0]}/Specimen/${zf.filename.split('-')[0]}-Specimen.pdf`),
            { name: `${zf.filename.split('-')[0]}/${zf.filename.split('-')[0]}-Specimen.pdf` })
    })

    // Add Invoice.pdf
    archive.append(fs.createReadStream(`././files/_users_files/${pdfName}`),
        { name: pdfName })

    // Add Invoice.pdf
    archive.append(fs.createReadStream(`././files/EULA/Kyiv Type Foundry EULA.pdf`),
        { name: `Kyiv Type Foundry EULA.pdf` })

    archive.finalize();
}

