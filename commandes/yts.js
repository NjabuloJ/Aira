
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

  if (!verifAdmin && !superUser) {
    return repondre(`Alec-Jb🤦\nPlease provide a search query😡🤥.\ndont tage me again\ just approve name like alone walker 🙋🤷${nomAuteurMessage},`);
  }

  try {
    const info = await yts(query);
    const results = info.videos;

    if (results.length === 0) {
      return repondre("No results found.");
    }

    let captions = `*${conf.BOT} YOUTUBE SEARCH*\n`;
    results.slice(0, 10).forEach((video, index) => {
      captions += `\n${index + 1}. Title: ${video.title}\n Time: ${video.timestamp}\n Url: ${video.url}\n`;
    });

    captions += "\n_";

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
    console.error(`Alec-Jb😰😊\nError during the search\n  ${nomAuteurMessage}, 🤤🤤process: ${error},`);
    repondre(`Alec-Jb😭 \nError during the search😡😡\n ${nomAuteurMessage}, process: ${error},`);
  }
});
      
