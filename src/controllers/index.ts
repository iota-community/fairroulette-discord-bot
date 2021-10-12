import Discord from "discord.js";
const START_TRIGGER = "-start";
import WebSocket from "ws";

const startLogging = async (channel: Discord.TextBasedChannels) => {
  const WS_URI =
    "ws://wasp:wasp@193.26.156.200:9090/chain/mGy3Xk5boDS4KfTVtdYfBHevUYqnaYbsTdtH46JfNsFV/ws";

  const ws = new WebSocket(WS_URI);

  ws.on("open", () => {
    console.log("connected");
  });

  ws.on("message", (data) => {
    const msg = data.toString();
    if (msg.startsWith("vmmsg")) {
      const eventType = msg.split("fairroulette.")[1].split(" ")[0];
    }
  });
};

const HandleMessage = (msg: Discord.Message) => {
  if (msg.content.startsWith(START_TRIGGER)) {
    startLogging(msg.channel);
  }
};

export default HandleMessage;
