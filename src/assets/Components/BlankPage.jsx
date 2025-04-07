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
            <article className='w-4/5 h-4/5 mx-auto flex items-center justify-center bg-[#3498DB] rounded-lg'>
                <aside id="Categories" className={`h-full w-1/5 h-full  items-center justify-start overflow-y-auto bg-inherit  flex flex-col  rounded-lg`}>

                  <div className={`mt-10 mb-2 font-bold  ${classes.secondTaskBox}`}> 
                    <p className="text-white text-md">Categories </p>
                  </div>
                  
                  <section id="categoryContainer" className={`h-full w-full flex-col items-center  justify-center`}> 

                    <div className='p-1 text-center bg-inherit  w-full flex items-center justify-center space-y-4'> 
                      <p className='p-1.5 w-2/3 bg-white h-full hover:bg-gray-300 rounded-sm hover:cursor-pointer '> Personal Projects</p>
                    </div>

                    <div className='p-1 text-center bg-inherit  w-full flex items-center justify-center'> 
                      <p className='p-1.5 w-2/3 bg-white  h-full rounded-sm'> Work Reminders</p>
                    </div>

                    <div className='p-1 text-center bg-inherit  w-full flex items-center justify-center'> 
                      <p className='p-1.5 w-2/3 bg-white  h-full rounded-sm'> Gaming Stuff</p>
                    </div>

                    <div className='p-1 text-center bg-inherit  w-full flex items-center justify-center'> 
                      <p className='p-1.5 w-2/3 bg-white  h-full rounded-sm'> Others</p>
                    </div>


                  </section>

                </aside>

                <aside id="nav2" className="h-full w-2/5  flex items-center justify-center text-black bg-[#2980B9]">
                  <div className="w-4/5 rounded-sm h-5/6 flex-wrap justify-between flex items-start justify-center overflow-y-auto ">

                    <p className={`my-2 bg-white w-2/5 h-10 mx-auto rounded-md flex items-center justify-center break-all px-2 text-center ${classes.secondTaskBox}`}> lores epsm</p>
                    <p className={`my-2 bg-white w-2/5 h-10 mx-auto rounded-md flex items-center justify-center break-all px-2 text-center ${classes.secondTaskBox}`}>dolores de maximum opus </p>
                    <p className={`my-2 bg-white w-2/5 h-10 mx-auto rounded-md flex items-center justify-center break-all px-2 text-center ${classes.secondTaskBox}`}>at non este </p>
                    <p className={`my-2 bg-white w-2/5 h-10 mx-auto rounded-md flex items-center justify-center break-all px-2 text-center ${classes.secondTaskBox}`}>at non este </p>

                  </div>
                </aside>

               

               

                <aside id="nav3" className="h-full w-2/5 flex flex-col bg-[#1F618D]">

                <article className="h-1/2 w-full">

                  <div className="w-full h-full flex items-center justify-center">  
                    
                    <img src="https://images.pexels.com/photos/3299/postit-scrabble-to-do.jpg?auto=compress&cs=tinysrgb&w=600" className="object-contain h-4/5 w-5/6" alt="Example" />
                    
                  </div>

                </article>

                <article className="h-1/2 w-full flex flex-col items-center text-white "> 
                  <div className="h-1/4 flex w-full items-center">
                   <p  className='justify-start mx-4'> Task lores epsum dolores eptum in to lerandi</p>
                   </div>

                  <div className="h-3/4 w-full flex justify-start mt-2 items-start "> 
                      <p id="testpara" className='mx-2'> description of task lores epsum ectum akwitas pax romana markus orelyos sanctum nomini lapri el tu cori </p>
                  </div>
                </article>

                </aside>

         
            </article>
        </main>










        <Footer/>
        </body>

       
    );
}

export default BlankPage;

 
   

  