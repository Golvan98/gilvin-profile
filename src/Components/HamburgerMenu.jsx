import { useState, useEffect } from 'react';
import Hamburger from 'hamburger-react'
import { Link } from 'react-router-dom';
import classes from './MainPage.module.css';
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function HamburgerMenu ({toggled, toggle, toggleOpenLoginModal })
{   const [currentUser, setCurrentUser] = useState(null);
    const [flashMessage, setFlashMessage] = useState("");
    const [showFlashMessage, setShowFlashMessage] = useState(false);
    const handleLogout = async () => {

      try {
        await signOut(auth);
        setFlashMessage("logged out successfully");
        setShowFlashMessage(true);
        setOpen(false);
        setTimeout ( () => {
          setShowFlashMessage(false);
        }, 1500);
        console.log("logged out successfully");
      } catch (error) {
        console.log("error logging out", error);
      }
    }

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        setCurrentUser(user); // or set isLoggedIn(true)
      } else {
        console.log("No user is logged in");
        setCurrentUser(null); // or set isLoggedIn(false)
      }
    });

  return () => unsubscribe();
}, []);

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          setOpen(false); // Close menu after clicking
        }
      };


    const [open, setOpen] = useState(false);
    return (
        <div id="home" className="relative flex items-center text-lg">
        {/* Hamburger Button */} <Link to={"/myHeadSpace"} className={`${classes.headerSetting}`}> myHeadSpace </Link>
        <Hamburger toggled={open} toggle={setOpen} size={18} />
  
        {/* Dropdown Menu */}
        {open && (
          <div className="absolute right-0 mt-64 w-24 bg-white border rounded-lg shadow-lg p-2 flex-nowrap">
            <ul className="">
              <li className={`p-2 hover:bg-gray-200 cursor-pointer  ${classes.burgerFont}`} onClick={() => scrollToSection("shit")}>Home</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={ () => scrollToSection("footer")}>About</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={ () => scrollToSection("footer")}>Contact</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => toggleOpenLoginModal()}>Login</li>
             { currentUser && <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>Logout</li>}
            </ul>
          </div>
        )}

       {showFlashMessage && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300">
            {flashMessage}
          </div>
        )}
      </div>
    );
}

export default HamburgerMenu;