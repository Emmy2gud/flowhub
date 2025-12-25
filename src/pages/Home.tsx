import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>FlowHub Home</h1>
      <p>This is a public home page.</p>

      <Link
        to="/signup"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          background: "#000",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "6px",
        }}
      >
        Go to Sign Up
      </Link>
    </div>
  );
}
