import React from "react";

const Popup: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>("");

  const handleClick = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3001/api/input");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setValue(data.value);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup">
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Get Value from Server"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {value && (
        <pre className="ascii-art" style={{ marginTop: 16 }}>
          {value}
        </pre>
      )}
    </div>
  );
};

export default Popup;
