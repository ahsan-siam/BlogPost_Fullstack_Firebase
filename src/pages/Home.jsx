import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom
import { auth, provider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "../firebase";

function Home() {
  const navigate = useNavigate(); // To redirect after login/signup
  const backgroundImageUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f";

  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData)); // Save user data in localStorage
      alert("Logged in user UID: " + userData.uid);
      navigate("/feed"); // Redirect to Feed page after successful login
    } catch (error) {
      console.error(error);
    }
  };

  // Email/Password Sign-In
  const handleEmailSignIn = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userData = result.user;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData)); // Save user data in localStorage
      alert("Logged in user UID: " + userData.uid);
      navigate("/feed"); // Redirect to Feed page after successful login
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // Email/Password Signup
  const handleEmailSignup = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const userData = result.user;
      if (name) {
        await userData.updateProfile({ displayName: name });
      }
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData)); // Save user data in localStorage
      alert("Signed up user UID: " + userData.uid);
      navigate("/feed"); // Redirect to Feed page after successful signup
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div
      style={{
        paddingTop: "140px",
        minHeight: "calc(100vh - 140px)",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "30px",
        paddingRight: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "60px",
          maxWidth: "1100px",
          width: "100%",
          alignItems: "center",
        }}
      >
        {/* LEFT: Blog Info */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "3.2rem", marginBottom: "20px" }}>My Blog</h1>
          <p style={{ fontSize: "1.2rem", lineHeight: "1.7", color: "#e0e0e0" }}>
            A place to share ideas, stories, tutorials, and experiences about technology, creativity, and learning.
          </p>
        </div>

        {/* RIGHT: Flip Login/Signup Card */}
        <div style={{ perspective: "1000px", flex: 1, maxWidth: "400px" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "400px",
              transformStyle: "preserve-3d",
              transition: "transform 0.6s",
              transform: isSignup ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* LOGIN FORM */}
            <div style={{ ...cardStyle, backfaceVisibility: "hidden" }}>
              <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

              <input type="email" placeholder="Email" style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" style={inputStyle} value={password} onChange={e => setPassword(e.target.value)} />

              <button style={buttonStyle} onClick={handleEmailSignIn}>Sign In</button>
              <button style={googleButtonStyle} onClick={handleGoogleSignIn}>Sign In with Google</button>

              <p style={switchText}>
                Don’t have an account?{" "}
                <span style={linkStyle} onClick={() => setIsSignup(true)}>Sign up</span>
              </p>
            </div>

            {/* SIGNUP FORM */}
            <div style={{ ...cardStyle, transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>
              <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Sign Up</h2>

              <input type="text" placeholder="Name" style={inputStyle} value={name} onChange={e => setName(e.target.value)} />
              <input type="email" placeholder="Email" style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" style={inputStyle} value={password} onChange={e => setPassword(e.target.value)} />

              <button style={buttonStyle} onClick={handleEmailSignup}>Create Account</button>
              <button style={googleButtonStyle} onClick={handleGoogleSignIn}>Sign Up with Google</button>

              <p style={switchText}>
                Already have an account?{" "}
                <span style={linkStyle} onClick={() => setIsSignup(false)}>Login</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* STYLES */
const cardStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.65)",
  borderRadius: "20px",
  padding: "35px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const inputStyle = {
  padding: "12px 14px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  fontSize: "0.95rem",
};

const buttonStyle = {
  marginTop: "10px",
  padding: "12px",
  borderRadius: "999px",
  border: "none",
  backgroundColor: "#ffffff",
  color: "#000",
  fontWeight: "600",
  cursor: "pointer",
};

const googleButtonStyle = {
  marginTop: "10px",
  padding: "12px",
  borderRadius: "999px",
  border: "none",
  backgroundColor: "#4285F4",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
};

const switchText = {
  marginTop: "10px",
  fontSize: "0.9rem",
  textAlign: "center",
  color: "#cccccc",
};

const linkStyle = {
  color: "#ffffff",
  textDecoration: "underline",
  cursor: "pointer",
};

export default Home;
