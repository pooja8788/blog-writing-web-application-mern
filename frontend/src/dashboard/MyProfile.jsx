// // import React from "react";
// import { useAuth } from "../context/AuthProvider";

// function MyProfile() {
//   const { profile } = useAuth();
//   console.log(profile?.user);
//   return (
//     <div>
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full">
//           <div className="relative">
//             <img
//               src={profile?.user?.photo?.url || "/default-avatar.png"}
//               alt="avatar"
//               className="w-full h-48 object-cover"
//             />
//             <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
//               <img
//                 src={profile?.user?.photo?.url || "/default-avatar.png"}
//                 alt="avatar"
//                 className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700"
//               />
//             </div>
//           </div>
//           <div className="px-6 py-8 mt-2">
//             <h2 className="text-center text-2xl font-semibold text-gray-800">
//               {profile?.user?.name}
//             </h2>
//             <p className="text-center text-gray-600 mt-2">
//               {profile?.user?.email}
//             </p>
//             <p className="text-center text-gray-600 mt-2">
//               {profile?.user?.phone}
//             </p>
//             <p className="text-center text-gray-600 mt-2">
//               {profile?.user?.role}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MyProfile;



import { useAuth } from "../context/AuthProvider";

function MyProfile() {
  const { profile } = useAuth();
  const user = profile?.user;

  if (!user || user.role !== "admin") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center text-lg text-red-600 font-semibold">
          You are not authorized to view this page.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full">
          <div className="relative">
            <img
              src={user.photo?.url || "/default-banner.jpg"}
              alt="cover"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
              <img
                src={user.photo?.url || "/default-avatar.png"}
                alt="avatar"
                className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700 object-cover"
              />
            </div>
          </div>
          <div className="px-6 py-8 mt-2">
            <h2 className="text-center text-2xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-center text-gray-600 mt-2">{user.email}</p>
            <p className="text-center text-gray-600 mt-2">{user.phone}</p>
            <p className="text-center text-gray-600 mt-2 capitalize">
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
