'use strict';

const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const { DISCORD_CHANNEL_ID, DISCORD_TOKEN } = process.env;

class DiscordServiceLogger {
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.channelId = DISCORD_CHANNEL_ID;

    this.client.on('ready', () => {
      console.log('Discord logging started as' + this.client.user.tag);
    });

    const discordToken = DISCORD_TOKEN || '';
    this.client.login(discordToken);
  }

  sendToFormatCode(logData) {
    const {
      code,
      message = 'This is some additional infomation about the code.',
      title = 'Code example',
    } = logData;

    const codeMessage = {
      content: message,
      embeds: [
        {
          color: parseInt('00ff00', 16),
          title: title,
          description: '```json\n' + JSON.stringify(code, null, 2) + '\n```',
        },
      ],
    };

    this.sendToMessage(codeMessage);
  }

  sendToMessage(message = 'message') {
    const channel = this.client.channels.cache.get(this.channelId);
    if (!channel) {
      console.error(`Couldn't not find the channel::: ` + this.channelId);
    }

    channel.send(message).catch((e) => console.log(e));
  }
}

// const discordServiceLogger = new DiscordServiceLogger();

// module.exports = discordServiceLogger;
