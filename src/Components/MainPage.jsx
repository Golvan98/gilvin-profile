import classes from './MainPage.module.css';
import SecondSection from './SecondSection.jsx';
import ThirdSection from './ThirdSection.jsx';
import Footer from './Footer.jsx';
import FourthSection from './FourthSection.jsx'
import { useState, useEffect } from 'react';
import Header from './Header.jsx';
import HamburgerMenu from './HamburgerMenu.jsx';
import { useRef } from 'react';
import LoginModal from '../Components/Modals/LoginModal.jsx'
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";


function MainPage() { 
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is logged in:", user);
      setCurrentUser(user); // or set isLoggedIn(true)
    
    } else {
      console.log("No user is logged in");
      setCurrentUser(null); // or set isLoggedIn(false)
    }
  });

  return () => unsubscribe();
}, []);





  /*const handleSubmit = async () => {
    await addDoc(collection(db, 'messages'), {
      name: 'Gilvin',
      email: 'gilvin@example.com',
      message: 'Hello there!',
      timestamp: new Date()
    });
  }; */

  return (
   
   

    <body  className="bg-deepPurple w-full min-h-[100vh] flex flex-col">
      
      <Header toggleOpenLoginModal={openLoginModal}/>

      {showLoginModal && <LoginModal onClose={closeLoginModal} />}


    <main className="bg-deepPurple text-white min-h-[90vh] flex overflow-auto flex-col ">
        
      
      <article className="min-h-[90vh] flex justify-between text-xs md:text-2xl">

        <aside className="flex flex-col justify justify-start w-1/2 items-center gap-12">

          <div  id="shit" className="h-1/3 flex items-center justify-center text-black "> 
          
            
          
         
      
          </div>

          <div className="h-auto flex items-center justify-center "> 
          <p className="mx-2 text-center"> Hello there, I am Gilvin Zalsos. I am a react developer fixated on delivering websites for anyone in need of my services. This website has everything
          you need to know (both personal and professional) about me.  </p>
          </div>


        </aside>


        <aside className="w-1/2 h-full flex items-center justify-center ">
        <div className="w-auto h-1/2 rounded-lg flex items-center justify-center bg-red-300">
              <img src="https://i.imgur.com/OWZxfoV.jpeg" className="object-contain w-full h-full" alt="Example" />  
              </div> 
        </aside>

        
      </article>


         <SecondSection/> 
        <ThirdSection/>
       
         <Footer/> 
        
    
        

      </main>
    </body>
    
  );
}

export default MainPage;
