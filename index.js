const env = require('dotenv').config().parsed;
const TelegramBot = require('node-telegram-bot-api');
const puppeteer = require('puppeteer-extra');
const fs = require('fs');
const CronJob = require('cron').CronJob;
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const bot = new TelegramBot(env.telegramToken, {polling: false});
puppeteer.use(StealthPlugin());

const init = async () => {
    try {

        const browser = await puppeteer.launch({ headless: true });

        const page = await browser.newPage();
        await page.goto(env.url);

        await page.waitFor(5000);


        const filePath = `./new-image-clicked_${+new Date()}.png`;

        await page.screenshot({path: filePath});

        await browser.close();

        for (const chatId of env.chatIds.split(',')) {
            await bot.sendDocument(chatId, filePath);
        }

        fs.unlinkSync(filePath);

    } catch (e) {

        // Error
        for (const chatId of env.chatIds.split(',')) {
            bot.sendMessage(chatId, `Fetching error ${env.url} ${new Date()}`);
        }
    }
};

init();

console.log(env.cronRule);

const job = new CronJob(env.cronRule, init, null, true);
job.start();
