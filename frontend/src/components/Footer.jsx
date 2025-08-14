// // import React from "react";
// import { FaGithub } from "react-icons/fa";
// import { BsYoutube } from "react-icons/bs";
// import { FaLinkedin } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <>
//       <footer className="border py-10">
//       </footer>
//       <div className=" container mx-auto  flex flex-col md:flex-row justify-between items-center">
//         <div className="text-xl font-semibold hidden md:flex">
//           Swar<span className="text-blue-500 font-bold">Lekhan</span>
//         </div>
//         <div className="text-gray-400 text-sm hidden md:flex">
//           <p>&copy; 2025 SwarLekhan. All rights reserved</p>
//         </div>
//         <div className="mt-4 md:mt-0 flex space-x-4">
//           <a href="#">
//             <FaGithub className="h-6" />
//           </a>
//           <a href="#">
//             <BsYoutube className="h-6" />
//           </a>

//           <a href="#">
//             <FaLinkedin className="h-6" />
//           </a>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Footer;



import { FaGithub } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-400 py-1">
        <div className="bg-gray-400 py-4">
        <div className="container mx-auto flex flex-col items-center space-y-4">
          <div className="text-xl font-semibold">
            Swar<span className="text-blue-500 font-bold">Lekhan</span>
          </div>
          <div className="text-gray-600 text-sm text-center">
            <p>&copy; 2025 SwarLekhan. All rights reserved</p>
          </div>
          <div className="flex space-x-4">
            <a href="#">
              <FaGithub className="h-6 hover:text-black-500" />
            </a>
            <a href="#">
              <BsYoutube className="h-6 hover:text-red-600" />
            </a>
            <a href="#">
              <FaLinkedin className="h-6 hover:text-blue-700" />
            </a>
          </div>
        </div>
      </div>
      </footer>

      
    </>
  );
};

export default Footer;
