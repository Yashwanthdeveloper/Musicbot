const { Message, MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.js");
const { Bot } = require("../../handlers/Client");

module.exports = {
  name: "avatar",
  aliases: ["av", "pfp"],
  category: "🔰 Info",
  memberpermissions: [],
  cooldown: 5,
  description: "Show User Avatar",
  usage: "avatar [@USER] [global]",
  /**
   * @param {Bot} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    try {
      var user = message.mentions.users.first() || message.author;

      message.channel.send(
        new MessageEmbed()
          .setColor(ee.color)
          .setTitle(
            `Avatar Of : ${user.tag}`,
            user.displayAvatarURL({ dynamic: true })
          )
          .addField(
            "❱ PNG",
            `[\`LINK\`](${user.displayAvatarURL({ format: "png" })})`,
            true
          )
          .addField(
            "❱ JPEG",
            `[\`LINK\`](${user.displayAvatarURL({ format: "jpg" })})`,
            true
          )
          .addField(
            "❱ WEBP",
            `[\`LINK\`](${user.displayAvatarURL({ format: "webp" })})`,
            true
          )
          .setFooter(ee.footertext, ee.footericon)
          .setImage(
            user.displayAvatarURL({
              dynamic: true,
              size: 512,
            })
          )
      );
    } catch (e) {
      message.channel.send(
        new MessageEmbed().setColor(ee.color).setDescription(e)
      );
    }
  },
};
