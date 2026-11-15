import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Reservation from "./models/Reservation.js";

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public folder
app.use(express.static("public"));

// EJS setup
app.set("view engine", "ejs");
app.set("views", "./views");

// MongoDB
mongoose
    .connect("mongodb://localhost:27017", {
        dbName: "ranjana_restaurant"
    })
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Error:", error);
    });

// Home page
app.get("/", (req, res) => {
    res.render('index');
});

// Reservation API
app.post("/api/reservations", async (req, res) => {
    try {
        console.log("Reservation Data:", req.body);

        const reservation = await Reservation.create(req.body);

        res.json({
            success: true,
            message: "Table booked successfully!",
            reservation
        });

    } catch (error) {
        console.log("Reservation Error:", error);

        res.status(500).json({
            success: false,
            message: "Booking failed"
        });
    }
});

// Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});