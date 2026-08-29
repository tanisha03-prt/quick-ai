import ai from "../utils/gemini.js";
import { removeBackground as removeBg } from "@imgly/background-removal-node";

// ======================================================
// REMOVE BACKGROUND
// ======================================================

export const removeBackground = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    console.log("Image received:", req.file.originalname);
    console.log("Image size:", req.file.size);
    console.log("Removing background...");

    // Convert multer Buffer into Blob
    const inputBlob = new Blob(
      [req.file.buffer],
      {
        type: req.file.mimetype,
      }
    );

    // Remove background locally
    const outputBlob = await removeBg(inputBlob);

    // Convert Blob -> ArrayBuffer -> Buffer
    const outputBuffer = Buffer.from(
      await outputBlob.arrayBuffer()
    );

    // Convert image to Base64
    const imageBase64 =
      outputBuffer.toString("base64");

    console.log(
      "Background removed successfully"
    );

    return res.json({
      success: true,
      message: "Background removed successfully",
      image: `data:image/png;base64,${imageBase64}`,
    });

  } catch (error) {
    console.log(
      "Remove Background Error:",
      error?.message || error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Background removal failed",
    });
  }
};


// ======================================================
// BLOG TITLES
// ======================================================

export const writeBlogTitles = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const prompt = `
Generate 10 catchy blog titles about "${topic}".

Requirements:

- Return only the titles.
- Number them from 1 to 10.
- Make them SEO-friendly.
- Make them engaging and click-worthy.
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

    const titles = response.text
      .split("\n")
      .filter(
        (title) => title.trim() !== ""
      )
      .map((title) =>
        title
          .replace(/^\d+[.)]\s*/, "")
          .trim()
      );

    return res.json({
      success: true,
      titles,
    });

  } catch (error) {
    console.log(
      "Blog Title Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to generate titles",
    });
  }
};


// ======================================================
// WRITE ARTICLE
// ======================================================

export const writeArticle = async (req, res) => {
  try {
    const { topic, length } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const prompt = `
Write a professional article on "${topic}".

Requirements:

- Length: approximately ${length || 500} words
- Use Markdown formatting
- Include:
  - Title
  - Introduction
  - Headings
  - Bullet points
  - Conclusion
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    return res.json({
      success: true,
      article: response.text,
    });

  } catch (error) {
    console.log(
      "Article Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to generate article",
    });
  }
};


// ======================================================
// GENERATE IMAGE
// ======================================================

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    return res.status(503).json({
      success: false,
      message:
        "Image generation is currently unavailable because the fal.ai balance is exhausted.",
    });

  } catch (error) {
    console.log(
      "Generate Image Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Image generation failed",
    });
  }
};