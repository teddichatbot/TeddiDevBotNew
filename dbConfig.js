var dbConfig = {};

dbConfig.API_URL = "https://teddinodeapp.azurewebsites.net/"; //API url (teddi backend)
dbConfig.DB_SERVICE_ENDPOINT = "https://teddi-cosmosdb-instance-sql.documents.azure.com:443/"; //cosmos db url
dbConfig.AUTH_KEY = "FAtkho7iQAq7CvuArBfpOb9MD1ByFCVPEIkUpRp8NCtN3N0cGptD8xANihUYYpZZJf4McyQfOCCfCIdjZMdgYQ=="; //cosmos b auth key
dbConfig.DATABASE_ID = "botdocs";
dbConfig.CONTAINER = "botdata";



module.exports = dbConfig;