"use strict"
require('dotenv').config();

const Telegraf = require('telegraf');

const bot = new Telegraf(`${process.env.BOT_TOKEN}`);
const session = require("telegraf/session");
const Stage = require("telegraf/stage");
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const Scene = require('telegraf/scenes/base');
const { leave } = Stage;
const { getWeekUsers , getTodayUsers } = require('./scripts/timeQ');

const messageOne = require('./telegram-bot-scenes/sceneForOne');
const messageForToday = require('./telegram-bot-scenes/messageForToday');

const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGO_DB}`,  {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Now bot connected to MongoDB!'))
.catch(err => console.error('Something went wrong', err));


bot.start((ctx) => ctx.reply('Welcome!'));

// Create scene manager
const stage = new Stage();
stage.hears('Отменить', (ctx) => {
  leave();
  ctx.reply('Операция отменена'); 
});

// Scene registration


bot.command('send', (ctx) => ctx.reply('<i>Выбери опцию</i>', Extra.HTML().markup((m) =>
  m.inlineKeyboard([
    m.callbackButton('Массовая рассылка', 'all'),
    m.callbackButton('Ввести email', 'one')
    ])))
);


stage.register(messageOne);
stage.register(messageForToday);
bot.use(session());
bot.use(stage.middleware());

bot.action('all', (ctx) => {
 ctx.replyWithHTML('<i>Данный тип рассылки еще не реализован</i>');
});

bot.action('today_send', (ctx) => {
  
  ctx.replyWithHTML('Вы можете оменить любую операцию нажав <i>Отменить</i>' ,Extra.markup((m)=>{
    return m.resize().keyboard(['Отменить'])}));
  ctx.scene.enter('messageForToday');
}
);

bot.action('today', (ctx) => {
  leave();
  getTodayUsers(mongoose, ctx);
} );

bot.action('last_week', (ctx) => {
  leave();
  getWeekUsers(mongoose, ctx);
} );



bot.action('one', (ctx) => {
  ctx.replyWithHTML('Вы можете оменить любую операцию нажав <i>Отменить</i>' ,Extra.markup((m)=>{
    return m.resize().keyboard(['Отменить'])}));
  ctx.scene.enter('messageOne');
});
bot.launch();
console.log('Start bot');
module.exports = bot;