// import { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { BACKEND_URL } from "../utils";

// const Search = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [searchActive, setSearchActive] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;

//     try {
//       setLoading(true);
//       const res = await axios.get(`${BACKEND_URL}/api/blogs/search?q=${query}`);
//       setResults(res.data);
//       setSearchActive(true);
//     } catch (error) {
//       console.error("Search error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setQuery("");
//     setResults([]);
//     setSearchActive(false);
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <form onSubmit={handleSubmit} style={{ textAlign: "center", marginBottom: "2rem" }}>
//         <input
//           type="text"
//           placeholder="Search blog posts..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           style={{
//             padding: "0.75rem",
//             width: "320px",
//             maxWidth: "80%",
//             border: "1px solid #ccc",
//             borderRadius: "8px",
//             fontSize: "1rem",
//             marginRight: "0.5rem",
//           }}
//         />
//         <button
//           type="submit"
//           style={{
//             padding: "0.75rem 1.5rem",
//             backgroundColor: "#0a66c2",
//             color: "#fff",
//             border: "none",
//             borderRadius: "8px",
//             fontWeight: "bold",
//             cursor: "pointer",
//           }}
//           disabled={loading}
//         >
//           {loading ? "Searching..." : "Search"}
//         </button>
//         {searchActive && (
//           <button
//             type="button"
//             onClick={handleClear}
//             style={{
//               padding: "0.75rem 1.5rem",
//               backgroundColor: "#999",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               fontWeight: "bold",
//               marginLeft: "0.5rem",
//               cursor: "pointer",
//             }}
//           >
//             Clear
//           </button>
//         )}
//       </form>

//       {searchActive && (
//         <div>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
//               gap: "24px",
//               padding: "1rem",
//             }}
//           >
//             {results.length > 0 ? (
//               results.map((post) => (
//                 <Link
//                   to={`/blog/${post._id}`}
//                   key={post._id}
//                   style={{ textDecoration: "none", color: "inherit" }}
//                 >
//                   <div
//                     style={{
//                       backgroundColor: "#ffffff",
//                       borderRadius: "12px",
//                       overflow: "hidden",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                       transition: "transform 0.2s ease, box-shadow 0.2s ease",
//                       cursor: "pointer",
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "space-between",
//                       height: "100%",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "scale(1.02)";
//                       e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "scale(1)";
//                       e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
//                     }}
//                   >
//                     <img
//                       src={post.blogImage?.url || "/default.jpg"}
//                       alt={post.title}
//                       style={{
//                         width: "100%",
//                         height: "200px",
//                         objectFit: "cover",
//                         objectPosition: "center",
//                         borderBottom: "1px solid #eee",
//                         backgroundColor: "#f2f2f2",
//                       }}
//                       onError={(e) => {
//                         e.target.src = "/default.jpg";
//                       }}
//                     />
//                     <div style={{ padding: "1rem" }}>
//                       <p
//                         style={{
//                           color: "#0a66c2",
//                           fontWeight: "bold",
//                           textTransform: "uppercase",
//                           fontSize: "0.85rem",
//                           marginBottom: "0.5rem",
//                         }}
//                       >
//                         {post.category}
//                       </p>
//                       <h2
//                         style={{
//                           fontSize: "1.25rem",
//                           marginBottom: "0.75rem",
//                           lineHeight: "1.4",
//                           color: "#222",
//                         }}
//                       >
//                         {post.title}
//                       </h2>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           marginTop: "0.75rem",
//                         }}
//                       >
//                         <img
//                           src={post.adminPhoto || "/default-user.jpg"}
//                           alt="User"
//                           style={{
//                             width: "40px",
//                             height: "40px",
//                             borderRadius: "50%",
//                             marginRight: "10px",
//                           }}
//                           onError={(e) => {
//                             e.target.src = "/default-user.jpg";
//                           }}
//                         />
//                         <p style={{ fontWeight: "500", color: "#333" }}>{post.adminName}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))
//             ) : (
//               <p style={{ textAlign: "center", fontSize: "1rem", marginTop: "2rem" }}>
//                 No results found.
//               </p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;


// import { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { BACKEND_URL } from "../utils";

// const Search = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [searchActive, setSearchActive] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;

