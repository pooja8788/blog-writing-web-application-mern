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
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const fetchProfile = async () => {
  //   try {
  //     const token = localStorage.getItem("jwt");
  //     if (token) {
  //       const { data } = await axios.get(
  //         `${BACKEND_URL}/api/users/my-profile`,
  //         {
  //           withCredentials: true,
  //           headers: { "Content-Type": "application/json" },
  //         }
  //       );
  //       setProfile(data.user);
  //       setIsAuthenticated(true);
  //     }
  //   } catch (error) {
  //     console.log("Error fetching profile:", error);
  //   }
  // };

  const fetchProfile = async () => {
  try {
    const { data } = await axios.get(
      `${BACKEND_URL}/api/users/my-profile`,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    setProfile(data.user);
    setIsAuthenticated(true);
  } catch (error) {
    console.log("Error fetching profile:", error);
    setProfile(null);
    setIsAuthenticated(false);
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
    if (!profile) {
      alert("Please log in to like blogs.");
      return;
    }

    // Optimistically update UI
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => {
        if (blog._id === blogId) {
          const isLiked = blog.likes.includes(profile._id);
          return {
            ...blog,
            likes: isLiked
              ? blog.likes.filter((id) => id !== profile._id)
              : [...blog.likes, profile._id],
          };
        }
        return blog;
      })
    );

    // Make the backend request
    await axios.post(
      `${BACKEND_URL}/api/blogs/${blogId}/like`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.log("Error toggling like:", error);
  }
};


  const isBlogLikedByUser = (blog) => {
    if (!profile) return false;
    return blog.likes?.includes(profile._id);
  };

  const switchRole = async () => {
  try {
    const confirm = window.confirm(
      "Are you sure you want to switch your role?"
    );
    if (!confirm) return;

    const { data } = await axios.patch(
      `${BACKEND_URL}/api/users/switch-role`,
      {},
      { withCredentials: true }
    );

    setProfile((prev) => ({
      ...prev,
      role: data.role,
    }));

    toast.success(`Role switched to ${data.role}`);
  } catch (error) {
    console.error("Error switching role:", error);
    toast.error("Failed to switch role");
  }
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
        switchRole,
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
