const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        receiver: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        province: { type: String, required: true },
        district: { type: String, required: true },
        ward: { type: String, required: true },
        isDefault: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);