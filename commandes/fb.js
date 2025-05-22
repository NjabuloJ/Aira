const {fana} = require('../njabulo/fana');
const fs = require('fs');
const getFBInfo = require("@xaviabot/fb-downloader");
const { default: axios } = require('axios');

fana({nomCom : "instagram" , categorie : "Download"},async (dest , zk , commandeOptions)=>{
  const {ms,repondre,arg} = commandeOptions ;

  let link = arg.join(' ')

  if (!arg[0]) { repondre('Veillez insérer un lien video instagramme');return}; 

  try {
     
    let igvid = await axios('https://vihangayt.me/download/instagram?url='+link)

    if (igvid.data.data.data[0].type == 'video') {
    zk.sendMessage(dest,{video : {url : igvid.data.data.data[0].url},caption : "*Alec-Jb*\n😌💫Hold up, Grabbing your instagram like a pro! 🔍\n",gifPlayback : false },{quoted : ms}) 
    }
    else {
        zk.sendMessage(dest,{image : {url : igvid.data.data.data[0].url},caption : "*Alec-Jb*\nHold up, Grabbing your instagram like a pro! 🔍\n"})
    }
  
  } catch (e) {repondre("erreur survenue lors du téléchargement \n " + e)}
  
});


fana({
  nomCom: "facebook",
  categorie: "Download",
  reaction: "📽️"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('*Alec-Jb*\n🤬😡DON’T WASTE MY VIBES! Give me title, like . Facebook and put links and video Faded! 😡\n facebook video link!');
    return;
  }

  const queryURL = arg.join(" ");

  try {
     getFBInfo(queryURL)
    .then((result) => {
       let caption = `
        titre: ${result.title}
        Lien: ${result.url}
      `;
       zk.sendMessage(dest,{image : { url : result.thumbnail}, caption : caption},{quoted : ms}) ;
       zk.sendMessage(dest, { video: { url: result.hd  }, caption: '*Alec-Jb*\n🤗Hold up, Grabbing your fb like a pro! 🔍\n' }, { quoted: ms });
      
    })
    .catch((error) => {console.log("Error:", error)
                      repondre('*Alec-Jb*\n🤬NO Facebook ! Your query is TRASH! Try again! 😣\ntry fbdl2 on this link')});


   
  } catch (error) {
    console.error('*Alec-Jb*\n😡Erreur lors du téléchargement de la vidéo :', error);
    repondre('*Alec-Jb*\n🥵Erreur lors du téléchargement de la vidéo.' , error);
  }
});



fana({ nomCom: "tiklote", categorie: "Download", reaction: "🎵" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`how to use this command:\n ${prefixe}tiktok tiktok_video_link`);
    return;
  }

  const videoUrl = arg.join(" ");

 let data = await axios.get('https://vihangayt.me/download/tiktok?url='+ videoUrl) ;

  let tik = data.data.data

      // Envoi du message avec le thumbnail de la vidéo
      const caption = `
Author: ${tik.author}
Description: ${tik.desc}
      `;

         
      zk.sendMessage(dest, { video: { url: tik.links[0].a} , caption : caption },{quoted : ms});    

  
});

fana({
  nomCom: "lite",
  categorie: "Download",
  reaction: "🎥"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('*Alec-Jb*\nHEY,  😤 What’s this nonsense? No lite?\n🤬 Stop wasting my time and give me lite and put links fb');
    return;
  }

  const queryURL = arg.join(" ");

  try {
     getFBInfo(queryURL)
    .then((result) => {
       let caption = `
        titre: ${result.title}
        Lien: ${result.url}
      `;
       zk.sendMessage(dest,{image : { url : result.thumbnail}, caption : caption},{quoted : ms}) ;
       zk.sendMessage(dest, { video: { url: result.sd  }, caption: '*Alec-Jb*\n🥰Hold up, Grabbing your Facebook like a pro! 🔍\n' }, { quoted: ms });
      
    })
    .catch((error) => {console.log("Error:", error)
                      repondre(error)});


   
  } catch (error) {
    console.error('*Alec-Jb*\n🤬🥵Erreur lors du téléchargement de la vidéo :', error);
    repondre('*Alec-Jb*\n😭🤷Erreur lors du téléchargement de la vidéo.' , error);
  }
});

                         
