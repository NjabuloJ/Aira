const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

fana({ nomCom: "lana", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../njabulo//fana");
    var coms = {};
    var mode = s.MODE.toLowerCase() !== "yes" ? "private" : "public";

    cm.map(async (com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Nairobi");
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // Generate greeting based on time of day
    const hour = moment().hour();
    let greeting = "Good Morning";
    if (hour >= 12 && hour < 18) {
        greeting = "Good afternnon!";
    } else if (hour >= 18) {
        greeting = "Good Everning!";
    } else if (hour >= 22 || hour < 5) {
        greeting = "Good Night 🌌";
    }

    let infoMsg = `
*╭─❖ 𓆩 🦋 𓆪 ❖─╮*
     *Alec-Jb*
*╰─❖ 𓆩 🦋 𓆪 ❖─╯* 
*╭─❖*
*┋🕵️ ʙᴏᴛ ɴᴀᴍᴇ : ɴᴊᴀʙᴜʟᴏ ᴊʙ*
*┋📅 ᴅᴀᴛᴇ: ${date}*
*┋⏰ ᴛɪᴍᴇ: ${temps}*
*┋🫂hallo: ${greeting}*
*┋📟ᴘʟᴜɢɪɴs ᴄᴍᴅ
*╰─❖*

> 𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐓𝐄𝐂𝐇\n${readmore}`;
    
    
let menuMsg = `

 *𝐀𝐕𝐀𝐈𝐋𝐀𝐁𝐋𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒*`;

    for (const cat in coms) {
        menuMsg += `╭──────✣ *${cat}* ✣─────︎⊷⊷`;
        for (const cmd of coms[cat]) {
            menuMsg += `
│❍│ ${cmd}`;
        }
        menuMsg += `
╰────────────···▸▸ \n`
    }

    menuMsg += `> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄᴀsᴇʏʀʜᴏᴅᴇs ᴛᴇᴄʜ
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, {
      image: { url: imageUrl },
      text: infoMsg + menuMsg,
      contextInfo: {
       footer: "*Njabulo Jb*, developed by Njabulo",
        gifPlayback: true,
        externalAdReply: {
          title: "Alec-Jb",
          body: "public bot",
          mediaType: 1,
          thumbnailUrl: "https://files.catbox.moe/2d2gvj.jpg",
         sourceUrl: "https://github.com/NjabuloJ/Njabulo-Jb",
         renderLargerThumbnail: true,
         showAdAttribution: true,
        }
      }
    }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, {
     image: { url: imageUrl },
      text: infoMsg + menuMsg,
      contextInfo: {
        footer: "*Njabulo_Jb*, developed by Njabulo",
        externalAdReply: {
          title: "Alec-Jb",
          body: "public bot",
          mediaType: 1,
          thumbnailUrl: "https://files.catbox.moe/2d2gvj.jpg",
         sourceUrl: "https://github.com/NjabuloJ/Njabulo-Jb",
        renderLargerThumbnail: true,
         showAdAttribution: true,
        }
      }
    }, { quoted: ms });
      }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    zk.sendMessage(dest, {
   image: { url: imageUrl },
      text: infoMsg + menuMsg,
     footer: "*Njabulo Jb*, developed by Njabulo",
     gifPlayback: true,
      contextInfo: {
        externalAdReply: {
          title: "Alec-Jb",
          body: "public bot",
          mediaType: 1,
          thumbnailUrl: "https://files.catbox.moe/2d2gvj.jpg",
         sourceUrl: "https://github.com/NjabuloJ/Njabulo-Jb",
        renderLargerThumbnail: true,
         showAdAttribution: true,
        }
      }
    }, { quoted: ms });
    
}

});

