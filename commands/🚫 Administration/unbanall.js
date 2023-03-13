const { Message, MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.js");
const { Bot } = require("../../handlers/Client");

module.exports = {
  name: "unbanll",
  aliases: ["unball"],
  category: "🚫 Administration",
  memberpermissions: ["ADMINISTRATOR"],
  cooldown: 5,
  description: "Unban all Banned Users in Guild",
  usage: "[COMMAND]",
  /**
   * @param {Bot} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    try {
      message.guild.fetchBans((bans) => {
        if (bans.size == 0) {
          message.channel.send(
            new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setDescription(`No Banned Users`)
              .setFooter(ee.footertext)
          );
        } else {
          bans.forEach((ban) => {
            message.guild.members.unban(ban.user.id);
          });
          message.channel.send(
            new MessageEmbed()
              .setColor(ee.color)
              .setDescription(`All Banned Users ✅ Successfully Unabanned..`)
              .addField(`🔰 Unbanned By <@${message.author.id}>`)
              .setFooter(ee.footertext)
          );
        }
      });
    } catch (e) {
      message.channel.send(new MessageEmbed().setDescription(e));
    }
  },
};
