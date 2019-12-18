'use strict'

const nodeMailer = require('nodemailer');
const path = require('path');
const http = require('request');

const dotenv = require('dotenv');
dotenv.config();


function mailSender (to) {
	let transporter = nodeMailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
          // should be replaced with real sender's account
          user: `${process.env.EMAIL}`,
          pass: `${process.env.PASSWORD}`
      }
  });
	let mailOptions = {
      // should be replaced with real recipient's account
      to: to,
      subject: 'Thanks for attenetion',
      text: 'Your message added to database'
  };
  transporter.sendMail(mailOptions, (error, info) => {
  	if (error) {
  		return console.log(error);
  	}
  	console.log('Message %s sent: %s', info.messageId, info.response);
  });
};

function sendMailtoUser (email, message) {
    let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
          // should be replaced with real sender's account
          user: `${process.env.EMAIL}`,
          pass: `${process.env.PASSWORD}`
      }
  });
  let mailOptions = {
      // should be replaced with real recipient's account
      to: email,
      subject: 'Ekate - software engineer',
      text: message
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  
}

module.exports = mailSender;  
module.exports = sendMailtoUser;  

