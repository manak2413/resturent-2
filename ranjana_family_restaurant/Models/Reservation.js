import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({

    name: String,

    email: String,

    phone: String,

    date: String,

    time: String,

    guests: String

});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;