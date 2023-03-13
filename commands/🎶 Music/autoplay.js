const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require("../../config/embed.json");
const { Bot } = require("../../handlers/Client");

module.exports = {
  name: "autoplay",
  aliases: ["auplay", "autop"],
  category: "🎶 Music",
  permissions: " ",
  description: "Enable aur Disable Autoplay",
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
            .setDescription(
              `Please Join Voice Channel To Enable or Disable Autoplay Song`
            )
        )
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });

    //If Bot not connected, return error
    if (!message.guild.me.voice.channel)
      return message.channel
        .send(
          new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`Nothing Playing In Voice Channel`)
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

    client.distube.toggleAutoplay(message);

    await message.channel
      .send(
        new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`Song Resumed By <@${message.author.id}>`)
          .setDescription(
            `AutoPlay is Now **${
              client.distube.toggleAutoplay(message)
                ? "✅ Active"
                : "❌ Deactive"
            }**`
          )
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  },
};
