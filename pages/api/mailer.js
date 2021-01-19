import nodemailer from "nodemailer"

// async..await is not allowed in global scope, must use a wrapper
export default async function Mailer(req, res) {
    const { order, filenameForEmail } = req.body

    // // Generate test SMTP service account from ethereal.email
    // // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465 (SSL), false for other ports
        auth: {
            user: 'oles.gergun@gmail.com', // generated ethereal user
            pass: 'Sup19goles', // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Kyiv Type Foundry 🤝" <info@kyivtypefoundry.com>', // sender address
        to: order.customer.email, // list of receivers
        subject: `Invoice-Nr: ${order.orderID}`, // Subject line
        text: "Congratulations!", // plain text body
        html: '<b>Congratulations!</b>', // html body
        attachments: [
            {
                path:
                    filenameForEmail
                        ?
                        `././files/_users_files/${filenameForEmail}`
                        :
                        '/./files/_users_files/sorry.txt'
            }
        ]
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    res.status(200).json({ success: `Your invoice and files were sent on ${order.customer.email}`})
}
Mailer().catch(console.error)