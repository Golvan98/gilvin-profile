import classes from  './ThirdSection.module.css';


function ThirdSection ()
{

    return (
        <section id="section1" className="min-h-screen w-auto text-white flex-nowrap items-start space-y-16">
           <figure className=" w-full text-4xl">
                Projects Showcase
           </figure>

           <figure className="h-96  w-full text-2xl ">

                <div className="h-1/3 border-t border-white"> <p className='mt-4'>Needs Assessment Survey </p></div>
                
                <div id="projectPicture" className={`${classes.smallScreenText} flex items-center justify-center`}> 

                   <div className="w-100 mx-4 ">  
                    <img src ="https://i.imgur.com/3pUhHUo.png"  className=" w-full object-contain"/> 
                    </div>


                   <article className="w-full h-full flex-nowrap justify-start"> 
                    <div className="w-full h-auto"> 
                        The Needs Assessment Survey was my college project aimed at automating school counselors' long-standing mental health assessments. I used PHP   , & a live MySQL database to collect student inputs and visualize demographic insights through pie charts and graphs  
                    </div>
                    <div className="w-full h-auto mt-8 flex justify-center items-center text-sm ">  
                        <a href="https://github.com/Golvan98/NAS" target="_blank"> <p className={` ${classes.smallScreenText} bg-white text-black p-1 rounded-sm`}>view code here </p> </a>
                    </div>

                   </article>
                   
                </div>
           </figure>

           <figure id="figure2" className="h-96  w-full text-2xl ">

                <div className="h-1/3 mt-64 border-t border-white">  <p className='mt-4'>To Do List </p></div>
                 
                <div id="projectPicture" className={`${classes.smallScreenText} flex items-center justify-center`}> 

                   <div className="w-100 mx-4">  
                    <img src ="https://i.imgur.com/jB4P6bY.png"  className=" w-full object-contain"/> 
                    </div>


                   <article className="w-full h-full flex-nowrap justify-start"> 
                    <div className="w-full h-auto"> 
                    This project features a membership system where only the project owner can edit or delete the project name, while co-members can add and edit tasks. 
                    The website encompasses all CRUD functionalities, demonstrating the ability to manage and implement complex features effectively.
                    Laravel and Vue.js were used for the project's reactive elements and front-end capabilities. Docker Desktop was utilized for containerization, and MySQL serves as the project's database.
                    </div>
                    <div className="w-full h-auto mt-8 flex justify-center items-center text-sm ">  
                        <a href="https://github.com/Golvan98/gilvin-todo-app" target="_blank"> <p className={` ${classes.smallScreenText} bg-white text-black p-1 rounded-sm`}>view code here </p> </a>
                    </div>

                   </article>
                   
                </div>
           </figure>

           


        </section>
    );
}

export default ThirdSection;