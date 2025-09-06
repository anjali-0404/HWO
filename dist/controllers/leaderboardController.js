import { Score } from '../models/Score.js';
export async function getLeaderboard(_req, res) {
    const top = await Score.find().sort({ score: -1, createdAt: 1 }).limit(50).lean();
    res.json(top);
}
export async function submitScore(req, res) {
    const { user, score } = req.body;
    if (!user || typeof score !== 'number') {
        return res.status(400).json({ error: 'user (string) and score (number) are required' });
    }
    const doc = await Score.create({ user, score });
    res.status(201).json(doc);
}
