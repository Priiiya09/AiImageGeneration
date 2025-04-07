const dotenv = require('dotenv');
const { createError } = require('../error.js');

dotenv.config();

const generateImage = async (req, res, next) => {
    try {
        const fetch = (await import('node-fetch')).default; // Dynamic import
        const { prompt } = req.body;

        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to generate image");
        }

        const result = await response.blob();
        const base64Image = await result.arrayBuffer();

        const base64String = Buffer.from(base64Image).toString("base64");

        return res.status(200).json({ photo: base64String });
    } catch (err) {
        console.error("Error generating image:", err);
        next(createError(500, err.message || "Internal Server Error"));
    }
};

module.exports = { generateImage };
