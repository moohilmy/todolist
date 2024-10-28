import nodemailer from 'nodemailer'

const sendEmail = async(userEmail: string , subject: string , htmlTemplate: string) =>{
try {
    const transporter = nodemailer.createTransport({
        service: "gmaill",
        host: 'smtp.gmail.com',
        port: 465,             
        secure: true,
        auth: {
            user: process.env.APP_EMAIL_ADDRESS,
            pass: process.env.APP_EMAIL_PASS,
        }
    })
    const mailOptions = {
        from: process.env.APP_EMAIL_ADDRESS,
        to: userEmail,
        subject: subject,
        html: htmlTemplate
    }
    await transporter.sendMail(mailOptions)
} catch (error) {
console.log(error);

    
}

}



export default sendEmail