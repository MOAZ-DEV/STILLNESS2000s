"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePollinations = void 0;
const usePollinations = async (prompt, width = 5000, height = 5000, model = 'any-dark', seed = -1) => {
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&model=${model}&seed=${seed}&nologo=true`;
    const response = await fetch(url);
    return {
        res: response.url.toString()
    };
};
exports.usePollinations = usePollinations;
