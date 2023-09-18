import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    // Dispatch the logout action to clear the user authentication data
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-10 shadow-md bg-blue-700">
      <div className="p-3 w-full m-0 md:m-auto md:w-4/5 flex justify-between items-center">
        <div className="nav-items">
          <ul className="fixed bottom-0 flex p-2 justify-around bg-blue-700 left-0 w-full md:flex md:justify-between md:gap-5 md:text-xl md:static md:w-auto">
            {!user ? (
              <>
                <li className="px-3 py-2">
                  <Link to="/login" className="text-white hover:text-red-500">
                    Login
                  </Link>
                </li>
                <li className="px-3 py-2">
                  <Link
                    to="/register"
                    className="text-white hover:text-red-500"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="px-3 py-2">
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-red-500"
                  >
                    Logout
                    </button>
                    
                </li>
                <li className="px-3 py-2 text-lg bg-red-600 rounded-full">
                  Welcome to {user}
              
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
