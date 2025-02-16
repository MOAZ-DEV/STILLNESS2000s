interface InstagramMediaResponse {
  id: string;
}

export const useInstagram = async (
  accessToken: string,
  userId: string,
  imageUrl: string,
  caption: string
): Promise<void> => {
  try {
    // Step 1: Upload the image
    const imageUploadUrl = `https://graph.instagram.com/v13.0/${userId}/media`;
    const payload = new URLSearchParams({
      image_url: imageUrl,
      caption,
      access_token: accessToken,
    });

    const imageResponse = await fetch(imageUploadUrl, {
      method: 'POST',
      body: payload,
    });

    if (!imageResponse.ok) {
      throw new Error('Failed to upload image: ' + (await imageResponse.text()));
    }

    // Step 2: Type assertion for InstagramMediaResponse
    const imageData: InstagramMediaResponse = (await imageResponse.json()) as InstagramMediaResponse;
    const mediaId = imageData.id;

    // Step 3: Publish the image
    const publishUrl = `https://graph.instagram.com/v13.0/${userId}/media_publish`;
    const publishPayload = new URLSearchParams({
      creation_id: mediaId,
      access_token: accessToken,
    });

    const publishResponse = await fetch(publishUrl, {
      method: 'POST',
      body: publishPayload,
    });

    if (!publishResponse.ok) {
      throw new Error('Failed to publish image: ' + (await publishResponse.text()));
    }

    console.log('Image uploaded and published successfully');
  } catch (err: any) {
    console.clear();
    console.error('Error uploading image:', err.message);
  }
};
