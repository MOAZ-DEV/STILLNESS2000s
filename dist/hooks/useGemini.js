"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGemini = void 0;
const generative_ai_1 = require("@google/generative-ai");
const API_KEY = "AIzaSyDzJEmVkZejnnIkIGcPI0_oatFnei3phDo";
const useGemini = async ({ prompt }) => {
    console.log(prompt);
    const genAI = new generative_ai_1.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return {
        result: result.response.text()
    };
};
exports.useGemini = useGemini;
