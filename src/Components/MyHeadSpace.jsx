import classes from './MyHeadSpace.module.css'
import HamburgerMenu from './HamburgerMenu.jsx';
import Footer from './Footer.jsx';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import React, { useState, useEffect, useRef } from 'react';
import { firestore } from "../firebase.js"
import { addDoc,collection, onSnapshot} from "@firebase/firestore"
import Modal from './Modal.jsx';
import tasks from '../assets/tasks'

function MyHeadSpace(){
  const [firebaseTasks, setFirebaseTasks] = useState([]);

  const titleRef = useRef();
  const taskNameRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const taskRef = collection(firestore, "tasks");
  const [errors, setErrors] = useState({});
  const [flashMessage, setFlashMessage] = useState("");
  const [showFlashMessage, setShowFlashMessage] = useState("false");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "tasks"), (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFirebaseTasks(tasksData);
    });
  
    return () => unsubscribe(); // Cleanup
  }, []);
  

  const handleTaskCreate  = async (createTask) => {
    createTask.preventDefault();
    console.log(taskNameRef.current.value);

    let formErrors = {};

    const taskValue = taskNameRef.current.value.trim();
    const descriptionValue = descriptionRef.current.value.trim();

    if (taskValue.length < 3) {
      formErrors.task = "Task name must be at least 3 characters long.";
    }
  
    if (descriptionValue.length < 10) {
      formErrors.description = "Description must be at least 10 characters.";
    }
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // stop submission
    }

  
  let taskData = {
    title: titleRef.current.value,
    task: taskNameRef.current.value,
    description: descriptionRef.current.value,
    image: "",
    category: categoryRef.current.value,
  };
  
    try {
    await addDoc (taskRef, taskData);
    setShowModal(false);
    setFlashMessage("Task successfully created");
    setShowFlashMessage(true);

    setTimeout( () => {
      setShowFlashMessage(false);
    } , 2000);

    } catch (createTask) {
      
    console.log(createTask);
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

    const personalTasks = firebaseTasks.filter(task => task.category === "personal");
    const workTasks = firebaseTasks.filter(task => task.category === "work");
    const gamingTasks = firebaseTasks.filter(task => task.category === "gaming");
    const otherTasks = firebaseTasks.filter(task => task.category === "others");

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
      setErrors({ task: "", description: "" });
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
                  <div id="addTaskSection" className="w-full flex items-center justify-end my-4"> 
                   
                    
                  <button className="mx-4 bg-white" onClick={handleAddTaskClick}> 
                       + Add a Task
                 </button>
            
                    {/* Conditional rendering of Modal */}
                    {showModal && (
                    <Modal onClose={handleCloseModal}>
                      <form onSubmit={handleTaskCreate} className="min-w-[30vw] min-h-[50vh] flex flex-col items-center justify-start rounded-sm">
                        
                        <div className="mt-4 font-bold text-lg">  Create Task </div>


                        <div className="ml-12 p-2 rounded-sm mt-4 flex flex-col w-full items-start "> 
                        <p> <label> Task Title </label> </p>
                        <p> <input type="text" ref={titleRef} className="border-2 border-black w-48 bg-white text-black placeholder-gray-500 p-1"/> </p>
                        </div> 




                        <div className="ml-12 p-2 rounded-sm mt-4 flex flex-col w-full items-start "> 
                        <p> <label> Task Name </label> </p>
                        <p> <input type="text" ref={taskNameRef} className="border-2 border-black w-48 bg-white text-black placeholder-gray-500 p-1"/> </p>
                        <p className="text-red-500 text-sm">{errors.task && errors.task} </p>
                        </div> 

                        <div className="ml-12 p-2 rounded-sm mt-4 flex flex-col w-full items-start"> 
                          <p><label>  Task Description</label></p>
                          <p className="w-full h-36">
                            <textarea
                              ref={descriptionRef}
                              className="border-2 border-black w-5/6 h-full bg-white text-black placeholder-gray-500 p-1 resize-none"
                              placeholder="Enter task description"
                            />
                          </p>
                          <p className="text-red-500 text-sm"> {errors.description && errors.description} </p>
                        </div>

                        <div className=" p-2 rounded-sm mt-4 flex  w-full items-start  justify-between  mx-4">
                          
                          <div> <input type="file"
                           accept="image/*"/> </div>
                          
                          <div>
                          <label htmlFor="priority">Category:</label>
                          <select className="ml-1 border border-black" ref={categoryRef}>
                            <option value="personal">Personal</option>
                            <option value="work">Work</option>
                            <option value="gaming">Gaming</option>
                            <option value="others">Other</option>
                          </select> 
                          </div>

                        </div>

                        <div className="p-2 rounded-sm mt-4 flex  w-full items-start justify-center"> 
                          <button className="bg-blue-300">Create Task</button>
                        </div>
                       
                          
                          
                      </form>
                    </Modal>
                  )}
                


                     
                  </div>
                  <div className="w-4/5 rounded-sm h-5/6 flex-wrap justify-between flex items-start justify-center overflow-y-auto ">
                    
                  {clickedButton === "all" && renderTasks(firebaseTasks)}
                  {clickedButton === "personal" && renderTasks(personalTasks)}
                  {clickedButton === "work" && renderTasks(workTasks)}
                  {clickedButton === "others" && renderTasks(otherTasks)}
                  {clickedButton === "gaming" && renderTasks(gamingTasks)}
                 

          
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
                    
                  
            
                  </div>
                </article>

                </aside>

         
            </article>
        </main>









        {showFlashMessage && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300">
            {flashMessage}
          </div>
        )}
        <Footer/>
        </body>

       
    );
}

export default MyHeadSpace;

 
   

  