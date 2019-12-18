const WizardScene = require("telegraf/scenes/wizard");
const sendMailtoUser = require('../scripts/mailSender');
const Extra = require('telegraf/extra');


let email;
let mess;
const messageOne = new WizardScene(
  "messageOne", // name of scene
  (ctx) => {
    ctx.reply('Введите email пользователя  \n<b>Возможно будет полезно вывести активных пользователей...</b>', Extra.HTML().markup((m) =>
      m.inlineKeyboard([
        [m.callbackButton('за сегодня', 'today')],
        [m.callbackButton('за последнюю неделю', 'last_week')]
        ])));
    return ctx.wizard.next(); // to next part of scene
  },
  (ctx) => {
    if(ctx.message){
      email = ctx.message.text; 
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
   sendMailtoUser(email, mess);
   ctx.reply("Сообщение отправлено");
   return ctx.scene.leave();   
 }
 );

module.exports = messageOne;