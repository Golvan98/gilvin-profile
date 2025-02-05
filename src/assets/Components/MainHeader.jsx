import classes from './MainHeader.module.css';

function MainHeader() {
  return (


    <div className="fixed inset-0 bg-deepPurple">
     
      <header className="text-3xl font-bold flex justify-between p-3 border-b  border-b-neonPink">
        <h1 className="text-lightCyan items-center w-1/4 justify-center ">Gilvin🧑‍💻</h1>
        <h1 className="text-lightCyan flex justify-between items-center w-1/4 justify-center">☰</h1>
      </header>

     
      {/* Full-Screen Section */}
      <div id="section1" className="h-screen flex-nowrap items-center justify-center bg-deepPurple text-white">
        <div id="section1FirstPartBlankSpace" className="text-4xl text-lightCyan h-1/5">
        </div>

        <div className="text-4xl text-lightCyan h-4/5 w-full flex items-center justify-center">
            <div className="w-1/2 h-full flex-nowrap">

              <div className="mt-4 text-7xl w-full h-1/4"> I'm here to help </div>

              <div className="mt-4 text-2xl w-full h-3/4"> Hello there, I am Gilvin Zalsos. I am a react developer fixated on delivering websites for anyone in need of my services. This website has everything
              you need to know (both personal and professional) about me. 
              </div>

              </div>
              <div className="w-1/2 h-1/2 flex items-center justify-center">
                <img src="https://i.imgur.com/OWZxfoV.jpeg" className="object-contain w-full h-full" alt="Example" />
              </div>

                    
            

        </div>

      
       
      </div>

    </div>
  );
}

export default MainHeader;
