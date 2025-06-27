import classes from  './ThirdSection.module.css';
import { Link } from 'react-router-dom';


function ThirdSection ()
{

    return (
        <section id="section1" className="w-auto text-white flex flex-col ">
           

           <figure className="w-full text-2xl mt-12">
                {/* Section Title */}
                <div className="h-auto flex items-center justify-center">
                    <p className="text-center my-8 text-4xl">Projects Showcase</p>
                </div>

                {/* Project Section */}
                <aside id="projectSection" className="flex justify-center min-h-[400px]">
                    {/* Image Section */}
                    <article className="w-1/2 flex justify-center p-4">
                    <img 
                        src="https://i.imgur.com/cKJsfT8.png"  
                        className="w-full max-w-[768px] h-auto object-contain"
                        alt="Project Screenshot"
                    />
                    </article>

                    {/* Text Section */}
                    <article className="w-1/2 flex flex-col justify-center 0 text-center p-6">
                    <p className=" w-full py-2 text-xl font-bold max-[768px]:text-xs"> myHeadSpace  </p>

                    <p className="text-base leading-relaxed mt-4">
                    myHeadSpace is a personal productivity web app I built using React and Firebase. It lets me create, categorize, and manage projects and tasks in real time. I implemented full CRUD functionality, a responsive UI, and live updates through Firebase Firestore — giving recruiters a transparent view of my current development pipeline.
                    </p>

                    <p className="mt-2">
                    Test it out <Link to="/myHeadSpace" className="text-blue-500 underline hover:text-blue-700">here</Link>.
                    </p>


                    <p className={`w-full flex justify-center items-center mt-6 ${classes.smallScreenText}`}>
                        <a href="https://github.com/Golvan98/gilvin-profile" target="_blank" className="bg-white text-black p-2 rounded-md shadow-md hover:bg-gray-200 transition">
                        View Code Here
                        </a>
                    </p>
                    </article>
                </aside>
            </figure>

            <figure className="w-full text-2xl mt-12">
                {/* Section Title */}

                {/* Project Section */}
                <aside id="projectSection" className="flex justify-center min-h-[400px]">
                    {/* Image Section */}
                    <article className="w-1/2 flex justify-center p-4">
                    <img 
                        src="https://i.imgur.com/3pUhHUo.png"  
                        className="w-full max-w-[768px] h-auto object-contain"
                        alt="Project Screenshot"
                    />
                    </article>

                    {/* Text Section */}
                    <article className="w-1/2 flex flex-col justify-center 0 text-center p-6">
                    <p className=" w-full py-2 text-xl font-bold max-[768px]:text-xs"> Automated Needs Assessment Survey</p>

                    <p className={`w-full text-xl leading-relaxed mt-4 ${classes.smallScreenText}`}>
                        The Needs Assessment Survey was my college project aimed at automating school counselors' 
                        long-standing mental health assessments. I used PHP & a live MySQL database to collect 
                        student inputs and visualize demographic insights through pie charts and graphs.
                    </p>

                    <p className={`w-full flex justify-center items-center mt-6 ${classes.smallScreenText}`}>
                        <a href="https://github.com/Golvan98/NAS" target="_blank" className="bg-white text-black p-2 rounded-md shadow-md hover:bg-gray-200 transition">
                        View Code Here
                        </a>
                    </p>
                    </article>
                </aside>
            </figure>


           <figure className="w-full text-2xl mt-24">
                {/* Section Title */}
             

                {/* Project Section */}
                <aside id="projectSection" className="flex justify-center min-h-[400px]">
                    {/* Image Section */}
                    <article className="w-1/2 flex justify-center p-4">
                    <img 
                        src="https://i.imgur.com/jB4P6bY.png"  
                        className="w-full max-w-[768px] h-auto object-contain"
                        alt="Project Screenshot"
                    />
                    </article>

                    {/* Text Section */}
                    <article className="w-1/2 flex flex-col justify-center 0 text-center p-6">
                    <p className=" w-full py-2 text-xl font-bold max-[768px]:text-xs">To Do App</p>

                    <p className={`w-full text-xl leading-relaxed mt-4 ${classes.smallScreenText}`}>
                    This project features a membership system where only the project owner can edit or delete the project name, while co-members can add and edit tasks. 
                    The project encompasses all CRUD functionalities, demonstrating the ability to manage and implement complex features effectively.
                    Laravel and Vue.js were used for the project's reactive elements and front-end capabilities. Docker Desktop was utilized for containerization, and MySQL serves as the project's database.
                    </p>

                    <p className={`w-full flex justify-center items-center mt-6 ${classes.smallScreenText}`}>
                        <a href="https://github.com/Golvan98/NAS" target="_blank" className="bg-white text-black p-2 rounded-md shadow-md hover:bg-gray-200 transition">
                        View Code Here
                        </a>
                    </p>
                    </article>
                    
                </aside>
            </figure>


            <figure className="w-full text-2xl mt-24">
                {/* Section Title */}
             

                {/* Project Section */}
                <aside id="projectSection" className="flex justify-center min-h-[400px]">
                    {/* Image Section */}
                    <article className="w-1/2 flex justify-center p-4">
                    <img 
                        src="https://i.imgur.com/Q7ALxqR.png"  
                        className="w-full max-w-[768px] h-auto object-contain"
                        alt="Project Screenshot"
                    />
                    </article>

                    {/* Text Section */}
                    <article className="w-1/2 flex flex-col justify-center 0 text-center p-6">
                    <p className=" w-full py-2 text-xl font-bold max-[768px]:text-xs">Professionals Booking App</p>

                    <p className={`w-full text-xl leading-relaxed mt-4 ${classes.smallScreenText}`}>
                    This Professionals Booking App I created is a web-based platform designed to connect users with registered professionals across various industries. Built with Vue.js, Laravel, and MySQL, the application enables users to seamlessly browse, book, and schedule appointments with professionals for consultations. The system supports CRUD functionalities, allowing both users and professionals to manage their accounts, update profiles, and organize schedules efficiently.
                    This booking system ensures streamlined appointment management where users can search for professionals based on expertise, check availability, and request meetings. Professionals, in turn, can accept or decline bookings, maintaining control over their schedules.   </p>

                    <p className={`w-full flex justify-center items-center mt-6 ${classes.smallScreenText}`}>
                        <a href="https://github.com/Golvan98/gilvin-booking-app" target="_blank" className="bg-white text-black p-2 rounded-md shadow-md hover:bg-gray-200 transition">
                        View Code Here
                        </a>
                    </p>
                    </article>
                    
                </aside>
            </figure>
           

           


        </section>
    );
}

export default ThirdSection;