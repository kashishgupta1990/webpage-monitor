const env = require('dotenv').config().parsed;
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(env.telegramToken, {polling: false});
const puppeteer = require('puppeteer-extra');
const fs = require('fs');
const CronJob = require('cron').CronJob;

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
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

const job = new CronJob(env.cronRule, init, null, true);
job.start();
