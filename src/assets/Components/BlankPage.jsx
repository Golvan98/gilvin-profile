import classes from './BlankPage.module.css'
import HamburgerMenu from './HamburgerMenu';
import Footer from './Footer';



function BlankPage(){
    return (
        <body  className="bg-deepPurple w-full min-h-[100vh] flex flex-col">
      
        <header  className="flex justify-between items-center bg-deepPurple min-h-[10vh] md:text-3xl border-b border-neonPink">
          <h1 className=" ml-16 text-lightCyan ">Gilvin🧑‍💻</h1>


          <h1 className="text-lightCyan mx-auto mr-16 text-xs"><HamburgerMenu  /></h1>
          
        </header>

        <main className="flex w-full min-h-[100vh] items-center justify-center">
            <article className='w-4/5 h-4/5 mx-auto flex items-center justify-center bg-gray-300'>
                <aside id="nav1" className="h-full min-w-[20vw] bg-red-300">

                </aside>

                <aside id="nav2" className="h-full min-w-[50vw] bg-red-500">

                </aside>

                <aside id="nav3" className="h-full min-w-[30vw] bg-red-700">

                </aside>

         
            </article>
        </main>










        <Footer/>
        </body>

       
    );
}

export default BlankPage;

 
   

  