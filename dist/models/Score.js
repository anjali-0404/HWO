import mongoose, { Schema } from 'mongoose';
const ScoreSchema = new Schema({
    user: { type: String, required: true, index: true },
    score: { type: Number, required: true, min: 0 },
    createdAt: { type: Date, default: Date.now }
});
export const Score = mongoose.model('Score', ScoreSchema);
