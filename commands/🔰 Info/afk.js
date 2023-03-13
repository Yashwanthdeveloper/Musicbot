const { Message, MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");
const config = require("../../config/config.js");
const { Bot } = require("../../handlers/Client");

module.exports = {
  name: "afk",
  aliases: [""],
  category: "🔰 Info",
  memberpermissions: ["SEND_MESSAGES"],
  cooldown: "",
  description: "Put User in AFK",
  usage: "",
  /**
   * @param {Bot} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    const reason = args.join(" ") || "No reason!";

    client.afk.set(message.author.id, [Date.now(), reason]);

    message.reply(`You have been set as AFK. \`${reason}\``);
  },
};
