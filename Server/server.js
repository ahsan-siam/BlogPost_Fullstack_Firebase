const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const admin = require("firebase-admin");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Firebase Admin Setup
const serviceAccount = require("./serviceAccountKey.json"); // your Firebase service account JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://blogspot122025-default-rtdb.firebaseio.com", // your DB URL
});

const db = admin.database();

// Enable CORS so React frontend can call this server
app.use(cors());

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Make sure uploads folder exists
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// In-memory posts array (optional, for demo)
let posts = [];

// GET all posts
app.get("/posts", async (req, res) => {
  try {
    const snapshot = await db.ref("posts").once("value");
    const data = snapshot.val() || {};
    const allPosts = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    res.json(allPosts.reverse()); // newest first
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});










// GET all posts
// GET all posts with uid, username, text, image, and timestamp
app.get("/getPosts", async (req, res) => {
  try {
    // Fetch posts from Firebase
    const snapshot = await db.ref("posts").once("value");
    const data = snapshot.val() || {};

    // Convert to array and pick required fields
    const allPosts = Object.keys(data).map((key) => ({
      id: key,
      uid: data[key].uid,
      userName: data[key].userName,  // Include username
      text: data[key].text,
      imageName: data[key].imageName,
      timestamp: data[key].timestamp,
    }));

    // Sort by newest first
    allPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    console.log(allPosts);
    res.json(allPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});


// POST a new post
app.post("/posts", upload.single("image"), async (req, res) => {
  try {
    const { text, userName, userEmail, uid } = req.body;
    const imageName = req.file ? req.file.filename : null;
    const timestamp = new Date().toISOString();

    const newPost = {
      uid,
      userName,
      userEmail,
      text,
      imageName,
      timestamp,
    };
console.log(newPost);
    // Save to Firebase Realtime Database
    const ref = db.ref("posts");
    const postRef = ref.push();
    await postRef.set(newPost);

    // Optional: save to in-memory array for quick access
    posts.unshift({ id: postRef.key, ...newPost });

    res.status(201).json({ id: postRef.key, ...newPost });
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ error: "Failed to save post" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
