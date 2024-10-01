export const usePollinations = async (prompt: string, width = 5000, height = 5000, model = 'any-dark', seed = -1) => {
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&model=${model}&seed=${seed}&nologo=true`;
  const response = await fetch(url);
  return {
    res: response.url.toString()
  }
}

