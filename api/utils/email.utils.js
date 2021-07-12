const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ addressee, sender, subject, body }) => {
  const msg = {
    to: addressee,
    from: sender,
    subject: subject,
    text:body,
  }
  await sendgrid.send(msg).then(() => {
    console.log('EMAIL SENT!')
}).catch((error) => {
    console.log(error.response.body)
})
}

module.exports = {
  sendEmail,
}