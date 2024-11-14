//codes after swagger applied.

import express from "express";
import axios from "axios";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const PORT = 5000;

// Swagger Ayarları
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sweden Crimes API",
      version: "1.0.0",
      description: "Sweden crime data API for various locations",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./swagger-server.js"],
};

// Swagger doc.
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
console.log("swaggerDocs", swaggerDocs);

app.get("/crimes-sweden", async (req, res) => {
  /**
   * @swagger
   * /crimes-sweden:
   *   get:
   *     summary: Get crimes across Sweden
   *     description: Fetches recent crime events happening in Sweden.
   *     responses:
   *       200:
   *         description: List of crime events in Sweden

   */
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
    res.status(500).send("Error fetching data");
  }
});

app.get("/crimes-goteborg", async (req, res) => {
  /**
   * @swagger
   * /crimes-goteborg:
   *   get:
   *     summary: Get crimes in goteborg
   *     description: Fetches recent crime events happening in the goteborg area.
   *     responses:
   *       200:
   *         description: List of crime events in goteborg
   *
   */
  try {
    const response = await axios.get(
      " https://brottsplatskartan.se/api/events/?location=goteborg&limit=15"
    );
    res.json(response.data.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
