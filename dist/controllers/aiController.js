import axios from 'axios';
import { config } from '../config.js';
// Example predict handler
export async function predict(req, res) {
    try {
        const input = req.body;
        // If external ML service configured, proxy to it
        if (config.mlServiceUrl) {
            const { data } = await axios.post(`${config.mlServiceUrl}/predict`, input, {
                timeout: 30000
            });
            return res.json({ source: 'ml-service', ...data });
        }
        // Otherwise return a mock result for now
        const score = Math.round(Math.random() * 100);
        return res.json({
            source: 'mock',
            prediction: 'ok',
            confidence: Math.random(),
            score
        });
    }
    catch (e) {
        return res.status(500).json({ error: e.message || 'Prediction failed' });
    }
}
// Example train handler (multipart or JSON)
export async function train(req, res) {
    try {
        // If files uploaded, list them
        const files = req.files || [];
        const payload = req.body || {};
        if (config.mlServiceUrl) {
            // Forward to external ML service (use FormData if files exist)
            // NOTE: Here we just pass JSON for brevity.
            const { data } = await axios.post(`${config.mlServiceUrl}/train`, { payload }, {
                timeout: 60000
            });
            return res.json({ source: 'ml-service', ...data });
        }
        return res.json({
            source: 'mock',
            receivedFiles: files.map((f) => f.originalname),
            receivedPayload: payload,
            status: 'training-started'
        });
    }
    catch (e) {
        return res.status(500).json({ error: e.message || 'Training failed' });
    }
}
