import { GoogleGenAI, Type } from '@google/genai';
import { AIIdentificationResult, AIPriceResearchResult } from '../types';

// Initialize the SDK. Assuming process.env.API_KEY is available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });

export const identifyItemFromImage = async (base64Data: string, mimeType: string): Promise<AIIdentificationResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: 'Analyze this image of a collectible item. Identify what it is. Provide a concise name, a short descriptive summary, and suggest a broad category (e.g., Coins, Stamps, Action Figures, Trading Cards, Fine Art, Memorabilia, etc.).',
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: 'A concise, specific name for the item.',
            },
            description: {
              type: Type.STRING,
              description: 'A short description of the item based on visual details.',
            },
            category: {
              type: Type.STRING,
              description: 'The general category of the collectible.',
            },
          },
          required: ['name', 'description', 'category'],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No text returned from model");
    }
    
    return JSON.parse(resultText) as AIIdentificationResult;
  } catch (error) {
    console.error("Error identifying item:", error);
    throw new Error("Failed to identify item from image.");
  }
};

export const researchItemValue = async (itemName: string): Promise<AIPriceResearchResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Search for the current market value, recent auction results, or typical selling prices for the collectible item: "${itemName}". Provide a brief summary of its value range and factors affecting its price.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const summary = response.text || "No pricing information could be summarized.";
    
    // Extract grounding URLs
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const urls = chunks
      .map(chunk => chunk.web)
      .filter((web): web is { uri: string; title: string } => web !== undefined && web !== null);

    return {
      summary,
      urls,
    };
  } catch (error) {
    console.error("Error researching value:", error);
    throw new Error("Failed to research item value.");
  }
};
