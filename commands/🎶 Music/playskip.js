const { Message, MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.js");
const { Bot } = require("../../handlers/Client");

var { getData, getPreview, getTracks } = require("spotify-url-info");

module.exports = {
  name: "playskip",
  aliases: ["pskip"],
  category: "🎶 Music",
  permissions: "",
  description: "Play Song Skip Current Song",
  usage: "",
  /**
   * @param {Bot} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { channel } = message.member.voice;

    //if member not connected return error
    if (!channel)
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`Please Join Voice Channel To Play Song`)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    //if they are not in the same channel, return error only check if connected
    if (
      message.guild.me.voice.channel &&
      channel.id != message.guild.me.voice.channel.id
    )
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setDescription(
              `Please Join My Voice Channel ${message.guild.me.voice.channel.name}`
            )
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    //if no arguments return error
    if (!args.length)
      return message
        .reply(
          new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`Please Enter Song Name to PlaySkip Song`)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    // if don't have persm
    if (
      !message.guild.me
        .permissionsIn(message.member.voice.channel)
        .has("CONNECT")
    )
      return message
        .reply(
          new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`I am Not Allowed In Voice Channel`)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    if (args.length) {
      message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`Searching and Skipping ${args.join(" ")}`)
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
    }
    client.distube.play(channel, songname, {
      member: message.member,
      message: message,
      textChannel: message.channel,
      skip: true,
    });
  },
};
