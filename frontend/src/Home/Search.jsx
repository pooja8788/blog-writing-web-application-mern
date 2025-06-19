import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../utils";


const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/blogs/search?q=${query}`);
      setResults(res.data);
      setSearchActive(true);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setSearchActive(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <form onSubmit={handleSubmit} style={{ textAlign: "center", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Search blog posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "0.75rem",
            width: "320px",
            maxWidth: "80%",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "1rem",
            marginRight: "0.5rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0a66c2",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
        {searchActive && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#999",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              marginLeft: "0.5rem",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        )}
      </form>

      {searchActive && (
        <div>
          <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>Search Results</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
              padding: "1rem",
            }}
          >
            {results.length > 0 ? (
              results.map((post) => (
                <Link
                  to={`/blog/${post._id}`}
                  key={post._id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                    }}
                  >
                    <img
                      src={post.blogImage?.url}
                      alt={post.title}
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.src = "/default.jpg";
                      }}
                    />
                    <div style={{ padding: "1rem" }}>
                      <p
                        style={{
                          color: "#0a66c2",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          fontSize: "0.85rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {post.category}
                      </p>
                      <h2 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
                        {post.title}
                      </h2>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "0.75rem",
                        }}
                      >
                        <img
                          src={post.adminPhoto}
                          alt="User"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                          onError={(e) => {
                            e.target.src = "/default-user.jpg";
                          }}
                        />
                        <p style={{ fontWeight: "500" }}>{post.adminName}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p style={{ textAlign: "center", fontSize: "1rem", marginTop: "2rem" }}>
                No results found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
