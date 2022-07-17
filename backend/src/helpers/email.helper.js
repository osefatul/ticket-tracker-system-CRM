const nodemailer = require("nodemailer");



//Email address of the company to send pin codes.
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'juliana.halvorson63@ethereal.email',
        pass: 'm8t1xDgJsfvWAXsqfP'
    }
});



const send = async (info)=>{
try {
    // send mail with defined transport object
    let result = await transporter.sendMail(info);

    console.log("Message sent: %s", result.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));

    return result
    } catch (error) {
    console.log(error);
    }
}



const emailProcessor = async ({ email, pin }) => {

    const info = {
    from: '"Ticket CRM Company" <juliana.halvorson63@ethereal.email>', // sender address
    to: email, // list of receivers
    subject: "Password rest Pin", // Subject line
    text:
        "Here is your password rest pin" +
        pin +
        " This pin will expires in 1day", // plain text body
    html: `<b>Hello </b>
    Here is your pin 
    <b>${pin} </b>
    This pin will expires in 1day
    <p></p>`, // html body
    };
    await send(info)
}




module.exports = { emailProcessor };