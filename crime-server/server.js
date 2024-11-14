//codes before swagger applied.

import express from "express";
import axios from "axios";
const app = express();
const PORT = 3000;

app.get("/crimes-sweden", async (req, res) => {
  try {
    const response = await axios.get(
      "https://brottsplatskartan.se/api/events/?location=sverige&limit=150"
    );
    const eventsData = response.data.data.map((event) => ({
      headline: event.headline,
      title_location: event.title_location,
      pubdate_iso8601: event.pubdate_iso8601,
      description: event.description,
    }));
    res.json(eventsData);
  } catch (err) {
    console.error(err);
  }
});

app.get("/crimes-goteborg", async (req, res) => {
  try {
    const response = await axios.get(
      " https://brottsplatskartan.se/api/events/?location=goteborg&limit=15"
    );
    res.json(response.data.data);
  } catch (err) {
    console.error(err);
  }
});

// I want to create an endpoint according to "type" parameter.

app.get("crimes-malmo", async (req, res) => {
  try {
    const response = await axios.get(
      "https://brottsplatskartan.se/api/events/?type=trafikolycka"
    );

    res.json(response.data);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server works on port ${PORT}`);
});
