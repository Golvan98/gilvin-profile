import classes from './BlankPage.module.css'
import HamburgerMenu from './HamburgerMenu';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';


function BlankPage(){
    return (
        <body className={`bg-deepPurple w-full min-h-[100vh] flex flex-col ${classes.myHeadSpaceSetting}` }>
      
      <Header/>


        <main className="flex w-full min-h-[100vh] items-center justify-center">
            <article className='w-4/5 h-4/5 mx-auto flex items-center justify-center bg-[#0F3460] rounded-lg'>
                <aside id="Categories" className={`h-full w-1/5 h-full flex items-center justify-start overflow-y-auto bg-[#2E2E3A] flex-col `}>

                  <div className={`mt-10 mb-2 font-bold  ${classes.secondTaskBox}`}> <p className="text-lightCyan">Categories </p></div>
                  
                  <section id="categoryContainer" className={`h-full w-full flex-col items-center bg-[#2E2E3A] justify-center`}> 

                    <div className='p-1 text-center bg-[#2E2E3A] w-full flex items-center justify-center space-y-4'> 
                      <p className='p-1.5 w-2/3 bg-[#fdb0e8] h-full rounded-sm'> Personal Projects</p>
                    </div>

                    <div className='p-1 text-center bg-[#2E2E3A] w-full flex items-center justify-center'> 
                      <p className='p-1.5 w-2/3 bg-[#fdb0e8] h-full rounded-sm'> Work Reminders</p>
                    </div>

                    <div className='p-1 text-center bg-[#2E2E3A] w-full flex items-center justify-center'> 
                      <p className='p-1.5 w-2/3 bg-[#fdb0e8] h-full rounded-sm'> Gaming Stuff</p>
                    </div>

                    <div className='p-1 text-center bg-[#2E2E3A] w-full flex items-center justify-center'> 
                      <p className='p-1.5 w-2/3 bg-[#fdb0e8] h-full rounded-sm'> Others</p>
                    </div>


                  </section>

                </aside>

                <aside id="nav2" className="h-full w-2/5 border border-white flex items-center justify-center">
                  <div className="w-4/5 bg-red-300 rounded-sm h-5/6 flex-wrap justify-between bg-teal-300 flex items-start justify-center overflow-y-auto ">

                    <p className={`my-2 bg-red-300 w-2/5 h-10 mx-auto rounded-md flex items-center justify-center break-all px-2 text-center ${classes.secondTaskBox}`}> lores epsm</p>
                    <p className={`my-2 bg-red-300 w-2/5 h-10 mx-auto rounded-md flex items-center justify-center break-all px-2 text-center ${classes.secondTaskBox}`}>dolores de maximum opus </p>
                    <p className={`my-2 bg-red-300 w-2/5 h-10 mx-auto rounded-md flex items-center justify-center break-all px-2 text-center ${classes.secondTaskBox}`}>at non este </p>
                    <p className={`my-2 bg-red-300 w-2/5 h-10 mx-auto rounded-md flex items-center justify-center break-all px-2 text-center ${classes.secondTaskBox}`}>at non este </p>

                  </div>
                </aside>

               

               

                <aside id="nav3" className="h-full w-2/5 ">

                </aside>

         
            </article>
        </main>










        <Footer/>
        </body>

       
    );
}

export default BlankPage;

 
   

  