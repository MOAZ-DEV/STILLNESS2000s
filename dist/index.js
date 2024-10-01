"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const express_1 = __importDefault(require("express"));
const useGemini_1 = require("./hooks/useGemini");
const usePollinations_1 = require("./hooks/usePollinations");
const useInstagram_1 = require("./hooks/useInstagram");
const shared_1 = require("./shared");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/', async (req, res) => {
    console.log('Cron job started at:', new Date().toISOString());
    res.status(200).write('Cron job started at: ' + new Date().toISOString());
    GET().catch((err) => {
        res.status(400).emit('Error occurred during cron job:' + err + ' at: ' + new Date().toISOString());
    });
});
async function GET(request) {
    try {
        const geminiImagePrompt = await (0, useGemini_1.useGemini)({ prompt: shared_1.prompt });
        const geminiCaption = await (0, useGemini_1.useGemini)({ prompt: shared_1.caption });
        const pollinationsResult = await (0, usePollinations_1.usePollinations)(geminiImagePrompt.result, 3000, 3000, 'turbo', 24);
        await (0, useInstagram_1.useInstagram)(shared_1.accessToken, shared_1.userId, pollinationsResult.res, geminiCaption.result)
            .catch(err => {
            GET();
        });
    }
    catch (error) {
        console.clear();
        console.error('Error occurred during cron job:', error);
        GET();
    }
}
;
app.listen(port, () => {
    console.clear();
    console.log(`Server is running on port ${port}`);
});
