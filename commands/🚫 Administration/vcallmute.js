const { Message, MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.js");
const { Bot } = require("../../handlers/Client");

module.exports = {
  name: "vcallmute",
  aliases: ["muteallvc"],
  category: "🚫 Administration",
  memberpermissions: ["DEAFEN_MEMBERS"],
  cooldown: 5,
  description: "Mute and Unmute Users in Voice Channel",
  usage: "vcallmute",
  /**
   * @param {Bot} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    let voicechannel = message.member.voice.channel;

    if (!voicechannel) {
      return message.channel.send(
        new MessageEmbed()
          .setColor(ee.color)
          .setDescription(` <@${message.author.id}> Please Join  Voice Channel`)
          .setFooter(ee.footertext)
      );
    }

    if (args[1].toLowerCase() === "true") {
      voicechannel.members
        .filter((x) => !x.permissions.has("ADMINISTRATOR"))
        .forEach((channel) => {
          channel.voice.setMute(true);
          message.channel.send(
            new MessageEmbed()
              .setColor(ee.color)
              .setDescription(`${voicechannel.name} Members is Muted Now`)
          );
        });
    }
    if (args[1].toLowerCase() === "false") {
      voicechannel.members
        .filter((x) => !x.permissions.has("ADMINISTRATOR"))
        .forEach((channel) => {
          channel.voice.setMute(false);
          message.channel.send(
            new MessageEmbed()
              .setColor(ee.color)
              .setDescription(`${voicechannel.name} Members is Unmuted Now`)
          );
        });
    }
  },
};
