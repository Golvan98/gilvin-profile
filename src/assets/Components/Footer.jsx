

function Footer()
{
   
    return (
        <footer className="min-h-screen flex items-center justify-between">

            <article id="footerFirstSection" className="w-2/5 h-full text-electricYellow flex flex-col items-start">
               <div id="aboutLabel" className="h-1/3 w-full flex items-center justify-center"> About</div>
               <div id="aboutContent" className="h-1/3 w-full flex items-center justify-center text-lg"> Hello, my name is Gilvin Zalsos and I currently am an entry-level React Developer, I have different projects under my belt.
                Feel free to contact me in whatever medium you see fit
                </div>
            </article>

            <article id="footer2ndSection" className="w-1/5 bg-gray-300 h- flex flex-col space-y-2"> Links
                <div className="mt-2">Link 1</div>
                <div>Link 2</div>
                <div>Link 3</div>
                <div>Link 4</div>
                <div>Link 5</div>
            </article>

            <article id="footerThirdSection"  className="w-1/5 bg-red-300 h-full flex flex-col space-y-2"> 
            Contacts
                <div className="mt-2">Contact 1</div>
                <div>Contact 2</div>
                <div>Contact 3</div>
                <div>Contact 4</div>
                <div>Contact 5</div>
            </article>
        </footer>
    );

}








export default Footer;