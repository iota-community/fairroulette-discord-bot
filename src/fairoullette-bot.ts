import Discord from "discord.js";
import { BOT_TOKEN } from "./config";
import HandleMessage from "./controllers";

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS],
});

client.on("messageCreate", HandleMessage);

client.login(BOT_TOKEN).then(() => {
  console.log("--> fairroulette bot is online");
});
