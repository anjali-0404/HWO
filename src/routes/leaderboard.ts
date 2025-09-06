import { Router } from 'express';
import { getLeaderboard, submitScore } from '../controllers/leaderboardController.js';

const router = Router();

router.get('/', getLeaderboard);
router.post('/', submitScore);

export default router;
