import classes from './MainPage.module.css';
import SecondSection from './SecondSection.jsx';
import ThirdSection from './ThirdSection.jsx';
import Footer from './Footer.jsx';

function MainPage() {
  return (

    <body className="bg-deepPurple w-full min-h-[100vh] ">
      
      <header className="text-3xl h-auto font-bold flex justify-between items-center border-b border-b-neonPink bg-deepPurple mx-16 min-h-[10vh]">
        <h1 className="text-lightCyan">Gilvin🧑‍💻</h1>
        <h1 className="text-lightCyan">myHeadSpace ☰</h1>
      </header>



      <main className="bg-deepPurple text-white min-h-[100vh] flex">
        
      
      <article className="min-h-[90vh] flex justify-between text-xs md:text-2xl">

        <aside className="flex flex-col justify justify-start w-1/2 items-center gap-12">

          <div className="h-1/3 flex items-center justify-center "> 
          <p className="text-xs md:text-3xl"> Here to help with everyTech🤓 </p>
          </div>

          <div className="h-auto flex items-center justify-center "> 
          <p className="mx-2"> Hello there, I am Gilvin Zalsos. I am a react developer fixated on delivering websites for anyone in need of my services. This website has everything
          you need to know (both personal and professional) about me.  </p>
          </div>


        </aside>


        <aside className="w-1/2 h-full flex items-center justify-center ">
        <div className="w-auto h-1/2 rounded-lg flex items-center justify-center bg-red-300">
              <img src="https://i.imgur.com/OWZxfoV.jpeg" className="object-contain w-full h-full" alt="Example" />  
              </div> 
        </aside>

        
      </article>

      

        
      



      

         {/*<SecondSection/> */}
         {/* <ThirdSection/> */}
        {/* <Footer/> */} 
        
    
        

      </main>
    </body>
  );
}

export default MainPage;
