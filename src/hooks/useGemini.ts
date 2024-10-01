import { GoogleGenerativeAI } from "@google/generative-ai";

interface useGeminiProps {
    prompt: string;
}

const API_KEY = "AIzaSyDzJEmVkZejnnIkIGcPI0_oatFnei3phDo";
export const useGemini = async ({ prompt }: useGeminiProps) => {

    console.log(prompt);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    return {
        result: result.response.text()
    }
}