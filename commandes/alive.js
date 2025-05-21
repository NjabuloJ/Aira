const { fana } = require('../njabulo/fana');
const { addOrUpdateDataInAlive, getDataFromAlive } = require('../bdd/alive');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

fana(
    {
        nomCom: 'alive',
        categorie: 'General',
        reaction: "⚡"
    },
    async (dest, zk, { ms, arg, repondre, superUser }) => {
        const data = await getDataFromAlive();
        const time = moment().tz('Etc/GMT').format('HH:mm:ss');
        const date = moment().format('DD/MM/YYYY');
        const mode = (s.MODE.toLowerCase() === "yes") ? "public" : "private";

        if (!arg || !arg[0]) {
            let aliveMsg;

            if (data) {
                const { message, lien } = data;
                aliveMsg = `Alec-Jb\n\n🔥 Alec-Jb is alive, Yo!* 🔥\n *👑 𝐎𝐰𝐧𝐞𝐫*: ${s.OWNER_NAME}\n *🌐 𝐌𝐨𝐝𝐞*: ${mode}\n *📅 𝐃𝐚𝐭𝐞*: ${date}\n*⏰ 𝐓𝐢𝐦𝐞 (GMT)*: ${time}\n *💬 𝐌𝐞𝐬𝐬𝐚𝐠𝐞*: ${message}\n *🤖 power by Njabulo Jb*\n`;
                try {
                    if (lien) {
                        if (lien.match(/\.(mp4|gif)$/i)) {
                            await zk.sendMessage(dest, { 
                                video: { url: lien }, 
                                caption: aliveMsg 
                            }, { quoted: ms });
                        } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
                            await zk.sendMessage(dest, { 
                                image: { url: lien }, 
                                caption: aliveMsg 
                            }, { quoted: ms });
                        } else {
                            repondre(aliveMsg);
                        }
                    } else {
                        repondre(aliveMsg);
                    }
                } catch (e) {
                    console.error("Error:", e);
                    repondre(`Alec-Jb\n\nOOPS! Alec-Jb failed to show off: ${e.message} 😡 Try again! 😣\n`);
                }
            } else {
                aliveMsg = `𝐓𝐎𝐗𝐈𝐂-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ *🔥 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇 𝐢𝐬 𝐀𝐋𝐈𝐕𝐄, Yo!* 🔥\n│❒ *👑 𝐎𝐰𝐧𝐞𝐫*: ${s.OWNER_NAME}\n│❒ *🌐 𝐌𝐨𝐝𝐞*: ${mode}\n│❒ *📅 𝐃𝐚𝐭𝐞*: ${date}\n│❒ *⏰ 𝐓𝐢𝐦𝐞 (GMT)*: ${time}\n│❒ *💬 𝐌𝐞𝐬𝐬𝐚𝐠𝐞*: Yo, I'm 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇, ready to rock! Set a custom vibe with *alive [message];[link]*! 😎\n│❒ *🤖 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧*\n◈━━━━━━━━━━━━━━━━◈`;
                repondre(aliveMsg);
            }
        } else {
            if (!superUser) { 
                repondre(`Alec-Jb{M𝐃\n\n🛑 Yo, only Njabulo Jb can mess with Alec-Jb’s vibe! 😡\n`); 
                return;
            }

            const [texte, tlien] = arg.join(' ').split(';');
            await addOrUpdateDataInAlive(texte, tlien);
            repondre(`𝐓�{Alec-Jb\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ ✅ Alec-Jb’s alive message updated! You’re killing it! 🔥\n`);
        }
    }
);