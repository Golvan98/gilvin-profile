

function Footer()
{
   
    return (
        <footer className="h-44 w-full flex items-center justify-between">

            <article id="footerFirstSection" className="w-3/5 h-full text-electricYellow">
               <div id="aboutLabel" className="h-1/3 w-full flex items-center justify-center"> About</div>
               <div id="aboutContent" className="h-1/3 w-full flex items-center justify-center text-lg"> Hello, my name is Gilvin Zalsos and I currently am an entry-level React Developer, I have different projects under my belt.
                Feel free to contact me in whatever medium you see fit
                </div>
            </article>

            <article id="footer2ndSection" className="w-1/5 bg-gray-300 h-full"> aye
            </article>

            <article id="footerThirdSection"  className="w-1/5 bg-red-300 h-full"> 
            ae 
            </article>
        </footer>
    );

}








export default Footer;