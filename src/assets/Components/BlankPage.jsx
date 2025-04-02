import classes from './BlankPage.module.css'
import HamburgerMenu from './HamburgerMenu';
import Footer from './Footer';
import { Link } from 'react-router-dom';



function BlankPage(){
    return (
        <body className="bg-deepPurple w-full min-h-[100vh] flex flex-col">
      
      <header className="flex justify-between items-center bg-deepPurple min-h-[10vh] md:text-3xl border-b border-neonPink w-full mx-auto">
        <Link to="/">
            <h1 className="text-3xl ml-16">Gilvin🧑‍💻</h1>
        </Link>

        <h2 className="text-lightCyan ml-auto mr-16 text-3xl">
            <HamburgerMenu />
        </h2>
      </header>


        <main className="flex w-full min-h-[100vh] items-center justify-center">
            <article className='w-4/5 h-4/5 mx-auto flex items-center justify-center bg-[#0F3460] rounded-lg'>
                <aside id="Categories" className="h-full w-1/5 h-full flex items-center justify-center overflow-y-auto ">

                    <section id="shadow" className="bg-[#2E2E3A] h-4/5 flex flex-col items-center mx-auto w-3/4 rounded-md shadow-lg p-4">

                      {/* Categories Header */}
                      <div className="w-full text-lightCyan flex items-end justify-start pb-2">
                        <p className="ml-4 text-lg font-bold uppercase  border-lightCyan pb-1">Categories</p>
                      </div>

                      {/* Category List */}
                      <div id="categoryHeader" className="w-full flex flex-col gap-2 bg-[#252530] p-3 rounded-md">
                        
                      <p className="truncate py-2 px-3 w-full rounded-md flex items-center justify-center bg-[#44475a] text-white font-medium">
                        Personal Projects 
                      </p>

                        <p className="py-2 px-3 w-auto rounded-md flex items-center justify-center bg-[#fdb0e8] hover:bg-opacity-80 cursor-pointer">
                          Work Reminders
                        </p>

                        <p className="py-2 px-3 w-auto rounded-md flex items-center justify-center bg-[#fdb0e8] hover:bg-opacity-80 cursor-pointer">
                          Gaming Stuff
                        </p>

                        <p className="py-2 px-3 w-auto rounded-md flex items-center justify-center bg-[#fdb0e8] hover:bg-opacity-80 cursor-pointer">
                          Others
                        </p>

                      </div>

                    </section>


                </aside>

                <aside id="nav2" className="h-full w-2/5 border border-white flex items-center justify-center">
                  <div className="w-4/5 bg-red-300 rounded-sm h-5/6 flex-wrap justify-between bg-teal-300 flex items-start justify-center overflow-y-auto ">

                    <p className='my-2 bg-red-300 w-2/5 h-40 mx-auto rounded-md flex items-center justify-center'> hehe</p>
                    <p className='my-2 bg-red-300 w-2/5 h-40 mx-auto rounded-md flex items-center justify-center'> hehe</p>
                    <p className='my-2 bg-red-300 w-2/5 h-40 mx-auto rounded-md flex items-center justify-center'> hehe</p>
                    <p className='my-2 bg-red-300 w-2/5 h-40 mx-auto rounded-md flex items-center justify-center'> hehe</p>
              
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

 
   

  