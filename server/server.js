const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

// static data of clients with api
app.get("/api/clients", (req, res) => {
  res.json([
    { id: 1, name: "Client A", role: "Finance", contact: "clienta@securelytix.com" },
    { id: 2, name: "Client B", role: "Retail", contact: "clientb@securelytix.com" },
    { id: 3, name: "Client C", role: "SEO", contact: "clientc@securelytix.com" },
    { id: 4, name: "Client D", role: "Advertisor", contact: "clientd@securelytix.com" },
    { id: 5, name: "Client E", role: "Supplier", contact: "cliente@securelytix.com" },
  ]);
});

// static data of employees with api
app.get("/api/employees", (req, res) => {
  res.json([
    { id: 1, name: "Eddy", role: "Engineer", contact: "eddy@securelytix.com" },
    { id: 2, name: "Paul", role: "Manager", contact: "paul@securelytix.com" },
    { id: 3, name: "Nina", role: "Tester", contact: "nina@securelytix.com" },
    { id: 4, name: "Gon", role: "Deployer", contact: "gon@securelytix.com" },
    { id: 5, name: "Lie", role: "TL", contact: "lie@securelytix.com" },
  ]);
});



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running on port", process.env.PORT)
    );
  })
  .catch((err) => console.error("MongoDB Error:", err));
