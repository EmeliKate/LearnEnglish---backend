const express = require("express");
const {google} = require("googleapis");
require("dotenv").config()
const app = express();
app.use(express.json());

const cors = require("cors")
app.use(
    cors({
        origin: "*"
    })
)

app.get("/api-tests/", async (req, res) =>{

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    });

    const spreadsheetID = "18bADrHyK6wxTcV_c3-Aqco_qLqghkTXt1E9Iw20Wblg";

    const getRows = await googleSheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: spreadsheetID,
        range: "Tests"
    });

    res.send(getRows.data);
});


app.post("/api-tests/", async (req, res) =>{

    const {name, password} = req.body;

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    });

    const spreadsheetID = "18bADrHyK6wxTcV_c3-Aqco_qLqghkTXt1E9Iw20Wblg";

    const getRows = await googleSheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: spreadsheetID,
        range: "Tests"
    });


    await googleSheets.spreadsheets.values.append({
        auth: auth,
        spreadsheetId: spreadsheetID,
        range: "Tests",
        valueInputOption: "RAW",
        resource: {
            values: [[name, password]]
        }
    })

    res.send(getRows.data);
});

app.listen(80, (req, res) => {
    console.log("running on 80");
})
