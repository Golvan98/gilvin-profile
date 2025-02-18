import classes from './MainPage.module.css';
import SecondSection from './SecondSection.jsx';
import ThirdSection from './ThirdSection.jsx';
import Footer from './Footer.jsx';

function MainPage() {
  return (


    <main className="fixed inset-0 overflow-y-auto snap-y snap-mandatory bg-deepPurple ">
     
      <header className="text-3xl font-bold flex justify-between p-3 border-b  border-b-neonPink">
      <h1 className="text-lightCyan items-center flex-1 justify-start text-center">Gilvin🧑‍💻</h1>


        <h1 className="text-lightCyan flex justify-between items-center w-1/4 justify-center">myHeadSpace ☰</h1>
      </header>
     
      <section id="section1" className="h-screen flex-wrap items-center justify-center bg-deepPurple text-white">
        <div id="section1FirstPartBlankSpace" className="text-4xl text-lightCyan h-1/5"> 
        </div>
        

        <article id="section1Container" className={`${classes.bigScreenSection1Container} ${classes.smallScreenSection1Container}`} >
        
            <figure id="section1LeftSide" className={`${classes.section1LeftSideBig} ${classes.section1LeftSideSmall} `}>
              <div className="mt-4 w-full h-1/4">
              Here to help with everything Tech🤓
              </div>
              <div className="mt-4 w-full h-3/4"> Hello there, I am Gilvin Zalsos. I am a react developer fixated on delivering websites for anyone in need of my services. This website has everything
              you need to know (both personal and professional) about me. 
              </div>
            </figure>

            <figure id="section1RightSide" className={`${classes.section1RightSideBig} ${classes.section1RightSideSmall}`}>
              <div className="w-auto h-4/5 rounded-lg">
              <img src="https://i.imgur.com/OWZxfoV.jpeg" className="object-contain w-full h-full" alt="Example" />  
              </div> 
               {
               // <img src="https://i.imgur.com/OWZxfoV.jpeg" className="object-contain w-full h-full" alt="Example" /> 
               }  
            </figure>

        </article>

       
      </section>  {/* End of Section 1 */}

      <SecondSection/> 
       <ThirdSection/>
      {/*    <Footer/>*/}
      
   
      

    </main>
  );
}

export default MainPage;
