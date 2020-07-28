# Webpage monitor (with screenshot)

- This allow us to receive the screenshot of the any website on our telegram applications.
- Clone this project 
- Run ``npm install``

#### Generate Telegram api key

- https://core.telegram.org/api/obtaining_api_id
- Once you get the api key past it to ``.env`` file `telegramToken = 797645373:AAHF0O_tyqBJaEZ9893dg4cbPHpF4GkEtHJ`
- Identify the client id you want to send message and update the `.env` with the some values `chatIds = 627770292,929299229`

#### Set the URL 
- In`.env` file with cay url `url = https://www.google.com`

#### Update the job interval duration you want screenshot
- Set the ``.env`` with `cronRule = */30 * * * *` It will send the screenshot every 30min.
- Use this cron job generator ``https://crontab-generator.org/``

#### Create the ``.env`` file in your root director of the project will look like
```$xslt
chatIds = 627770292,929299229
telegramToken = 797645373:AAHF0O_tyqBJaEZ9893dg4cbPHpF4GkEtHJ
url = https://www.google.com
cronRule = */30 * * * *

```