//     try {
//       setLoading(true);
//       const res = await axios.get(`${BACKEND_URL}/api/blogs/search?q=${query}`);
//       setResults(res.data);
//       setSearchActive(true);
//     } catch (error) {
//       console.error("Search error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setQuery("");
//     setResults([]);
//     setSearchActive(false);
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <form onSubmit={handleSubmit} style={{ textAlign: "center", marginBottom: "2rem" }}>
//         <input
//           type="text"
//           placeholder="Search blog posts..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           style={{
//             padding: "0.75rem",
//             width: "320px",
//             maxWidth: "80%",
//             border: "1px solid #ccc",
//             borderRadius: "8px",
//             fontSize: "1rem",
//             marginRight: "0.5rem",
//           }}
//         />
//         <button
//           type="submit"
//           style={{
//             padding: "0.75rem 1.5rem",
//             backgroundColor: "#0a66c2",
//             color: "#fff",
//             border: "none",
//             borderRadius: "8px",
//             fontWeight: "bold",
//             cursor: "pointer",
//           }}
//           disabled={loading}
//         >
//           {loading ? "Searching..." : "Search"}
//         </button>
//         {searchActive && (
//           <button
//             type="button"
//             onClick={handleClear}
//             style={{
//               padding: "0.75rem 1.5rem",
//               backgroundColor: "#999",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               fontWeight: "bold",
//               marginLeft: "0.5rem",
//               cursor: "pointer",
//             }}
//           >
//             Clear
//           </button>
//         )}
//       </form>

//       {searchActive && (
//         <div>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
//               gap: "24px",
//               padding: "1rem",
//               justifyContent: "start",
//             }}
//           >
//             {results.length > 0 ? (
//               results.map((post) => (
//                 <Link
//                   to={`/blog/${post._id}`}
//                   key={post._id}
//                   style={{ textDecoration: "none", color: "inherit" }}
//                 >
//                   <div
//                     style={{
//                       backgroundColor: "#ffffff",
//                       borderRadius: "12px",
//                       overflow: "hidden",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                       transition: "transform 0.2s ease, box-shadow 0.2s ease",
//                       cursor: "pointer",
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "space-between",
//                       height: "400px",
//                       width: "100%", // ensures it fills its grid cell
//                       maxWidth: "100%",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "scale(1.02)";
//                       e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "scale(1)";
//                       e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
//                     }}
//                   >
//                     <img
//                       src={post.blogImage?.url || "/default.jpg"}
//                       alt={post.title}
//                       style={{
//                         width: "100%",
//                         height: "200px",
//                         objectFit: "cover",
//                         objectPosition: "center",
//                         borderBottom: "1px solid #eee",
//                         backgroundColor: "#f2f2f2",
//                       }}
//                       onError={(e) => {
//                         e.target.src = "/default.jpg";
//                       }}
//                     />
//                     <div style={{ padding: "1rem", overflow: "hidden" }}>
//                       <p
//                         style={{
//                           color: "#0a66c2",
//                           fontWeight: "bold",
//                           textTransform: "uppercase",
//                           fontSize: "0.85rem",
//                           marginBottom: "0.5rem",
//                         }}
//                       >
//                         {post.category}
//                       </p>
//                       <h2
//                         style={{
//                           fontSize: "1.25rem",
//                           marginBottom: "0.75rem",
//                           lineHeight: "1.4",
//                           color: "#222",
//                           whiteSpace: "nowrap",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                         }}
//                       >
//                         {post.title}
//                       </h2>
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           marginTop: "0.75rem",
//                         }}
//                       >
//                         <img
//                           src={post.adminPhoto || "/default-user.jpg"}
//                           alt="User"
//                           style={{
//                             width: "40px",
//                             height: "40px",
//                             borderRadius: "50%",
//                             marginRight: "10px",
//                           }}
//                           onError={(e) => {
//                             e.target.src = "/default-user.jpg";
//                           }}
//                         />
//                         <p style={{ fontWeight: "500", color: "#333" }}>{post.adminName}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))
//             ) : (
//               <p style={{ textAlign: "center", fontSize: "1rem", marginTop: "2rem" }}>
//                 No results found.
//               </p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;


import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../utils";

const Search = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/categories`);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let url = `${BACKEND_URL}/api/blogs/search?q=${query}`;
      if (category) {
        url += `&category=${category}`;
      }

      const res = await axios.get(url);
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
    setCategory("");
    setResults([]);
    setSearchActive(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "0.75rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "1rem",
            backgroundColor: "#fff",
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search blog posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "0.75rem",
            width: "320px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        />

        {/* Search Button */}
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
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        )}
      </form>

      {/* Search Results */}
      {searchActive && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
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
                {/* Blog Card */}
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  <img
                    src={post.blogImage?.url || "/default.jpg"}
                    alt={post.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderBottom: "1px solid #eee",
                    }}
                  />
                  <div style={{ padding: "1rem" }}>
                    <p style={{ color: "#0a66c2", fontWeight: "bold" }}>
                      {post.category}
                    </p>
                    <h2
                      style={{
                        fontSize: "1.25rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {post.title}
                    </h2>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={post.adminPhoto || "/default-user.jpg"}
                        alt="User"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      <p style={{ fontWeight: "500" }}>{post.adminName}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
