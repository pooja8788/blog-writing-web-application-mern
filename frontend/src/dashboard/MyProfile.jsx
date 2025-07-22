// import { useEffect } from "react";
// import { useAuth } from "../context/AuthProvider";

// function MyProfile() {
//   const { profile } = useAuth();

// const avatar = profile?.user?.avatar?.url?.replace("http://", "https://") ||
//                "https://cdn-icons-png.flaticon.com/512/149/149071.png";

//   useEffect(() => {
//   console.log("Profile Data:", profile);
//   console.log("Image URL:", profile?.user?.avatar?.url);
// }, [profile]);


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        
//         {/* Cover Image */}
//         <img
//           src={avatar}
//           alt="Cover"
//           className="w-full h-48 object-cover rounded-t-lg"
//         />

//         {/* Circular Avatar */}
//         <div className="relative w-24 h-24 mx-auto -mt-12">
//           <img
//             src={avatar}
//             alt="Profile"
//             className="w-24 h-24 rounded-full border-4 border-white object-cover"
//           />
//         </div>

//         {/* User Info */}
//         <div className="mt-4 text-center">
//           <h2 className="text-xl font-bold text-gray-800">
//             {profile?.user?.name || "No Name"}
//           </h2>
//           <p className="text-gray-600 mt-1">{profile?.user?.email}</p>
//           <p className="text-gray-600">{profile?.user?.phone}</p>
//           <p className="text-gray-600 font-medium">{profile?.user?.role}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MyProfile;


import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

function MyProfile() {
  const { profile } = useAuth();

  const avatar =
    profile?.avatar?.url?.replace("http://", "https://") ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  useEffect(() => {
    console.log("Profile Data:", profile);
    console.log("Image URL:", profile?.avatar?.url);
  }, [profile]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        {/* Cover Image */}
        <img
          src={avatar}
          alt="Cover"
          className="w-full h-48 object-cover rounded-t-lg"
        />

        {/* Circular Avatar */}
        <div className="relative w-24 h-24 mx-auto -mt-12">
          <img
            src={avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
        </div>

        {/* User Info */}
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold text-gray-800">
            {profile?.name || "No Name"}
          </h2>
          <p className="text-gray-600 mt-1">{profile?.email}</p>
          <p className="text-gray-600">{profile?.phone}</p>
          <p className="text-gray-600 font-medium">{profile?.role}</p>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;