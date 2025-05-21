const util = require('util');
const fs = require('fs-extra');
const axios = require('axios');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

fana({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../njabulo/fana");

    var commandsList = {};
    var mode = (s.MODE).toLocaleLowerCase() !== "yes" ? "private" : "public";

    cm.map((com) => {
        if (!commandsList[com.categorie]) commandsList[com.categorie] = [];
        commandsList[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('EAT');

    const time = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
- . Owner : ${s.OWNER_NAME}
- . prefix : *[ ${s.PREFIXE} ]*
- . mode : ${mode}
- . date : ${date}
\n`;

    let menuMsg = ``;

    for (const category in commandsList) {
        menuMsg += `
- . ${category} `;
        for (const cmd of commandsList[category]) {
            menuMsg += `          
- . ${cmd}`;
        }
        menuMsg += `
- .`;
    }

    menuMsg += `.\n>`;

    var imageUrl = mybotpic();

    try {
        if (imageUrl.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, { 
                video: { url: imageUrl }, 
                caption: infoMsg + menuMsg, 
                gifPlayback: true,
              },
             },
            }, { quoted: ms });
        } else if (imageUrl.match(/\.(jpeg|png|jpg)$/i)) {
            await zk.sendMessage(dest, { 
                image: { url: imageUrl }, 
                caption: infoMsg + menuMsg,
               },
              },
            }, { quoted: ms });
       }
    } catch (e) {
        console.log("🥵🥵 Error sending menu: " + e);
        repondre("🥵🥵 Error sending menu: " + e);
     }
});
