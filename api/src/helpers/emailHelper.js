import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async (emailInfo) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_SMTP,
    port: +process.env.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAILD_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(emailInfo);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

export const sendAdminUserVerificationMail = (userObj) => {
  const link = `${process.env.DOMAIN}/admin-verification?e=${userObj.email}&c=${userObj.verificationCode}`;

  const emailInfo = {
    from: '"ABC store" ' + process.env.MAIL_USER, // sender address
    to: userObj.email, // list of receivers
    subject: "Acount verification required", // Subject line
    text: `Hi ${userObj.fName} please follow the link to activate your admin acount. ${link}`, // plain text body
    html: `
    <p>hello ${userObj.fName} </p>
    <br/>
    <br/>
    <p>Please follow the linke below to verify and activate yor admin account </p>
    <br/>
    <br/>
    <a href =  "${link}"> ${link} </a>
   

    <br/>
    <br/>

    <p> 
    -----------------
    <br/>
    xyz commerce
    </p>

    `, // html body
  };

  sendMail(emailInfo);
};

export const profileUpdateNotification = (userObj) => {
  const emailInfo = {
    from: '"ABC store" ' + process.env.MAIL_USER, // sender address
    to: userObj.email, // list of receivers
    subject: "Your profile has been updated.", // Subject line
    text: `Hi ${userObj.fName}, we have just notic that you profile has updated. If it wasen't you, please contact us immidiatlly`, // plain text body
    html: `
    <p>hello ${userObj.fName} </p>
    <br/>
    <br/>
    <p>we have just notic that you profile has updated. If it wasen't you, please contact us immidiatlly </p>
    <br/>
    <br/>
       

    <p> 
    -----------------
    <br/>
    xyz commerce
    </p>

    `, // html body
  };

  sendMail(emailInfo);
};

export const emailPasswordResetOTP = (obj) => {
  const emailInfo = {
    from: '"ABC store" ' + process.env.MAIL_USER, // sender address
    to: obj.email, // list of receivers
    subject: "OTP for password Reset", // Subject line
    text: `Hi ${obj.fName}, Please user the following OTP to reset your password:  ${obj.otp}`, // plain text body
    html: `
    <p>hello ${obj.fName} </p>
    <br/>
    <br/>
    <p>Please user the following OTP to reset your password:  </p>
    <br/>
    <br/>
    <span style="color: red; font-size: 2rem; font-weight: bolder;">${obj.otp} </span>
    <br/>
    <br/>
       

    <p> 
    -----------------
    <br/>
    ABC store
    </p>

    `, // html body
  };

  sendMail(emailInfo);
};
