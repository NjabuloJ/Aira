
const axios = require("axios");
const {fana} = require("../njabulo/fana");
const traduire = require("../njabulo/traduction");
const {Sticker ,StickerTypes}= require('wa-sticker-formatter');

fana({
  nomCom: "ranime",
  categorie: "search",
  reaction: "📺"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const jsonURL = "https://api.jikan.moe/v4/random/anime"; // Remplacez par votre URL JSON

  try {
    const response = await axios.get(jsonURL);
    const data = response.data.data;

    const title = data.title;
    const synopsis = data.synopsis;
    const imageUrl = data.images.jpg.image_url; // Utilisez l'URL de l'image JPG
    const episodes = data.episodes;
    const status = data.status;

    //const texttraduit = await traduire(synopsis,{ to: 'fr' })

    const message = `📺 Titre: ${title}\n🎬 Épisodes: ${episodes}\n📡 Statut: ${status}\n📝 Synopsis: ${synopsis}\n🔗 URL: ${data.url}`;
    
    // Envoyer l'image et les informations
    zk.sendMessage(origineMessage, { image: { url: imageUrl }, caption: message }, { quoted: ms });
  } catch (error) {
    console.error('Error retrieving data from JSON :', error);
    repondre('Error retrieving data from JSON.');
  }
});

fana({
  nomCom: "google",
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;
  
  if (!arg[0] || arg === "") {
    repondre("Give me a query.\n*Example: .google What is a bot.*");
    return;
  }

  const google = require('google-it');
  try {
    const results = await google({ query: arg.join(" ") });
    let msg = `Google search for : ${arg}\n\n`;

    for (let result of results) {
      msg += `➣ Title : ${result.title}\n`;
      msg += `➣ Description : ${result.snippet}\n`;
      msg += `➣ Link : ${result.link}\n\n────────────────────────\n\n`;
    }
    
   // const trdmsg = await traduire(msg,{to : 'fr'})
    repondre(msg);
  } catch (error) {
    repondre("An error occurred during Google search.");
  }
});

fana({
  nomCom: "imdb",
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre , ms } = commandeOptions;

  if (!arg[0] || arg === "") {
    repondre("give the name of a series or film.");
    return;
  }

  try {
    
    const response = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${arg}&plot=full`);
    const imdbData = response.data;

    let imdbInfo = "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n";
    imdbInfo += " ``` 𝕀𝕄𝔻𝔹 𝕊𝔼𝔸ℝℂℍ```\n";
    imdbInfo += "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";
    imdbInfo += "🎬Title    : " + imdbData.Title + "\n";
    imdbInfo += "📅year      : " + imdbData.Year + "\n";
    imdbInfo += "⭐Assessment : " + imdbData.Rated + "\n";
    imdbInfo += "📆Release    : " + imdbData.Released + "\n";
    imdbInfo += "⏳Runtime     : " + imdbData.Runtime + "\n";
    imdbInfo += "🌀Genre      : " + imdbData.Genre + "\n";
    imdbInfo += "👨🏻‍💻Director : " + imdbData.Director + "\n";
    imdbInfo += "✍writers : " + imdbData.Writer + "\n";
    imdbInfo += "👨actors  : " + imdbData.Actors + "\n";
    imdbInfo += "📃Synopsis  : " + imdbData.Plot + "\n";
    imdbInfo += "🌐Language  : " + imdbData.Language + "\n";
    imdbInfo += "🌍Contry      : " + imdbData.Country + "\n";
    imdbInfo += "🎖️Awards : " + imdbData.Awards + "\n";
    imdbInfo += "📦BoxOffice : " + imdbData.BoxOffice + "\n";
    imdbInfo += "🏙️Production : " + imdbData.Production + "\n";
    imdbInfo += "🌟score : " + imdbData.imdbRating + "\n";
    imdbInfo += "❎imdbVotes : " + imdbData.imdbVotes + "";

    zk.sendMessage(dest, {
      image: {
        url: imdbData.Poster,
      },
      caption: imdbInfo,
    }, {
      quoted: ms,
    });
  } catch (error) {
    repondre("An error occurred while searching IMDb.");
  }
});

fana({
  nomCom: "movie",
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre , ms } = commandeOptions;

  if (!arg[0] || arg === "") {
    repondre("give the name of a series or film.");
    return;
  }

  try {
    
    const response = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${arg}&plot=full`);
    const imdbData = response.data;

    let imdbInfo = "THANKS ALL FOR THE SUPPORT ITS ME PKDRILLER \n";
    imdbInfo += " ``` FILMS```\n";
    imdbInfo += "*Made by Ibrahim Adams*\n";
    imdbInfo += "🎬Title    : " + imdbData.Title + "\n";
    imdbInfo += "📅year      : " + imdbData.Year + "\n";
    imdbInfo += "⭐Assessment : " + imdbData.Rated + "\n";
    imdbInfo += "📆Release    : " + imdbData.Released + "\n";
    imdbInfo += "⏳Runtime     : " + imdbData.Runtime + "\n";
    imdbInfo += "🌀Genre      : " + imdbData.Genre + "\n";
    imdbInfo += "👨🏻‍💻Director : " + imdbData.Director + "\n";
    imdbInfo += "✍writers : " + imdbData.Writer + "\n";
    imdbInfo += "👨actors  : " + imdbData.Actors + "\n";
    imdbInfo += "📃Synopsis  : " + imdbData.Plot + "\n";
    imdbInfo += "🌐Language  : " + imdbData.Language + "\n";
    imdbInfo += "🌍Contry      : " + imdbData.Country + "\n";
    imdbInfo += "🎖️Awards : " + imdbData.Awards + "\n";
    imdbInfo += "📦BoxOffice : " + imdbData.BoxOffice + "\n";
    imdbInfo += "🏙️Production : " + imdbData.Production + "\n";
    imdbInfo += "🌟score : " + imdbData.imdbRating + "\n";
    imdbInfo += "❎imdbVotes : " + imdbData.imdbVotes + "";

    zk.sendMessage(dest, {
      image: {
        url: imdbData.Poster,
      },
      caption: imdbInfo,
    }, {
      quoted: ms,
    });
  } catch (error) {
    repondre("An error occurred while searching IMDb.");
  }
});


