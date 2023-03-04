const TelegramAPI = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options');

const token = '5748357408:AAGb74R-tfwQ8ginSrKluBfLRU6CmP5nShg';

const bot = new TelegramAPI(token, {polling: true});

const chats = {};

const startGame = async (id) => {
    await bot.sendMessage(id, 'Сейчас я загадаю цифру от 0 до 9, попробуй ее отгадать');
    chats[id] = Math.floor(Math.random() * 10);
    await bot.sendMessage(id, 'Все можешь отгадывать', gameOptions);
}

const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Стартовое приветствие' },
        { command: '/info', description: 'Информация о пользователе' },
        { command: '/game', description: 'Игра угадай цифру' },
    ])

    bot.on("message",
        async msg => {
            const {text, chat} = msg;
            const {first_name, last_name, is_premium} = msg.from;
            const {id} = chat;
            if (text === "/start") {
                await bot.sendSticker(id, 'https://tlgrm.eu/_/stickers/697/ba1/697ba160-9c77-3b1a-9d97-86a9ce75ff4d/91.webp');
                return bot.sendMessage(id, "Добро пожаловать в моего тестого бота на жаба скрипте, скоро он станет круче💙");
            } else if(text === "/info") {
                return bot.sendMessage(id, `Тебя зовут ${first_name} ${last_name}, и ты ${is_premium ? "" : "не "}премиум пользователь.`)
            } else if (text === "/game") {
                return await startGame(id);
            }

            return bot.sendMessage(id, `Ты конечно написал мне - xXx_${text}_xXx, но я тебя не понимаю🤯`);
        })

    bot.on("callback_query",
        async  msg => {
            const { data, message } = msg;
            const { id } = message.chat;

            if (data === '/again') {
                return await startGame(id);
            }

            if (Number.parseInt(data ) === chats[id]) {
                return await bot.sendMessage(id, `Поздравляю ты отгадал цифру ${chats[id]}`, againOptions)
            } else {
                return await bot.sendMessage(id, `К сожалению ты не отгадал цифру ${chats[id]}`, againOptions)
            }
        })
}

start();