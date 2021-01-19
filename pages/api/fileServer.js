import mime from 'mime'
import fs from 'fs'

export default async function fileServer(req, res) {
    const { filename } = req.body

    // returns ex. '././files/KTFJermilov/KTFJermilov-Solid.zip'
    const file = `././files/${filename.split('-')[0]}/${filename}`

    const mimetype = mime.lookup(file)

    res.setHeader('Content-disposition', 'attachment; filename=' + filename)
    res.setHeader('Content-type', mimetype)

    const filestream = fs.createReadStream(file)
    filestream.pipe(res)
}

