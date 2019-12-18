const WizardScene = require("telegraf/scenes/wizard");
const sendMailtoUser = require('../scripts/mailSender');
const Extra = require('telegraf/extra');

const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGO_DB}`,  {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Now enter to today_send'))
.catch(err => console.error('Something went wrong', err));

let mess;
const messageForToday = new WizardScene(
  "messageForToday", // name of scene
  (ctx) => {
    if(ctx.message){
      ctx.reply('Введите ваше сообщение');
      return ctx.wizard.next(); 
    }
    else {
      return ctx.scene.leave();
    }
  },
  (ctx) => {
   mess = ctx.message.text;
   console.log(mess);
   User.find().then((users)=>{
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < users.length; i++) {
      let date = new Date(users[i].date);
      date.setHours(0, 0, 0, 0);
      if(today.getDate() === date.getDate() && today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth()){
        sendMailtoUser(users[i].email, (users[i].name).concat(", ", mess));
      }
    };

    ctx.reply("Сообщение отправлено");
    return ctx.scene.leave(); 
  });  
 }
 );
module.exports = messageForToday;