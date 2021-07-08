const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ addressee, sender, subject, body }) => {
  const msg = {
    to: addressee,
    from: sender,
    subject: subject,
    textfield:body,
  }
  await sendgrid
    .send(msg)
  console.log('EMAIL SENT!');
}

module.exports = {
  sendEmail,
}