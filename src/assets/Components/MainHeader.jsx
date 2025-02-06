import classes from './MainHeader.module.css';

function MainHeader() {
  return (


    <main className="fixed inset-0 overflow-y-auto snap-y snap-mandatory bg-deepPurple">
     
      <header className="text-3xl font-bold flex justify-between p-3 border-b  border-b-neonPink">
        <h1 className="text-lightCyan items-center w-1/4 justify-center ">Gilvin🧑‍💻</h1>
        <h1 className="text-lightCyan flex justify-between items-center w-1/4 justify-center">myHeadSpace ☰</h1>
      </header>

     
      {/* Full-Screen Section */}
      <section id="section1" className="h-screen flex-nowrap items-center justify-center bg-deepPurple text-white">
        <div id="section1FirstPartBlankSpace" className="text-4xl text-lightCyan h-1/5"> 
        </div>
        

        <article id="section1Container" className="text-4xl text-lightCyan h-4/5 w-full flex items-center justify-center">

            <figure id="section1LeftSide" className="w-1/2 h-full flex-nowrap">
              <div className="mt-4 text-7xl w-full h-1/4"> 
              Here to help with everything Tech🤓
              </div>
              <div className="mt-4 text-2xl w-full h-3/4"> Hello there, I am Gilvin Zalsos. I am a react developer fixated on delivering websites for anyone in need of my services. This website has everything
              you need to know (both personal and professional) about me. 
              </div>
            </figure>

            <figure id="section1RightSide" className="w-2/3 h-full flex items-start justify-center rounded-l ">
              <div className="w-auto bg-red-300 h-3/5 rounded-lg">
              <img src="https://i.imgur.com/OWZxfoV.jpeg" className="object-contain w-full h-full" alt="Example" />  
              </div> 
               {
               // <img src="https://i.imgur.com/OWZxfoV.jpeg" className="object-contain w-full h-full" alt="Example" /> 
               }  
            </figure>

        </article>

       
      </section>  {/* End of Section 1 */}

              {/* start of section  2 */}
      <section2 id="section2" className="h-screen w-full flex items-center justify-center bg-deepPurple text-white">
          <article class=" w-4/5 bg-red-300 h-full"> 
          
              <figure id="blankFigure" className="w-full h-1/5 bg-deepPurple flex">
              </figure>

              <figure className="w-full h-2/5 bg-deepPurple flex-nowrap">
                <div className="w-full h-1/5 text-4xl flex items-center justify-center">What We Do Echoes in Eternity</div>
                <div className="w-full h-1/5 text-2xl flex items-center justify-center">
                <p className="w-1/2 ">Therefore what we post online echoes throughout the information super highway. Let us build something worth preserving</p>
                </div>
              </figure>

              <figure className="w-full h-2/5 bg-deepPurple">
               <div className="w-full h-1/5 flex items-center justify-center text-4xl"> I Revel In </div>
               <div className="mt-4 w-full h-2/5  flex items-center justify-center text-4xl space-x-4">

                <p className="w-1/6 h-full flex items-center justify-center">
                <img src="https://i.imgur.com/QM2COh0.png" className="object-contain w-full h-full" alt="Example" /> 
                 </p>

                <p className="w-1/6 h-full flex items-center justify-center"> 
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1969px-Laravel.svg.png" className="object-contain w-full h-full" alt="Example" /> 
                </p>

                <p className="w-1/6 h-full flex items-center justify-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn2dYJRX3tJNkUVf4CwDaM3EWHVf7ihd8VVw&s" className="object-contain w-full h-full" alt="Example" /> 
                 </p>
               
               </div>
              </figure>
        
          </article>

      </section2>

    </main>
  );
}

export default MainHeader;
