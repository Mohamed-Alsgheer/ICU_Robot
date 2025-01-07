import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="container mx-auto px-4 relative">

        {/* Footer Content */}
        <div className="flex flex-col lg:flex-row gap-10 mb-8">
          {/* Footer Logo and Description */}
          <div className="lg:w-1/3">
            <a href="#" className="text-3xl font-bold mb-4 flex items-center">
              ICU Robot<span className="text-white">.</span>
            </a>
            <p className="mb-4 text-[#fffafba4]">
              Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada.
            </p>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          </div>

          {/* Footer Links */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">About us</a></li>
                <li><a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">Services</a></li>
                <li><a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">Blog</a></li>
                <li><a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">Contact us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">Support</a></li>
                <li><a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">Knowledge base</a></li>
                <li><a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">Live chat</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">Jobs</a></li>
                <li><a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">Our team</a></li>
                <li><a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">Leadership</a></li>
                <li><a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">Nordic Chair</a></li>
                <li><a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">Kruzo Aero</a></li>
                <li><a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">Ergonomic Chair</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-4 lg:mb-0">
              <p className="text-[#fffafba4]">
                &copy; 2024 All Rights Reserved. Distributed By ICU Robot
              </p>
            </div>
            <div className="text-center lg:text-right">
              <ul className="flex space-x-4">
                <li><a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">Terms & Conditions</a></li>
                <li><a href="#" className="text-[#fffafba4] hover:text-white transition duration-300">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
