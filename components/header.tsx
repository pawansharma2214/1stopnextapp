export default function Header() {
  return (
    <header style={{ padding: "1rem", background: "#047ebfff", color: "white" }}>
      <h1>1StopInstruction</h1>
      <nav>
        <a style={{color:"white"}} href="/">Home</a> | <a style={{color:"white"}} href="/hotel">Hotels</a> | <a style={{color:"white"}} href="/contact">Contact</a>
      </nav>
    </header>
  );
}