const { Message, MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.js");
const { Bot } = require("../../handlers/Client");

module.exports = {
  name: "bans",
  aliases: ["bns"],
  category: "🚫 Administration",
  memberpermissions: ["ADMINISTRATOR"],
  cooldown: 5,
  description: "Fetch all Banned User",
  usage: "[COMMAND]",
  /**
   * @param {Bot} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    const Banned = await message.guild.fetchBans();
    const banmemers = (await Banned)
      .map((member) => `${member.user.tag}`)
      .join(`\n`);

    message.channel.send(
      new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`${banmemers}`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter(ee.footertext)
    );
  },
};
