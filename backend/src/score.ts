import mongoose from "mongoose";

// 
const ScoreSchema = new mongoose.Schema({
    sbd: {type: String, required: true, unique: true},
    toan: {type: Number, required: false},
    ngu_van: {type: Number, required: false},
    ngoai_ngu: {type: Number, required: false},
    vat_li: {type: Number, required: false},
    hoa_hoc: {type: Number, required: false},
    sinh_hoc: {type: Number, required: false},
    lich_su: {type: Number, required: false},
    dia_li: {type: Number, required: false},
    gdcd: {type: Number, required: false},
    ma_ngoai_ngu: {type: String, required: false, match: /^N[1-9]$/}
});

const ScoreModel = mongoose.model("Score", ScoreSchema);
export {ScoreModel};