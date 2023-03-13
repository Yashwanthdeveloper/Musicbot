const { Message, MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.js");
const { Bot } = require("../../handlers/Client");
const moment = require("moment");

module.exports = {
  name: "botinfo",
  aliases: ["binfo"],
  category: "🔰 Info",
  memberpermissions: [],
  cooldown: 5,
  description: "Show Information Of bot",
  usage: "botinfo [@bot] [global]",
  /**
   * @param {Bot} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    try {
      var bot = message.mentions.users.first() || message.author.bot;

      if (!bot || bot == null || bot.id == null || !bot.id)
        return message.reply("bot Not Found");

      const member = message.guild.members.cache.get(bot.id);
      //create the EMBED
      const embedbotinfo = new MessageEmbed().setColor(ee.color);
      embedbotinfo.setThumbnail(
        bot.displayAvatarURL({ dynamic: true, size: 512 })
      );
      embedbotinfo.setAuthor(
        "Information about:   " + bot.username + "#" + bot.discriminator,
        bot.displayAvatarURL({ dynamic: true })
      );
      embedbotinfo.addField(
        "**❱ botname:**",
        `<@${bot.username}>\n\`${bot.tag}\``,
        true
      );
      embedbotinfo.addField("**❱ ID:**", `\`${bot.id}\``, true);
      embedbotinfo.addField(
        "**❱ Avatar:**",
        `[\`Link to avatar\`](${bot.displayAvatarURL({ format: "png" })})`,
        true
      );
      embedbotinfo.addField(
        "**❱ Date Join DC:**",
        "`" +
          moment(bot.createdTimestamp).format("DD/MM/YYYY") +
          "`\n" +
          "`" +
          moment(bot.createdTimestamp).format("hh:mm:ss") +
          "`",
        true
      );
      embedbotinfo.addField(
        "**❱ Is a Bot:**",
        `\`${bot.bot ? "✔️" : "❌"}\``,
        true
      );
      embedbotinfo.setFooter(ee.footertext, ee.footericon);
      //send the EMBED
      message.channel.send(embedbotinfo);
    } catch (e) {
      message.channel.send(
        new MessageEmbed().setColor(ee.color).setDescription(e)
      );
    }
  },
};
