// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// // eslint-disable-next-line react/prop-types
// export const AuthProvider = ({ children }) => {
//   const [blogs, setBlogs] = useState([]);
//   const [profile, setProfile] = useState();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         let token = localStorage.getItem("jwt");
//         if (token) {
//           const { data } = await axios.get(
//             "http://localhost:4001/api/users/my-profile",
//             {
//               withCredentials: true,
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             }
//           );
//           setProfile(data.user);
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     const fetchBlogs = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:4001/api/blogs/all-blogs",
//           { withCredentials: true }
//         );
//         setBlogs(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchBlogs();
//     fetchProfile();
//   }, []);

//   // FAVORITES LOGIC
//   const toggleFavorite = (blog) => {
//     setFavorites((prev) => {
//       const exists = prev.find((b) => b._id === blog._id);
//       if (exists) {
//         return prev.filter((b) => b._id !== blog._id);
//       } else {
//         return [...prev, blog];
//       }
//     });
//   };

//   const isFavorite = (id) => {
//     return favorites.some((b) => b._id === id);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         blogs,
//         profile,
//         setProfile,
//         isAuthenticated,
//         setIsAuthenticated,
//         favorites,
//         toggleFavorite,
//         isFavorite,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);





// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";
// import { BACKEND_URL } from "../utils";


// export const AuthContext = createContext();

// // eslint-disable-next-line react/prop-types
// export const AuthProvider = ({ children }) => {
//   const [blogs, setBlogs] = useState([]);
//   const [profile, setProfile] = useState();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [favorites, setFavorites] = useState([]);

//   // Fetch user's favorite blogs
//   const fetchFavorites = async () => {
//     try {
//       const { data } = await axios.get(
//         `${BACKEND_URL}/api/users/favorites`,
//         { withCredentials: true }
//       );
//       setFavorites(data.favorites);
//     } catch (error) {
//       console.log("Error fetching favorites:", error);
//     }
//   };

//   //  Fetch profile and blogs on mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("jwt");
//         if (token) {
//           const { data } = await axios.get(
//             `${BACKEND_URL}/api/users/my-profile`,
//             {
//               withCredentials: true,
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             }
//           );
//           setProfile(data.user);
//           setIsAuthenticated(true);
//           await fetchFavorites(); // fetch favorites once profile is available
//         }
//       } catch (error) {
//         console.log("Error fetching profile:", error);
//       }
//     };

//     const fetchBlogs = async () => {
//       try {
//         const { data } = await axios.get(
//           `${BACKEND_URL}/api/blogs/all-blogs`,
//           { withCredentials: true }
//         );
//         setBlogs(data);
//       } catch (error) {
//         console.log("Error fetching blogs:", error);
//       }
//     };

//     fetchBlogs();
//     fetchProfile();
//   }, []);

//   // Toggle favorite status of a blog
//   const toggleFavorite = async (blogId) => {
//     try {
//       await axios.post(
//         `${BACKEND_URL}/api/users/toggle-favorite/${blogId}`,
//         {},
//         { withCredentials: true }
//       );

//       // Re-fetch updated list of favorite blogs
//       await fetchFavorites();
//     } catch (error) {
//       console.log("Error toggling favorite:", error);
//     }
//   };

//   //  Check if a blog is in favorites
//   const isFavorite = (id) => {
//     return favorites.some((b) => b._id === id);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         blogs,
//         profile,
//         setProfile,
//         isAuthenticated,
//         setIsAuthenticated,
//         favorites,
//         toggleFavorite,
//         isFavorite,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; 
import { BACKEND_URL } from "../utils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (token) {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/users/my-profile`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setProfile(data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/blogs/all-blogs`, {
        withCredentials: true,
      });
      setBlogs(data);
    } catch (error) {
      console.log("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchBlogs();
  }, []);

  const toggleLike = async (blogId) => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/blogs/${blogId}/like`,
        {},
        { withCredentials: true }
      );
      await fetchBlogs();
    } catch (error) {
      console.log("Error toggling like:", error);
    }
  };

  const isBlogLikedByUser = (blog) => {
    if (!profile) return false;
    return blog.likes?.includes(profile._id);
  };

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        toggleLike,
        isBlogLikedByUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
