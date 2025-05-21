
const { fana } = require('../njabulo/fana');
const axios = require("axios");
const yts = require("yt-search");
const fs = require('fs');
const conf = require(__dirname + '/../set');

fana({
  nomCom: "yts",
  categorie: "Search",
  reaction: "🎼"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const query = arg.join(" ");

  if (!query) {
    return repondre("Please provide a search query.");
  }

  try {
    const info = await yts(query);
    const results = info.videos;

    if (results.length === 0) {
      return repondre("No results found.");
    }

    let captions = `*${conf.BOT} YOUTUBE SEARCH*\n`;
    results.slice(0, 10).forEach((video, index) => {
      captions += `*────────────────────*\n${index + 1}.*Title:* ${video.title}\n*Time:* ${video.timestamp}\n*Url:* ${video.url}\n`;
    });

    captions += "\n─────────────────────\n*";

    const thumb = results[0].thumbnail; // Using the first video's thumbnail

    await zk.sendMessage(dest, {
      image: { url: thumb },
      caption: captions,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         serverMessageId: 143,
        },
      },
    }, { quoted: ms });

  } catch (error) {
    console.error("Error during the search process:", error);
    repondre("Error during the search process: " + error.message);
  }
});
      
