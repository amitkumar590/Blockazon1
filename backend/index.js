const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("DB Connected!");

  //   const userSchema = new mongoose.Schema({
  //     account: {
  //       type: String,
  //       unique: true, // Add unique index
  //       required: true, // Add required validation
  //     },
  //   });

  const buySchema = new mongoose.Schema({
    account: {
      type: String,
      required: true,
    },
    product: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  });

  //   const User = mongoose.model("User", userSchema);
  const History = mongoose.model("History", buySchema);

  const server = express();

  server.use(cors());
  server.use(bodyParser.json());

  //   server.post("/demo", async (req, res) => {
  //     const user = new User();
  //     user.account = req.body;
  //     await user
  //       .save()
  //       .then(() => {
  //         console.log("New User added");
  //         res.send("User added successfully");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         res.status(500).send("Error saving user");
  //       });
  //   });

  server.post("/buy", async (req, res) => {
    console.log("Buy....");
    try {
      const { account, product, quantity, currentDate } = req.body;

      // Create a new instance of the History model
      const history = new History({
        account: account,
        product: product,
        quantity: quantity,
        date: currentDate,
      });

      // Save the history object to the database
      await history.save();

      console.log("Purchase history added");
      res.send("Purchase history added successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error saving purchase history");
    }
  });

  server.listen(8080, () => {
    console.log("Server started...");
  });
}
