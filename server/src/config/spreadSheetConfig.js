const { google } = require("googleapis");
require("dotenv").config();


const sheetCredentials = {
    "type": "service_account",
    "project_id": process.env.SHEET_PROJECT_ID,
    "private_key_id": process.env.SHEET_PRIVATE_KEY_ID,
    "private_key": process.env.SHEET_PRIVATE_KEY,
    "client_email": process.env.SHEET_CLIENT_EMAIL,
    "client_id": process.env.SHEET_CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_CERT_URL,
    "client_x509_cert_url": process.env.SHEET_CLIENT_CERT_URL,
    "universe_domain": "googleapis.com"
}

 async function getAuthSheets(){
    // Create a new instance of GoogleAuth 
    const auth = new google.auth.GoogleAuth({
        credentials: sheetCredentials,
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    // Obtain an authenticated client
    const client = await auth.getClient();

    // Create a new instance of Google Sheets API
    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    })

    const spreadsheetId = process.env.SPREAD_SHEET_ID;

    return {auth, client, googleSheets, spreadsheetId};
}

module.exports = getAuthSheets;