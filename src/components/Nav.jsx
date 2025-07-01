import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

function Nav() {
  const { user, handleLogOut } = useAuth();
  const [toggle, setToggle] = useState(false);
  const [activeButton, setActiveButton] = useState("/");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const publicRoutes = [{ title: "Home", link: "/" }];
  const privateRoutes = [
    { title: "Events", link: "/events" },
    { title: "Add Event", link: "/add-event" },
    { title: "My Event", link: "/my-event" },
  ];

  return (
    <nav className="py-4 px-6 bg-gray-800 text-white">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center text-2xl font-bold text-yellow-400">
          <span className="text-3xl">🏡</span>
          <Link to={`/`}>
            {" "}
            <span className="text-3xl font-lobster ml-2">Eventra</span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6">
            {publicRoutes.map((item, index) => (
              <NavLink
                to={item.link}
                key={index}
                className={({ isActive }) =>
                  `py-2 px-4 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-yellow-600 text-white shadow-lg"
                      : "text-yellow-400 hover:bg-yellow-600 hover:text-white"
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}

            {user ? (
              <div className="relative flex items-center gap-4">
                {/* User Dropdown */}
                <div
                  className="relative cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    referrerPolicy="no-referrer"
                    src={user?.photoURL}
                    alt="User Profile"
                    className="h-10 w-10 rounded-full hover:border-2 hover:border-yellow-200"
                  />
                  {dropdownOpen && (
                    <ul className="absolute top-12 right-0 bg-gray-800 text-yellow-200 shadow-lg py-2 px-3 w-44 rounded-lg z-10">
                      <li className="block py-2 px-3 hover:bg-gray-700 rounded">
                        {user?.displayName}
                      </li>
                      <li className="block py-2 px-3 hover:bg-gray-700 rounded">
                        <button
                          onClick={handleLogOut}
                          className="py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
                        >
                          Log Out
                        </button>
                      </li>
                    </ul>
                  )}
                  <FaCaretDown className="absolute right-3 -bottom-1 text-yellow-400" />
                </div>

                {privateRoutes.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.link}
                    className="block py-2 px-3 hover:bg-gray-700 rounded"
                    onClick={() => setActiveButton(item.link)}
                  >
                    {item.title}
                  </NavLink>
                ))}
              </div>
            ) : (
              <NavLink
                to="/login"
                className={`py-2 px-4 rounded-full transition-all duration-300 ${
                  activeButton === "/login"
                    ? "bg-yellow-600 text-white shadow-lg"
                    : "text-yellow-400 hover:bg-yellow-600 hover:text-white"
                }`}
                onClick={() => setActiveButton("/login")}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-2xl text-yellow-400"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            className="fixed top-0 left-0 h-full w-4/5 bg-gray-900 text-white z-50 shadow-lg"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
          >
            <div className="p-6 flex flex-col gap-4">
              {publicRoutes.map((item, index) => (
                <NavLink
                  to={item.link}
                  key={index}
                  className={({ isActive }) =>
                    `py-2 px-4 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-yellow-600 text-white shadow-lg"
                        : "text-yellow-400 hover:bg-yellow-600 hover:text-white"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              ))}

              {user ? (
                <>
                  {privateRoutes.map((item, index) => (
                    <NavLink
                      to={item.link}
                      key={index}
                      className={`block py-2 px-4 rounded-full transition-all duration-300 ${
                        activeButton === item.link
                          ? "bg-yellow-600 text-white shadow-lg"
                          : "text-yellow-400 hover:bg-yellow-600 hover:text-white"
                      }`}
                    >
                      {item.title}
                    </NavLink>
                  ))}
                  <button
                    onClick={handleLogOut}
                    className="py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className={`block py-2 px-4 rounded-full transition-all duration-300 ${
                    activeButton === "/login"
                      ? "bg-yellow-600 text-white shadow-lg"
                      : "hover:bg-yellow-600 hover:text-white"
                  }`}
                  onClick={() => {
                    setActiveButton("/login");
                    setToggle(false);
                  }}
                >
                  Login
                </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Nav;
