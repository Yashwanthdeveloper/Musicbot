const { Client, Collection } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const fs = require("fs");
const { GiveawayManagerWithOwnDatabase } = require("./customGiveawayManager");

class Bot extends Client {
  constructor() {
    super({
      messageCacheLifetime: 60,
      fetchAllMembers: false,
      messageCacheMaxSize: 10,
      restTimeOffset: 0,
      restWsBridgetimeout: 100,
      shards: "auto",
      disableEveryone: true,
      partials: ["MESSAGE", "CHANNEL", "REACTION"],
      allowedMentions: {
        parse: ["everyone", "roles", "users"],
      },
    });

    this.config = require("../config/config");
    this.commands = new Collection();
    this.aliases = new Collection();
    this.events = new Collection();
    this.afk = new Collection();
    this.voiceCollection = new Collection();
    this.cooldowns = new Collection();
    this.category = fs.readdirSync("./commands/");
    this.db = require("quick.db");
    this.distube = new DisTube(this, {
      leaveOnEmpty: false,
      leaveOnFinish: true,
      leaveOnStop: true,
      savePreviousSongs: true,
      searchSongs: 0,
      ytdlOptions: {
        highWaterMark: 1024 * 1024 * 64,
        quality: "highestaudio",
        format: "audioonly",
        liveBuffer: 60000,
        dlChunkSize: 1024 * 1024 * 4,
      },
      customFilters: this.config.customFilters,
      youtubeDL: false, // deprecated
      plugins: [
        new SpotifyPlugin(),
        new SoundCloudPlugin(),
        new YtDlpPlugin({ update: false }),
      ],
    });
    this.giveawaysManager = new GiveawayManagerWithOwnDatabase(this, {
      default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        embedColorEnd: "#000000",
        reaction: "🎉",
      },
      updateCountdownEvery: 3000,
    });
  }
}

module.exports = { Bot };
