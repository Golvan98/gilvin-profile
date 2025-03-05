
import classes from './Footer.module.css';


function Footer()
{
   
    return (
        <footer id="footer" className={`min-h-[150px] flex items-center justify-between text-center mt-12  ${classes.smallScreenText} text-center  border-t border-gray-700`}>
            

           
            <div className="w-1/3 h-full flex flex-col mt-12">
                <p className="mt-2 h-1/4"> About</p>

                <p className="h-3/4 w-full text-center"> Hello, my name is Gilvin Zalsos and I currently am an entry-level React Developer, I have different projects under my belt.
                Feel free to contact me in whatever medium you see fit </p>
            </div>

            <div className={`w-1/3 h-full flex flex-col mt-12 ${classes.smallScreenText} `}>
                    <p className="mt-2 h-1/4"> Links</p> 
                    <a href="https://www.linkedin.com/in/gilvin-zalsos-213692141/" target="blank"> <p className="text-blue-500"> Linkedin</p> </a>
                    <a href="https://www.upwork.com/freelancers/~01ad5af5c1458d0a34" target="blank">   <p className="text-blue-500"> Upwork</p> </a>
                    <a href="https://github.com/Golvan98" target="blank">     <p className="text-blue-500"> Github</p></a>                           
            </div>

            <div className={`w-1/3 h-full flex flex-col ${classes.smallScreenText} mt-12 `}>
                <p className="mt-2 h-1/4"> Contact</p>

                <p className=""> gilvinsz@gmail.com</p>
                <p className=""> Iligan City, Philippines</p>
                <p className=""> 09947270319</p>
                
            </div>

            
            
        </footer>
    );

}








export default Footer;