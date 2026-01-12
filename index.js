const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const config = require('./config');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    console.log("Scan QR From WhatsApp Linked Devices");
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log(`${config.botName} is online`);
});

client.on('message', msg => {

 // .hi reply
    if (msg.body.toLowerCase() === "hi") {
        msg.reply("Hello 👋 I am " + config.botName);
    }

    // .menu
    if (msg.body === config.prefix + "menu") {
        msg.reply(
            `🤖 *${config.botName} Menu*\n\n` +
            `🧑 Owner: ${config.ownerName}\n` +
            `📞 Number: ${config.ownerNumber}\n\n` +
            `📌 Commands\n` +
            `👉 hi - Auto reply\n` +
            `👉 ${config.prefix}menu - Show menu\n`
        );
    }

});

client.initialize();
