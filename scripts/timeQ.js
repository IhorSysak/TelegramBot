const { User } = require('../models/user');
const session = require("telegraf/session");

function getTodayUsers(mongoose, ctx){
  let list = null;
  User.find().then((users)=>{
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < users.length; i++) {
      let date = new Date(users[i].date);
      date.setHours(0, 0, 0, 0);
      if(today.getDate() === date.getDate() && today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth()){
        if(list == null){
          list = " ";
        }
        list = list.concat((users[i].name).toString(), " email: ", (users[i].email).toString(), "\n" );
      }
    };

    if(list){
     return ctx.reply(('Список пользователей: \n').concat(list));}
   })
  .catch((err)=>{
   console.log(err);
 });
}

function getWeekUsers(mongoose, ctx){
 let list = null;
 User.find().then((users)=>{
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < users.length; i++) {
    let date = new Date(users[i].date);
    date.setHours(0, 0, 0, 0);
    if(today.getDate() - date.getDate() < 7 && today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth()){
      if(list == null){
        list = " ";
      }
      list = list.concat((users[i].name).toString(), " email: ", (users[i].email).toString(), "\n" );
    }
  };

  if(list){
   return ctx.reply(('Список пользователей: \n').concat(list));}
 })
 .catch((err)=>{
   console.log(err);
 });
}

exports.getTodayUsers = getTodayUsers;
exports.getWeekUsers = getWeekUsers;