import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Feed() {
  const navigate = useNavigate();
  const [storedUser, setStoredUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setStoredUser(user);
    fetchPosts();
  }, []);

  // Fetch all posts from server
  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/getPosts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Handle user sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Sign Out Error: ", error);
      alert("An error occurred during sign out.");
    }
  };

  // Handle posting a new blog
  const handlePost = async () => {
    if (!postText && !postImage) return;

    const formData = new FormData();
    formData.append("text", postText);
    formData.append("uid", storedUser?.uid || storedUser?.uid);
    formData.append("userName", storedUser?.displayName || "Anonymous");
    formData.append("userEmail", storedUser?.email || "unknown@example.com");
    if (postImage) {
      formData.append("image", postImage);
    }

    try {
      const res = await fetch("http://localhost:5000/posts", {
        method: "POST",
        body: formData,
      });
      const savedPost = await res.json();

      // Update posts immediately
      setPosts([savedPost, ...posts]);
      setPostText("");
      setPostImage(null);
    } catch (err) {
      console.error("Error posting:", err);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "0 20px", position: "relative" }}>
      
      {/* Sign Out Button at top-right */}
      {storedUser && (
        <button onClick={handleSignOut} style={signOutButtonFixedStyle}>
          Sign Out
        </button>
      )}

      {/* Show Logged-in User Info */}
      {storedUser && (
        <div style={userInfoStyle}>
          <img
            src={storedUser.photoURL || "https://via.placeholder.com/40"}
            alt="Profile"
            style={profilePicStyle}
          />
          <div style={{ marginLeft: "10px" }}>
            <p style={userNameStyle}>{storedUser.displayName || "User"}</p>
            <p style={userEmailStyle}>{storedUser.email}</p>
          </div>
        </div>
      )}

      {/* Create Post Card */}
      <div style={cardStyle}>
        <textarea
          style={textareaStyle}
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPostImage(e.target.files[0])}
          style={{ marginBottom: "10px" }}
        />
        <button style={buttonStyle} onClick={handlePost}>
          Post
        </button>
      </div>

      {/* Posts Feed */}
      {posts.map((post) => (
        <div key={post.id} style={cardStyle}>
          <div style={{ marginBottom: "10px", fontSize: "0.9rem", color: "#555" }}>
            <span style={{ fontWeight: "bold" }}>{post.userName}</span>
            <span style={{ marginLeft: "10px", fontSize: "0.8rem", color: "#888" }}>
              {new Date(post.timestamp).toLocaleString()}
            </span>
          </div>
          {post.text && <p style={{ marginBottom: "10px" }}>{post.text}</p>}
          {post.imageName && (
            <img
              src={`http://localhost:5000/uploads/${post.imageName}`} // load image from server
              alt="post"
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* STYLES */
const cardStyle = {
  backgroundColor: "#fff",
  padding: "15px",
  borderRadius: "15px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  marginBottom: "20px",
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  marginBottom: "10px",
  resize: "vertical",
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "999px",
  border: "none",
  backgroundColor: "#1877f2",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
};

const signOutButtonFixedStyle = {
  position: "fixed",
  top: "25px",
  right: "25px",
  padding: "10px 20px",
  borderRadius: "999px",
  border: "none",
  backgroundColor: "#f44336",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  zIndex: 1001,
};

const userInfoStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  padding: "10px",
  backgroundColor: "#f7f7f7",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

const profilePicStyle = {
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  objectFit: "cover",
};

const userNameStyle = {
  fontWeight: "bold",
  fontSize: "1rem",
};

const userEmailStyle = {
  fontSize: "0.9rem",
  color: "#555",
};

export default Feed;
