import { FaGithub } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="border bg-gray-900 text-gray-300 py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-4">
          <div className="text-center md:text-start">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Swar<span className="text-blue-500 font-bold">Lekhan</span>
            </h2>
            <p className="text-sm text-gray-400">
              Empowering developers with technology and knowledge. Stay updated
              with the latest blogs, trends, and tools.
            </p>
          </div>

          {/* Company */}
          <div className="text-center md:text-start">
            <h2 className="text-lg font-semibold text-white mb-4">Company</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="bg-gray-900 container mx-auto border-t border-gray-700 pt-6 px-4 text-sm flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-semibold hidden md:flex text-white">
          Cilli<span className="text-blue-500 font-bold">Blog</span>
        </div>
        <div className="text-gray-400 text-sm hidden md:flex">
          <p>&copy; 2025 SwarLekhan. All rights reserved</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="#" className="hover:text-white">
            <FaGithub className="h-6" />
          </a>
          <a href="#" className="hover:text-white">
            <BsYoutube className="h-6" />
          </a>
          <a href="#" className="hover:text-white">
            <FaLinkedin className="h-6" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
