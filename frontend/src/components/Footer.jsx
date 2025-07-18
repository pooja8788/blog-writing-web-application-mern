import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-white mb-4">
            Swar<span className="text-blue-500">Lekhan</span>
          </h1>
          <p className="text-sm">
            Empowering developers with technology and knowledge. Stay updated
            with the latest blogs, trends, and tools.
          </p>
        </div>

        {/* Company */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-white mb-3">Company</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 px-4 text-sm flex flex-col md:flex-row items-center justify-between container mx-auto">
        <p className="text-gray-400 text-center md:text-left">
          © 2025 SwarLekhan. All rights reserved.
        </p>
        <div className="flex space-x-5 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition">
            <FaGithub size={20} />
          </a>
          <a href="#" className="hover:text-white transition">
            <BsYoutube size={20} />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
