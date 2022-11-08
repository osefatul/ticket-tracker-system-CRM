const nodemailer = require("nodemailer");

//For Test
//Email address of the company to send pin codes.
// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'stuart.schneider39@ethereal.email',
//         pass: 'tPYh56J3Yk3D6MtPCh'
//     }
// });



//Actual Email
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "nodejsdev007@gmail.com",
        pass:"geweyagctezizybt"
    }
})


const send = (info) => {
    return new Promise(async (resolve, reject) => {
    try {
        let result = await transporter.sendMail(info);
        console.log("Message sent: %s", result.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
        resolve(result);
    } catch (error) {
        console.log(error);
    }
    });
};




const emailProcessor = ({ email, pin, type, verificationLink = "" }) => {
    let info = "";
    switch (type) {
    case "request-new-password":
        info = {
          from: '"Ticket CRM Company" <nodejsdev007@gmail.com>', // sender address
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

        send(info);
        break;

    case "update-password-success":
        info = {
          from: '"Ticket CRM Company" <nodejsdev007@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "Password updated", // Subject line
          text: "Your new password has been update", // plain text body
        html: `<b>Hello </b>
        
        <p>Your new password has been update</p>`, // html body
        };

        send(info);
        break;

    case "new-user-confirmation-required":
        info = {
        from: '"Ticket CRM Company" <nodejsdev007@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "Please verify your new user", // Subject line
        text:
            "Please follow the link to verify your account before you can login", // plain text body
        html: `<b>Hello </b>
        <p>Please follow the link to verify your account before you can login</p>
        <p>${verificationLink}</P>
          `, // html body
        };

        send(info);
        break;

    default:
        break;
    }
};





module.exports = { emailProcessor };