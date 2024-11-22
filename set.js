const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0xpdnVkTkFoMTdEamtxUk5YMFFoQ3NZajUrYVVHbnZxU0ZZOWdDcGkwZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ3EvWEtzM1pWRWlrbEFWZnhRb215MEg0c1JTSDhBajVGdFhWbVc1UGNVZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFQmlqUzdldEpvLzZsZS8rR2JKRGtwRlZMMXdkRXJscDFBNzZiZ2VrRFdjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuQW5XaTRMQkRJYk9zYytDVUxpVGpPR0dtNjAvMTF6dGFTaGYvdnBCdno4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVHVEUzUWxxRkhQb1NHL2tXVmJTL2htVEQrNXRXSm1Xbyt1eWx0Z3Q5VlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhxZHZ6ZEJlVXR2Y0FDV3YxNVh3TGluZnNvSm5oR1prSkUvbGNDdnFoRDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU95dVE1VXRCL0lpa0tRVmIwektoRVR2S3dyNk5QUy96dU1lbjFXUTgwdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWHRBUXRWdm9FWXRGSytnajVKTlI4Z0JnTDd6WmRkeEFrSWNVUkswWVZsOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFEVnMrd3hzYkU4OEptb3JkemVQVTBVckRHRTRPRkFRZnc4ZEpSTFBudXB2SEpFT3gxME1kalNVSnpMYm0wWTdmRDExZnZsNVduR3dOdmc0dEhNaERnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzEsImFkdlNlY3JldEtleSI6InlmZDRTSk9Hd2JKT05QTEZLSHZnZlkzT2tTSmhFSkdROUFmaTd2b3RkQmM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjRXR2JiY0laVHFlUXhyWU9mNnItcVEiLCJwaG9uZUlkIjoiMTA1MDczZGYtYzMwNS00YjhhLTk2YTQtMjNlNmUzY2I1MWI5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlppZklpNzlBK0FrdHkzOXhhNHJra2RObHZhOD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3U0Z5Z1BmaWRhNkR3NzVnVDRCZkFObkhxTlk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTEZNWUM4WEsiLCJtZSI6eyJpZCI6IjI1Njc0MzM5MTU2Njo4N0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJHb29nbGUifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0ltUG5ia0NFUHFHZzdvR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImxIRW5ZdkgvcXBLcjl6ckdKWkl2M2tZUy90VWlkc0hlU3RXd1NiSVRJa1U9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImR0RktZckVpV2RSWEo3M05QYmJvSUMybVRXRUV3NUpONDQ3bXdyblp3R1lVNWQxUUFOOGJEVEwxUE84c1lYQnZuZmFDU1NYbzJFeXB3ZTFvQk0rUkJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJhQTNwRlpDb0grU21zM05iUldSVkRQYnhSaVRGVy9kK0lGSDUvUnRPUU8rVEt0eVNhOUJ6c01VZXg4d0pIYUQwUmR3TXlUTnEzVjMxUmNjYjZWdGdDUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1Njc0MzM5MTU2Njo4N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaUnhKMkx4LzZxU3EvYzZ4aVdTTDk1R0V2N1ZJbmJCM2tyVnNFbXlFeUpGIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMyMjk3NjA4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUhUYyJ9',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/Keithkeizzah/ALPHA-MD1',
    OWNER_NAME : process.env.OWNER_NAME || "google",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "256743391566",  
    ANTILINK : process.env.ANTILINK || "yes",
    ANTI_VV : process.env.ANTI_VV || "yes",               
    AUTO_REPLY : process.env.AUTO_REPLY || "yes",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'yes',              
    CHATBOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "non",
    AUTO_BLOCK: process.env.BLOCK_ALL || 'non',              
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
    CAPTION : process.env.CAPTION || "GóóGLE",
    BOT : process.env.BOT_NAME || 'ALPHA_MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    GEMINI_API_KEY : process.env.GEMINI_API_KEY || 'AIzaSyCcZqDMBa8FcAdBxqE1o6YYvzlygmpBx14',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'yes',              
    CHAT_BOT : process.env.CHAT_BOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
