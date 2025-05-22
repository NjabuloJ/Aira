const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const conf = require(__dirname + "/../set");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

fana({ nomCom: "ma", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../njabulo//fana");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault ("Africa/nairobi");
        const hour = moment().hour();
    let greeting = "🌅ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ!";
    if (hour >= 12 && hour < 18) {
        greeting = "🌄ɢᴏᴏᴅ ᴀғᴛᴇʀɴɴᴏɴ!;
    } else if (hour >= 18) {
        greeting = "🌇ɢᴏᴏᴅ ᴇᴠᴇʀɴɪɴɢ!";
    } else if (hour >= 22 || hour < 5) {
        greeting = "🌌ɢᴏᴏᴅ ɴɪɢʜᴛ";
    };
    

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');
    
  let infoMsg =  `
*╭─❖ 𓆩 🦋 𓆪 ❖─╮*
     *Alec-Jb*
*╰─❖ 𓆩 🦋 𓆪 ❖─╯* 
*╭─❖*
*┋🕵️ ʙᴏᴛ ɴᴀᴍᴇ : ɴᴊᴀʙᴜʟᴏ ᴊʙ*
*┋📅 ᴅᴀᴛᴇ: ${date}*
*┋⏰ ᴛɪᴍᴇ: ${temps}*
*┋🫂hallo: ${greeting}
*┋📟ʀᴀᴍ* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())} 
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

