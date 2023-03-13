const { Message, MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.js");
const { Bot } = require("../../handlers/Client");

module.exports = {
  name: "dmall",
  aliases: ["pl"],
  category: "🚫 Administration",
  memberpermissions: ["ADMINISTRATOR"],
  cooldown: 5,
  description: "Send DM to all Guild Members",
  usage: "[COMMAND] + [text]",
  /**
   * @param {Bot} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    if (message.author.id !== message.guild.owner.id) {
      return message.channel.send(
        new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`\`\` Only Guild Owner Can use This Command \`\``)
          .setFooter(ee.footertext)
      );
    } else {
      let dmtext = args.slice(1).join(" ");

      message.guild.members.cache.forEach((user) => {
        user
          .send(
            new MessageEmbed()
              .setColor(ee.color)
              .setTitle(`Message From ${message.author.username}`)
              .setDescription(`** ${dmtext} **`)
              .setFooter(ee.footertext)
          )
          .catch((err) => console.log(err));
      });
      message.channel.send(`Done`).then((msg) => msg.delete({ timeout: 5000 }));
    }
  },
};
