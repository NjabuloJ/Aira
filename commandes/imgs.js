const { fana } = require('../njabulo/fana');
const gis = require('g-i-s');
const axios = require('axios');
const conf = require(__dirname + '/../set');

fana({
  nomCom: "img",
  aliases: ["image", "images"],
  categorie: "Images",
  reaction: "🖼️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('*Alec-Jb*\n😡😡DON’T WASTE MY VIBES! Give me a img title, like .img Faded! 😡\n');
    return;
  }

  const searchTerm = arg.join(" ");
  gis(searchTerm, (error, results) => sendImage(error, results));

  function sendImage(error, results) {
    if (error) {
      repondre("*Alec-Jb*\nNO IMAGES ! Your query is TRASH! Try again! 😣\nOops, an error occurred.");
      return;
    }

    if (!results || results.length === 0) {
      repondre("*Alec-Jb*\n😂NO IMAGES ! Your query is TRASH! Try again! 😣\n");
      return;
    }

    for (let i = 0; i < Math.min(results.length, 5); i++) {
      zk.sendMessage(dest, {
        image: { url: results[i].url },
        caption: `*Alec-Jb*\nHold up, Grabbing your  image like a pro! 🔍\n`,
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
          serverMessageId: 143,
         }
        }
      }, { quoted: ms });
    }
  }
});

fana({
  nomCom: 'messi',
  categorie: 'images',
  reaction: '💗'
}, async (dest, zk, context) => {
  const { repondre: sendMessage, ms } = context;
  try {
    const response = await axios.get("https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/Messi.json");
    const images = response.data;

    if (!Array.isArray(images) || images.length === 0) {
      throw new Error("*Alec-Jb*\n😏DON’T WASTE MY VIBES! Give me a mess title, like .mess Faded! 😡\n.");
    }

    for (let i = 0; i < 5; i++) {
      const randomImage = Math.floor(Math.random() * images.length);
      const image = images[randomImage];
      await zk.sendMessage(dest, {
        image: { url: image },
        caption: `*Alec-Jb*\nHold up, Grabbing your  image like a pro! 🔍\n`,
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         serverMessageId: 143,
         }
        }
      }, { quoted: ms });
    }
  } catch (error) {
    console.error("*Alec-Jb*\n🤣Error occurred while retrieving data:", error);
    sendMessage("*Alec-Jb*\n🥵Error occurred while retrieving data: " + error.message);
  }
});
fana({
  nomCom: "waifu",
  categorie: "images",
  reaction: "💗"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const url = 'https://api.waifu.pics/nsfw/waifu'; // Replace with your actual URL

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      await zk.sendMessage(origineMessage, {
        image: { url: imageUrl },
        caption: `*Alec-Jb*\nHold up, Grabbing your  image like a pro! 🔍\n`,
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         serverMessageId: 143,
         }
        }
      }, { quoted: ms });
    }
  } catch (error) {
    repondre('*Alec-Jb*\n🥺Error retrieving data: ' + error.message);
  }
});
fana({
  nomCom: "trap",
  categorie: "images",
  reaction: "💗"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const url = 'https://api.waifu.pics/nsfw/trap'; // Replace with your actual URL

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      await zk.sendMessage(origineMessage, {
        image: { url: imageUrl },
        caption: `*Alec-Jb*\nHold up, Grabbing your  image like a pro! 🔍\n`,
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         serverMessageId: 143,
         }
        }
      }, { quoted: ms });
    }
  } catch (error) {
    repondre('*Alec-Jb*\n🥵🥵Error retrieving data: ' + error.message);
  }
});
fana({
  nomCom: "neko",
  categorie: "images",
  reaction: "☘️"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const url = 'https://api.waifu.pics/nsfw/neko'; // Replace with your actual URL

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      await zk.sendMessage(origineMessage, {
        image: { url: imageUrl },
        caption: `*Alec-Jb*\nNO IMAGES ! Your query is TRASH! Try again! 😣\n`,
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         serverMessageId: 143,
         }
        }
      }, { quoted: ms });
    }
  } catch (error) {
    repondre('*Alec-Jb*\n😂Error retrieving data: ' + error.message);
  }
});
fana({
  nomCom: "blowjob",
  categorie: "images",
  reaction: "💗"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const url = 'https://api.waifu.pics/nsfw/blowjob'; // Replace with your actual URL

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      await zk.sendMessage(origineMessage, {
        image: { url: imageUrl },
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         serverMessageId: 143,
          }
        }
      }, { quoted: ms });
    }
  } catch (error) {
    repondre('*Alec-Jb*\n😡😡Error retrieving data: ' + error.message);
  }
});

        
