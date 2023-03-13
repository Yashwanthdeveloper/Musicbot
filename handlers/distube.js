const { MessageEmbed } = require("discord.js");
const { prefix, config } = require("..");
const ee = require("../config/embed.json");
const { Bot } = require("./Client");

/**
 *
 * @param {Bot} client
 */
module.exports = async (client) => {
  const status = (queue) =>
    `Volume: ${queue.volume}% | Filter: ${queue.filter || " ❌ Off"} | Loop: ${
      queue.repeatMode
        ? queue.repeatMode == 2
          ? "All Queue"
          : " ✅ This Song"
        : "Off"
    } | Autoplay: ${queue.autoplay ? " ✅ On" : " ❌ Off"}`;

  // play song
  client.distube.on("playSong", (queue, song) => {
    queue.textChannel.send(
      new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Now Playing")
        .setDescription(`[${song.name}](${song.url})`)
        .setThumbnail(song.thumbnail.url)
        .addFields(
          {
            name: "Requested by",
            value: `${song.user}`,
            inline: true,
          },
          { name: "Duration", value: song.formattedDuration, inline: true }
        )
        .setFooter(
          `Volume: ${queue.volume}% • ${queue.songs.length} song(s) in queue`
        )
    );
  });

  // add song
  client.distube.on("addSong", (queue, song) => {
    queue.textChannel
      .send(
        new MessageEmbed()
          .setColor(ee.color)
          .setTitle("🎶 Added Song!")
          .setDescription(
            `Song:  [\`${song.name}\`](${song.url}) \n Duration 🎱  \`${song.formattedDuration}\` \n Tracks  ${queue.songs.length}`
          )
          .setFooter(`Requested by: ${song.user.tag}`)
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  });

  // add list
  client.distube.on("addList", (queue, playlist) => {
    queue.textChannel
      .send(
        new MessageEmbed()
          .setColor(ee.color)
          .setTitle("🎶 Added List!")
          .setDescription(
            `List:  [\`${playlist.name}\`](${playlist.url}) \n Duration 🎱  \`${
              playlist.formattedDuration
            }\` \n Tracks  ${playlist.songs.length} \n To Queue${status(queue)}`
          )
          .setFooter(`Requested by: ${playlist.user.tag}`)
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  });

  client.distube.on("error", (channel, e) => {
    channel
      .send(
        new MessageEmbed()
          .setColor(ee.color)
          .setTitle(`This is Error`)
          .setDescription(e)
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  });

  client.distube.on("initQueue", (queue) => {
    queue.autoplay = false;
    queue.volume = 75;
    queue.repeatMode = false;
  });

  client.distube.on("finish", (queue) => {
    queue.textChannel
      .send(
        new MessageEmbed()
          .setColor(ee.color)
          .setDescription(
            `Song is Finished \n type ${prefix}play to Play a New Song`
          )
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  });

  client.distube.on("empty", (queue) => {
    queue.textChannel
      .send(
        new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`Nothing Playing \n i am in VC \nThanks to My Owner`)
      )
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
  });
};
