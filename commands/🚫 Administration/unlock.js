const { Message, MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.js");
const { Bot } = require("../../handlers/Client");
const ms = require("ms");

module.exports = {
  name: "unlock",
  aliases: ["pl"],
  category: "🚫 Administration",
  memberpermissions: ["MANAGE_CHANNELS"],
  cooldown: 5,
  description: "Disable lockdown in a channel",
  usage: "unlock",
  /**
   * @param {Bot} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    message.channel.overwritePermissions([
      {
        id: message.guild.id,
        null: ["SEND_MESSAGES"],
      },
    ]);
    const embed = new MessageEmbed()
      .setColor(ee.color)
      .setTitle("Channel Updates")
      .setDescription(`🔒 ${message.channel} has been Unlocked`);
    await message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 5000 });
    });
  },
};
