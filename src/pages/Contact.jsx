function Contact() {
  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "140px", // space for navbar
        backgroundImage: `linear-gradient(
          rgba(0,0,0,0.65),
          rgba(0,0,0,0.65)
        ), url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      {/* Contact Card */}
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.55)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Get in Touch
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.7",
            marginBottom: "40px",
            textAlign: "center",
            color: "#dcdcdc",
          }}
        >
          Have a question, feedback, or just want to say hello?
          I’d love to hear from you.
        </p>

        {/* Contact Info */}
        <div style={{ display: "grid", gap: "25px" }}>
          <div>
            <h3 style={{ marginBottom: "5px" }}>📧 Email</h3>
            <p style={{ color: "#cccccc" }}>your@email.com</p>
          </div>

          <div>
            <h3 style={{ marginBottom: "5px" }}>📍 Location</h3>
            <p style={{ color: "#cccccc" }}>India</p>
          </div>

          <div>
            <h3 style={{ marginBottom: "5px" }}>🌐 Social</h3>
            <p style={{ color: "#cccccc" }}>
              Twitter • GitHub • LinkedIn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
