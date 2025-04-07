const Post = require('../models/Posts.js');
const dotenv = require('dotenv');
const { createError } = require('../error.js');
const cloudinary = require("cloudinary").v2;

dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({});
        return res.status(201).json({ success: true, data: posts });
    } catch (err) {
        next(createError(err.status, err?.response?.data?.error?.message || err?.message));
    }
};

const createPost = async (req, res, next) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl?.secure_url,
        });
        return res.status(201).json({ success: true, data: newPost });
    } catch (err) {
        next(createError(err.status, err?.response?.data?.error?.message || err?.message));
    }
};

module.exports = { getAllPosts, createPost };
