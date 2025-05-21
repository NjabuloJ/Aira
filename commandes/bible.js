
const { fana } = require('../njabulo/fana');
const axios = require('axios');
const conf = require(__dirname + "/../set");

fana({
  nomCom: "technews",
  reaction: '📰',
  categorie: 'use'
}, async (dest, zk, context) => {
  const { repondre, ms } = context;

  try {
    // Fetching tech news from the API
    const response = await axios.get("https://fantox001-scrappy-api.vercel.app/technews/random");
    const data = response.data;
    const { thumbnail, news } = data;

    await zk.sendMessage(dest, {
      text: news,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "vw golf",
         serverMessageId: 143,
        },
      },
    }, { quoted: ms });

  } catch (error) {
    console.error("Error fetching tech news:", error);
    await repondre("Sorry, there was an error retrieving the news. Please try again later.\n" + error);
  }
});


fana({
  nomCom: "biblie",
  reaction: '📖',
  categorie: "use"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const reference = arg.join(" ");
  
  if (!reference) {
    return repondre("Please specify the book, chapter, and verse you want to read. Example: bible Mathew 3:16", {
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "vw golf",
         serverMessageId: 143,
        },
      },
    });
  }
  
  try {
    const response = await axios.get(`https://bible-api.com/${reference}`);
    
    if (!response.data) {
      return repondre("Invalid reference. Example: bible john 3:16", {
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "vw golf",
         serverMessageId: 143,
          },
        },
      });
    }
    
    const data = response.data;
    const messageText = `
ᕙ⁠ VW GOLF HOLY BIBLE ᕗ

⁠ *_WE'RE READING:_* ${data.reference}

⁠ *_NUMBER OF VERSES:_* ${data.verses.length}

⁠ *_NOW READ:_* ${data.text}

⁠ *_LANGUAGE:_* ${data.translation_name}
 `;
    
    await zk.sendMessage(dest, {
      text: messageText,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "vw golf",
         serverMessageId: 143,
        },
      },
    }, { quoted: ms });
    
  } catch (error) {
    console.error("Error fetching Bible passage:", error);
    await repondre("An error occurred while fetching the Bible passage. Please try again later.", {
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "vw golf",
         serverMessageId: 143,
        },
      },
    });
  }
});
