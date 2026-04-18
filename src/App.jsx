import React from "react";

function App() {
  return (
    <div style={{
      backgroundColor: "#FF9900",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>あかりshop ☆</h1>
      <div style={{
        backgroundColor: "white",
        color: "#FF9900",
        padding: "20px 40px",
        borderRadius: "50px",
        fontWeight: "bold",
        fontSize: "1.5rem"
      }}>
        React 起動成功！
      </div>
    </div>
  );
}

export default App;
