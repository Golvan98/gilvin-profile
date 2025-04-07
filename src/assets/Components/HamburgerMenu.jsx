import { useState } from 'react';
import Hamburger from 'hamburger-react'
import { Link } from 'react-router-dom';
import classes from './MainPage.module.css';

function HamburgerMenu (toggled, toggle)
{

  

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
          <div className="absolute right-0 mt-44 w-24 bg-white border rounded-lg shadow-lg p-2 flex-nowrap">
            <ul className="">
              <li className={`p-2 hover:bg-gray-200 cursor-pointer  ${classes.burgerFont}`} onClick={() => scrollToSection("shit")}>Home</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={ () => scrollToSection("footer")}>About</li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={ () => scrollToSection("footer")}>Contact</li>
            </ul>
          </div>
        )}
      </div>
    );
}

export default HamburgerMenu;