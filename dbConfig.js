require('dotenv').config()
var dbConfig = {};
dbConfig.ENV_MOOD = (process.env.MicrosoftAppId == '1ab3d967-8d07-4c6f-b697-5ab3a2a04690') ? 'DEV':'LIVE';
dbConfig.API_URL = (dbConfig.ENV_MOOD == 'DEV') ? "https://teddinodeapp.azurewebsites.net/" : "https://teddibackend.azurewebsites.net/"; //API url (teddi backend)
dbConfig.DB_SERVICE_ENDPOINT = (dbConfig.ENV_MOOD == 'DEV') ? "https://teddi-cosmosdb-instance-sql.documents.azure.com:443/" : "https://teddi-db.documents.azure.com:443/"; //cosmos db url
dbConfig.AUTH_KEY = (dbConfig.ENV_MOOD == 'DEV') ? "FAtkho7iQAq7CvuArBfpOb9MD1ByFCVPEIkUpRp8NCtN3N0cGptD8xANihUYYpZZJf4McyQfOCCfCIdjZMdgYQ==": "QywTQMRPKGGROlyIxmdAxvm4uWumPPbeGjGzbgsFg4710K1pLapMcBn5woKGU1k7YTXn1GGYaXtBNSXpCZPoEw=="; //cosmos b auth key
dbConfig.DATABASE_ID = "botdocs";
dbConfig.CONTAINER = "botdata";

// console.log(dbConfig)

module.exports = dbConfig;