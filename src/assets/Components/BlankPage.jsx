import classes from './BlankPage.module.css'
import HamburgerMenu from './HamburgerMenu';
import Footer from './Footer';
import { Link } from 'react-router-dom';



function BlankPage(){
    return (
        <body  className="bg-deepPurple w-full min-h-[100vh] flex flex-col">
      
        <header  className="flex justify-between items-center bg-deepPurple min-h-[10vh] md:text-3xl border-b border-neonPink">
             <Link to="/"><h1 className=" ml-16 text-lightCyan ">Gilvin🧑‍💻</h1></Link>


          <h1 className="text-lightCyan mx-auto mr-16 text-xs"><HamburgerMenu  /></h1>
          
        </header>

        <main className="flex w-full min-h-[100vh] items-center justify-center">
            <article className='w-4/5 h-4/5 mx-auto flex items-center justify-center border border-white'>
                <aside id="Categories" className="h-full w-1/5 h-full flex-col overflow-y-auto">

                    <div id="emptySpaceForCategories" className='w-full h-2/6'> </div>

                    

                    <div className='w-full h-1/6 text-center text-lightCyan flex items-end justify-center pb-2'>     
                        <p> Categories </p>
                    </div>

                    <div id="categoryHeader" className='w-full h-3/6 text-center text-white flex flex-col '> 

                        <p className="py-1  w-full text-center flex items-center justify-center "> 
                            <p className='w-1/2 py-0.5 rounded-md flex items-center justify-center bg-[#fdb0e8]'>Category </p>
                        </p>

                        <p className="py-1  w-full text-center flex items-center justify-center "> 
                            <p className='w-1/2 py-0.5 rounded-md flex items-center justify-center bg-[#fdb0e8]'>Category </p>
                        </p>

                        <p className="py-1  w-full text-center flex items-center justify-center "> 
                            <p className='w-1/2 py-0.5 rounded-md flex items-center justify-center bg-[#fdb0e8]'>Category </p>
                        </p>

                        <p className="py-1  w-full text-center flex items-center justify-center "> 
                            <p className='w-1/2 py-0.5 rounded-md flex items-center justify-center bg-[#fdb0e8]'>Category </p>
                        </p>

                        <p className="py-1  w-full text-center flex items-center justify-center "> 
                            <p className='w-1/2 py-0.5 rounded-md flex items-center justify-center bg-[#fdb0e8]'>Category </p>
                        </p>

                        <p className="py-1  w-full text-center flex items-center justify-center "> 
                            <p className='w-1/2 py-0.5 rounded-md flex items-center justify-center bg-[#fdb0e8]'>Category </p>
                        </p>

                        <p className="py-1  w-full text-center flex items-center justify-center "> 
                            <p className='w-1/2 py-0.5 rounded-md flex items-center justify-center bg-[#fdb0e8]'>Category </p>
                        </p>

                        <p className="py-1  w-full text-center flex items-center justify-center "> 
                            <p className='w-1/2 py-0.5 rounded-md flex items-center justify-center bg-[#fdb0e8]'>Category </p>
                        </p>

                        

                        
                        
                    </div>

                </aside>

                <aside id="nav2" className="h-full w-2/5 border border-white">

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

 
   

  