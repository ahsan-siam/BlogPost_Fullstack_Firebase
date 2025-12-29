import { useState } from "react";

function About() {
  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97";

  const resources = [
    {
      title: "📘 Articles & Blogs",
      desc: "High-quality articles on React, JavaScript, UI/UX, and best practices.",
    },
    {
      title: "🛠 Developer Tools",
      desc: "Code editors, browser extensions, and productivity tools I use daily.",
    },
    {
      title: "🎓 Learning Platforms",
      desc: "Free and paid platforms to learn web development step by step.",
    },
    {
      title: "🎨 Design Resources",
      desc: "UI inspiration, color palettes, icons, and typography tools.",
    },
    {
      title: "📚 Documentation",
      desc: "Official docs and references that every developer should bookmark.",
    },
    {
      title: "🔗 Useful Links",
      desc: "Hand-picked links that save time and improve workflow.",
    },
  ];

  return (
    <div
      style={{
        paddingTop: "140px",
        minHeight: "calc(100vh - 140px)", // ✅ FIX
        backgroundImage: `linear-gradient(
          rgba(0,0,0,0.7),
          rgba(0,0,0,0.7)
        ), url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          width: "90%",
          backgroundColor: "rgba(0,0,0,0.55)",
          borderRadius: "22px",
          padding: "45px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.45)",
          marginBottom: "40px", // prevents cut-off at bottom
        }}
      >
        <h1 style={{ fontSize: "3rem", textAlign: "center" }}>
          Resources
        </h1>

        <p
          style={{
            fontSize: "1.15rem",
            textAlign: "center",
            color: "#d0d0d0",
            marginBottom: "45px",
            lineHeight: "1.7",
          }}
        >
          A growing library of tools, articles, and learning resources
          that help you build better, faster, and smarter.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "25px",
          }}
        >
          {resources.map((item, index) => (
            <ResourceCard
              key={index}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ title, desc }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: hover
          ? "rgba(255,255,255,0.15)"
          : "rgba(255,255,255,0.08)",
        borderRadius: "18px",
        padding: "25px",
        boxShadow: hover
          ? "0 20px 40px rgba(0,0,0,0.5)"
          : "0 10px 20px rgba(0,0,0,0.35)",
        transform: hover ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>
      <p style={{ color: "#d8d8d8", lineHeight: "1.6" }}>{desc}</p>
    </div>
  );
}

export default About;
