import { GoogleGenAI } from "@google/genai";
import { POSITIVE_PROMPT, NEGATIVE_PROMPT } from "../constants";

export const enhanceImage = async (
  base64Data: string, 
  mimeType: string
): Promise<string> => {
  // We use a fresh instance to ensure we pick up the latest selected key if using the selector
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // High-quality image editing model
  const modelId = 'gemini-3-pro-image-preview';

  const fullPrompt = `${POSITIVE_PROMPT}\n\n${NEGATIVE_PROMPT}`;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            text: fullPrompt,
          },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
        ],
      },
      config: {
        imageConfig: {
          // Defaults to 1K. 
          // We rely on the model to try and match aspect ratio or crop intelligently.
          // Explicitly setting 1K ensures stability and speed.
          imageSize: "1K", 
        },
      },
    });

    // Parse the response to find the image part
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return part.inlineData.data;
        }
      }
    }

    throw new Error("No image data found in the response.");
  } catch (error) {
    console.error("Gemini Enhancement Error:", error);
    throw error;
  }
};