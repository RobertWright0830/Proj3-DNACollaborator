const express = require('express'); //x
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const csv = require('csvtojson');
require('dotenv').config(); //x
const { ApolloServer } = require('@apollo/server');  //x
const {expressMiddleware} = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const segment = require('./models/Segment');
const upload = multer({ dest: 'uploads/' });


const {typeDefs, resolvers} = require('./schemas'); //x
const db = require('./config/connection');

const PORT = process.env.PORT; //x
const app = express(); //x
const server = new ApolloServer({ //x
    typeDefs,
    resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.post("/upload", upload.single("file"), async (req, res) => {
    try {
      console.log("Received file:", req.file.path);
      const jsonObj = await csv().fromFile(req.file.path);
      console.log("Parsed CSV:", jsonObj);

      const chromosomeInfo = jsonObj.map((item) => ({
        testerId: item["PrimaryKit"],
        matchId: item["MatchedKit"],
        chromosome: item["chr"],
        start: parseInt(item["B37Start"], 10),
        end: parseInt(item["B37End"], 10),
        segmentCm: parseFloat(item["Segment cM"]),
        snp: parseInt(item["SNPs"], 10),
        matchName: item["MatchedName"],
        sex: item["Matched Sex"],
        matchEmail: item["MatchedEmail"],
      }));
      console.log("Mapped data for MongoDB:", chromosomeInfo);

      await segment.insertMany(chromosomeInfo);
      console.log("Data inserted into MongoDB");

      res.status(200).send({
        message: "Data uploaded successfully",
      });

      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
        else console.log("File deleted successfully");
      });
    } catch (err) {
      console.error("Error uploading data:", err);
      res.status(500).send({
        message: "Data upload failed",
        error: err,
      });
    }
  });
  
  app.use(
    "/graphql",
    expressMiddleware(server, {
      //x
      context: authMiddleware,
    })
  );

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      //x
      console.log(`API server running on port ${PORT} !`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
}

  startApolloServer();