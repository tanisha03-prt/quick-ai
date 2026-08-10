import ai from "../utils/gemini.js";
import { InferenceClient } from "@huggingface/inference";

// ======================================
// BLOG TITLES
// ======================================

export const writeBlogTitles = async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
Generate 10 catchy blog titles about "${topic}".

Requirements:
- Return only the titles.
- Number them from 1 to 10.
- Make them SEO-friendly.
- Make them engaging and click-worthy.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const titles = response.text
      .split("\n")
      .filter((title) => title.trim() !== "");

    return res.json({
      success: true,
      titles,
    });
  } catch (error) {
    console.log("Blog Title Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// WRITE ARTICLE
// ======================================

export const writeArticle = async (req, res) => {
  try {
    const { topic, length } = req.body;

    const prompt = `
Write a professional article on "${topic}".

Requirements:
- Length: approximately ${length} words
- Use Markdown formatting
- Include:
  - Title
  - Introduction
  - Headings
  - Bullet points
  - Conclusion
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return res.json({
      success: true,
      article: response.text,
    });
  } catch (error) {
    console.log("Article Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GENERATE IMAGE
// ======================================

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    const client = new InferenceClient(
      process.env.HUGGINGFACE_API_KEY
    );

    const imageBlob = await client.textToImage({
      model: "black-forest-labs/FLUX.1-dev",
      inputs: prompt,
    });

    const buffer = Buffer.from(await imageBlob.arrayBuffer());

    const imageBase64 = buffer.toString("base64");

    return res.json({
      success: true,
      image: `data:image/png;base64,${imageBase64}`,
    });

  } catch (error) {
    console.log(
      "Generate Image Error:",
      error?.message || error
    );

    return res.status(500).json({
      success: false,
      message: error?.message || "Image generation failed",
    });
  }
};