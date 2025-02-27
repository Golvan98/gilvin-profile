import { useState } from 'react';
import Hamburger from 'hamburger-react'


function HamburgerMenu (toggled, toggle)
{

    const [open, setOpen] = useState(false);
    return (
       <Hamburger> Hello ser</Hamburger>
    );
}

export default HamburgerMenu;