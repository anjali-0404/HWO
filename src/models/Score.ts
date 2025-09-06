import mongoose, { Schema, Document } from 'mongoose';

export interface IScore extends Document {
  user: string;
  score: number;
  createdAt: Date;
}

const ScoreSchema = new Schema<IScore>({
  user: { type: String, required: true, index: true },
  score: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

export const Score = mongoose.model<IScore>('Score', ScoreSchema);
