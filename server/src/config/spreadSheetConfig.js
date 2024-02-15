const { google } = require("googleapis");

const sheetCredentials = {
    "type": "service_account",
    "project_id": "tunts-challenge-414119",
    "private_key_id": "057d48c788abf9753b87afa72ca4a339347c8c0e",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnTNN8zoLQMaBx\n+nEeMqeklJ0WaTHIScaVpnWij7ASpY6us5LiSWtd3pM7fcyDJ+PPtCYgVQbwMmWL\n1xFhuf5pM8fP/N3An8QgTyC2LNRl2yJJqAT/eZtqjrO95YLQPvzPPNNg+FwD7ANY\nnesh8jpBCwbu7BOuhEH/45LQgoWuNMxF7rnLqlMOcpTw3QKCxZaDL2EYjPHCoFXE\n9AtLMTM4rbIGcOKTQoPxojPqy0BmPOGiUKidkCutk+sQjGx1s3Y6N2ubD3B2CxOJ\nmv9VAQF1gJx0cwOrQitPoaIWpx8TZZ6j4rsB+bMjmd0rG9MVbmw7LibSBmTVwgp5\nKItBIvlhAgMBAAECggEAPuqjDGhDhNVtAABN4yvspPXo38E+4hJwtt3rlm+QKWsO\nrj/FSQmQcbRfTXvBWj+5qmaXAgjH+7QQQVdn54dBmMHK7rqrkKHk6buoUyqn1Ahl\nrCqeeo96tcel7A/wsq1FeRBodCriu+zZ001MXK9SXhyuBlNNEZAWnAuzLmwvpvQD\nVKmeM0pzmvjP5p/diJqMwOxsST1HiS9+ZjiCj6T45jtCpzkSscX3WFKNuzE9JHk9\ndXUxCtl90b0ZDeoFyAvzyjXJysKOPTEzCpLOsCTvw6mF6ojYEgdLOx2a7gPi7ZCJ\n8Kp+6ebngnEfBfEUjtNXgm7tVu0Gt+ltQlphpRgjGwKBgQDZtXb9wMH8UXzw39lZ\nF5iWoB29bYYIiWBEZ4iKuZQrv7xfOx4qkONyW9hXypmfiXsz3VNl97Ca7Hct5ZU6\nD16wL2qjNz3p0rmzwDHN6KyTPehuuzSUjdX+IqzqJQuJZDfqJ04BqlV/MfKmadB1\nzHnFc9gBoc3WuhW6eXFkpx/mFwKBgQDEuamecOO1FTZiMY8NTJM/2CvWiTziL9g6\nuni+GATnEtvdhtHBmmb+HftyO/f6ToEgBePdTDFVlp2AfiiQSoc8FlgYvgOxzEty\nLywy2hOAzwLh0iobGMvvfn6b5I2pZNW5Ff2Rd90Gc3jc4x+UG5ziVtzpfclIxWyZ\nAAaMTLm/RwKBgQDDxwsdgJUxyTn5BuRW2QBQG+cCrRZGYPugKBbC4cYcXY0ReoFT\nN/5BndR8hmYF8MVJS7Qu00IO360BKh87Gg1FlS5pXkkgF28F9UUUbTOcKaT2xwSu\nvqn8osQqv2uTfvtFZ1kf6ESAYLNb8XYUKPAsn1NVjGMlwSu/CGzvXdcyuwKBgF5l\nVF2hf7IJfrH5Y9IW12VAPjDQY3WJTbFIft2AOwICC5wtsAK9KwRusJPs8J2cA9uw\n19j9UYLnJaZdYutxx5huhFFDBBTRmbYtqoCwIcGiE5j2NpwP9vNxeCEnt038A42v\nXp/pqxYIXItpNGLmKQ52bcRgRjB0AxsbZwj1W//LAoGAFqQrs8yZVYB4+kTaKjzn\nWpzj2OU1Ve87KshoXcR/ufgnDvUYkpUN1YU0KMjQ/O7X3WBC9W4zprHKxIeQLkUb\n+HNi+ym+U1qX4n+K75EYJa1A6OrNLlbEbV4VvWrBU/Ahb9XiRrCrYy19COtfc0SU\ntjVZqfiC/cKSMSCKs59LSDI=\n-----END PRIVATE KEY-----\n",
    "client_email": "tunts-challenge@tunts-challenge-414119.iam.gserviceaccount.com",
    "client_id": "101518374188482942200",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/tunts-challenge%40tunts-challenge-414119.iam.gserviceaccount.com",
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

    const spreadsheetId = "1RSHt9dqXfuRO-GIqalmH29j1IM6UQx2NhRBN6hEZej4";

    return {auth, client, googleSheets, spreadsheetId};
}

module.exports = getAuthSheets;
