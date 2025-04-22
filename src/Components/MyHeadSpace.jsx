import classes from './MyHeadSpace.module.css'
import HamburgerMenu from './HamburgerMenu.jsx';
import Footer from './Footer.jsx';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import React, { useState, useEffect, useRef } from 'react';
import { firestore } from "../firebase.js"
import { addDoc,collection, } from "@firebase/firestore"
import Modal from './Modal.jsx';

function BlankPage(){


  const messageRef = useRef();
  const ref = collection(firestore , "messages");

    const handleSave = async (e) => {
      e.preventDefault();
      console.log(messageRef.current.value);

      let data  = {
        message: messageRef.current.value,
      };
      
      try {
        await addDoc (ref, data);
      } catch (e) {
        console.log(e);
      }
      }


  const renderTasks = (taskList) => {
    return taskList.map(task => (
      <button
        onClick={() => handleTaskClick(task)}
        key={task.id}
        className={`my-2 bg-white w-2/5 h-10 mx-auto rounded-md flex items-center justify-center break-all px-2 text-center ${classes.secondTaskBox}`}
      >
        {task.title}
      </button>
    ));
  };

  const tasks = [
    {
      id: 1,
      title: "lores epsm",
      description: "This is a sample task about Roman things.",
      image: "https://images.pexels.com/photos/3299/postit-scrabble-to-do.jpg?auto=compress&cs=tinysrgb&w=600",
      category: "personal"
    },
    {
      id: 2,
      title: "dolores de maximum opus",
      description: "The max power of the opus dei is within.",
      image: "https://images.pexels.com/photos/414519/pexels-photo-414519.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "work"
    },
    {
      id: 3,
      title: "at non este",
      description: "Lorem ipsum dolor sit amet.",
      image: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "gaming"
    },
    { id:4,
    title: "bisaya ko nga nasalaag",
    description: "imperialist manila huhuhuhu",
    image: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "others"
    },

    {
      id: 5,
      title: "lores epsm personal 2",
      description: "This is a sample task about Roman things.",
      image: "https://images.pexels.com/photos/3299/postit-scrabble-to-do.jpg?auto=compress&cs=tinysrgb&w=600",
      category: "personal"
    },
    {
      id: 6,
      title: "dolores de maximum opus work 2",
      description: "The max power of the opus dei is within.",
      image: "https://images.pexels.com/photos/414519/pexels-photo-414519.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "work"
    },
    {
      id: 7,
      title: "at non este gaming2",
      description: "Lorem ipsum dolor sit amet.",
      image: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "gaming"
    },
    { id:8,
    title: "bisaya ko nga nasalaag others 2",
    description: "imperialist manila huhuhuhu",
    image: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "others"
    },

    { id:9,
      title: "bisaya ko nga nasalaag others 3",
      description: "imperialist manila huhuhuhu",
      image: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "others"
      },

      { id:10,
        title: "bisaya ko nga nasalaag others 4",
        description: "imperialist manila huhuhuhu",
        image: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "others"
        },

    
  ];

    const personalTasks = tasks.filter(task => task.category==="personal");
    const workTasks = tasks.filter(task => task.category==="work");
    const gamingTasks = tasks.filter(task => task.category==="gaming");
    const otherTasks = tasks.filter(task => task.category==="others");

    

    const [clickedButton, setClickedButton] =useState("all");

    const [clickedTask, setClickedTask] = useState(null);

    const handleTaskClick = (taskId) => {
      setClickedTask(taskId);
    }

    const handleButtonClick = (buttonId) => {
      setClickedButton(buttonId);
    };

    const [showModal, setShowModal] = useState(false);

    const handleAddTaskClick = () => {
      setShowModal(true);  // Show modal when the button is clicked
    };
  
    const handleCloseModal = () => {
      setShowModal(false);  // Close modal when clicked outside or a close button
    };
    

    return (
        <body className={`bg-deepPurple w-full min-h-[100vh] flex flex-col ${classes.myHeadSpaceSetting}` }>
      
      <Header/>


        <main className="flex w-full min-h-[100vh] items-center justify-center">
            <article className='w-4/5 h-4/5 mx-auto flex items-center justify-center bg-inherit '>
                <aside id="Categories" className={`h-full w-1/5 h-full  items-center justify-start overflow-y-auto bg-[#3498DB]  flex flex-col  rounded-l-lg`}>
     
                  <div className={`mt-10 mb-2 font-bold  ${classes.secondTaskBox}`}> 
                    <p className="text-white text-md">Categories  {clickedButton && `- ${clickedButton}`} </p>
                  </div>
                  
                  <section id="categoryContainer" className={`h-full w-full flex-col items-center  justify-center`}> 

                    <div className='p-1 text-center bg-inherit  w-full flex items-center justify-center space-y-4'> 
                      <button onClick={ () =>handleButtonClick("all")} className='p-1.5 w-2/3 bg-white h-full hover:bg-gray-300 rounded-sm'> All </button>
                    </div>

                    <div className='p-1 text-center bg-inherit  w-full flex items-center justify-center space-y-4'> 
                      <button onClick={ () =>handleButtonClick("personal")} className='p-1.5 w-2/3 bg-white h-full hover:bg-gray-300 rounded-sm'> Personal Projects</button>
                    </div>

                    <div className='p-1 text-center bg-inherit  w-full flex items-center justify-center'> 
                      <button onClick={ () =>handleButtonClick("work")} className='p-1.5 w-2/3 bg-white hover:bg-gray-300  h-full rounded-sm'> Work Reminders</button>
                    </div>

                    <div className='p-1 text-center bg-inherit  w-full flex items-center justify-center'> 
                      <button onClick={ () =>handleButtonClick("gaming")}  className='p-1.5 w-2/3 bg-white hover:bg-gray-300  h-full rounded-sm'> Gaming Stuff</button>
                    </div>

                    <div className='p-1 text-center bg-inherit  w-full flex items-center justify-center'> 
                      <button onClick={ () =>handleButtonClick("others")} className='p-1.5 w-2/3 bg-white hover:bg-gray-300  h-full rounded-sm'> Others</button>
                    </div>


                  </section>

                </aside>

                <aside id="nav2" className="h-full w-2/5  flex flex-col items-center justify-center text-black bg-[#2980B9]">
                  <div id="addAndDeleteTaskSection" className="w-full flex items-center justify-end my-4"> 
                   
                    
                  <button className="mx-4 bg-white" onClick={handleAddTaskClick}> 
                + Add a Task
                 </button>
            

                  {/* Conditional rendering of Modal */}
                  {showModal && (
                    <Modal onClose={handleCloseModal}>
                      <p>Hello there! test modal here</p>
                      
                    </Modal>
                  )}


                     
                  </div>
                  <div className="w-4/5 rounded-sm h-5/6 flex-wrap justify-between flex items-start justify-center overflow-y-auto ">
                    
                  {clickedButton === "personal" && renderTasks(personalTasks)}
                  {clickedButton === "work" && renderTasks(workTasks)}
                  {clickedButton === "others" && renderTasks(otherTasks)}
                  {clickedButton === "gaming" && renderTasks(gamingTasks)}
                  {clickedButton === "all" && renderTasks(tasks)}


                   
                  </div>
                </aside>

                             
                <aside id="nav3" className="h-full w-2/5 flex flex-col bg-[#1F618D] rounded-r-lg">

                <article className="h-1/2 w-full">

                  <div className="w-full h-full flex items-center justify-center">  
                  {clickedTask ? (
                    <img src={clickedTask.image} className="object-contain h-4/5 w-5/6" alt={clickedTask.title} />
                    ) : 

                    ( <p className="text-white"> Select a task to view details </p>
                    )} 

                  </div>

                </article>

                <article id="thirdSectionofHeadSpace" className="h-1/2 w-full flex flex-col items-center text-white "> 
                  <div className="h-1/4 flex w-full items-center">
                  { clickedTask ? (

                    <>
                     <p className="justify-start mx-4"> {clickedTask.title} </p> 
                     </>
                    ) : (<p>No task selected</p>)}
                   </div>

                  <div className="h-3/4 w-full flex justify-start mt-2 items-start"> 
                  { clickedTask ? (
                    <>
                    <p className="mx-4"> {clickedTask.description}</p>
                    </>
                    ) : (<p> nada sir</p>)}
                    
                    <form onSubmit={handleSave}>
                      <label> Enter Message</label>
                      <input type="text" ref={messageRef}></input>
                      <button type="submit"> Save</button>
                    </form>
            
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

 
   

  