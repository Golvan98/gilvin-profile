import classes from './Header.module.css';
import HamburgerMenu from './HamburgerMenu.jsx';


function Header () {

return (
<header className="flex justify-between items-center bg-deepPurple min-h-[10vh] border-b border-neonPink w-full mx-auto">
      <a href="/"><h1 className={`ml-16 ${classes.headerSetting}`}>Gilvin🧑‍💻</h1></a>
        
        <h1 className="text-lightCyan mx-auto mr-16 text-xs"><HamburgerMenu  /></h1>
        
</header>

)


}

export  default Header;