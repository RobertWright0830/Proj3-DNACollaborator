const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const csv = require("csvtojson");
require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const segment = require("./models/Segment");
const upload = multer({ dest: "uploads/" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT;
const YOUR_DOMAIN = "http://localhost:4242";
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

const corsOptions = {
  origin: "http://localhost:3000", // Allow this origin to make requests
  credentials: true, // Allow credentials for cross-origin requests
};

app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.post("/upload", upload.single("file"), async (req, res) => {
    console.log("upload endpoint hit");

    if (req.user) {
      console.log("User authenticated:", req.user);
    } else {
      console.log("User not authenticated");

      const profileId = req.user?.profileId;
      console.log("Extracted Profile ID:", profileId);
    }

    try {
      console.log("Received file:", req.file.path);
      const jsonObj = await csv().fromFile(req.file.path);
      console.log("Parsed CSV:", jsonObj);
      const profileId = req.body.profileId;

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
        profile: new mongoose.Types.ObjectId(profileId),
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

  app.post("/create-checkout-session", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1OjFLMEHAN1uW3wvhWw5145x",
          quantity: 1,
        },
      ],
      mode: "payment",
       success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      automatic_tax: {
        enabled: true,
      },
    });

    res.redirect(303, session.url);
  });

  app.listen(4242, () => console.log("Running on port 4242"));

 
  app.use(
    "/graphql",
    expressMiddleware(server, {
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
      console.log(`API server running on port ${PORT} !`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
