import classes from './MyHeadSpace.module.css'
import HamburgerMenu from './HamburgerMenu.jsx';
import Footer from './Footer.jsx';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import React, { useState, useEffect, useRef } from 'react';
import { firestore } from "../firebase.js"
import { addDoc,collection, onSnapshot, doc, deleteDoc, updateDoc, serverTimestamp } from "@firebase/firestore"
import Modal from './Modal.jsx';
import tasks from '../assets/tasks'
import { TrashIcon, ClipboardDocumentListIcon, PencilIcon  } from '@heroicons/react/24/outline';

function MyHeadSpace(){
  const [firebaseTasks, setFirebaseTasks] = useState([]);
  const taskRef = collection(firestore, "tasks");
  const projectRef = collection(firestore, "projects");
  
// #region Create Project

  const projectNameRef = useRef();
  const projectCategoryRef = useRef();
  const projectDescriptionRef = useRef();
  const projectStatusRef = useRef();
  const [showAddProjectModal, setShowAddProjectModal] = useState("");

  const handleCreateProjectSubmit =  async (createProject) => {
    createProject.preventDefault();

    let formErrors = {}

    const projectNameValue = projectNameRef.current.value.trim();
    const projectDescriptionValue = projectDescriptionRef.current.value.trim();

    if (projectNameValue.length <= 0 )
    {
      formErrors.title = "project must have a name"
    }
    if (projectDescriptionValue.length <= 5){
      formErrors.description = "project must have a description with more than 5 characters"
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // stop submission
    }

    let projectData = {
      projectName: projectNameRef.current.value,
      projectDescription: projectDescriptionRef.current.value,
      projectCategory: projectCategoryRef.current.value,
      status: "incomplete",
      createdAt: serverTimestamp()
    }

    console.log(createProject)

    try{
      await addDoc (projectRef, projectData)
      setFlashMessage("project created successfully")
      setShowAddProjectModal(false);
      setShowFlashMessage(true);

      setTimeout (() =>{
        setShowFlashMessage(false);
      } , 2000)
    } catch 
    (error){
      console.log("failed to add project", error);
    } 
    
  
  }

  const handleAddProject = () => {
    setShowAddProjectModal(true);
  }

  const handleCloseAddProjectModal = () => {
    setShowAddProjectModal(false);
    setErrors("");
  }


// #endregion


// #region global refs
  const [errors, setErrors] = useState({});
  const [flashMessage, setFlashMessage] = useState("");
  const [showFlashMessage, setShowFlashMessage] = useState("");
// #endregion

// #region Create Task Handler
    
    const titleRef = useRef();
    const taskNameRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const categoryRef = useRef();
    const taskStatusRef = useRef();
    const handleTaskCreate  = async (createTask) => {
    createTask.preventDefault();
    console.log(taskNameRef.current.value);

    let formErrors = {};

    const titleValue = titleRef.current.value.trim();
    const taskValue = taskNameRef.current.value.trim();
    const descriptionValue = descriptionRef.current.value.trim();
    
    if (titleValue.length == 0) {
      formErrors.title = "Task must have a title"
    }

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
    status: "incomplete",
    
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

  const [showModal, setShowModal] = useState(false);

    const handleAddTaskClick = () => {
      setErrors({ task: "", description: "" });
      setShowModal(true);  // Show modal when the button is clicked
    };
  
    const handleCloseModal = () => {
      setShowModal(false);  // Close modal when clicked outside or a close button
    };

  

  // #endregion

// #region Read Task Handler
    const renderTasks = (taskList) => {
      return taskList.filter(task => task.status === "incomplete").map(task => ( 
      <>
          <button
            onClick={() => handleTaskClick(task)}
            key={task.id}
            className={`my-2 bg-white w-2/5  mx-auto rounded-md  flex items-center justify-center break-all px-2 text-center ${classes.secondTaskBox}`}
          >
            {task.title}
          </button>
      </>
      
      ));
    };

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

    const personalTasks = firebaseTasks.filter(task => task.category === "personal");
    const workTasks = firebaseTasks.filter(task => task.category === "work");
    const gamingTasks = firebaseTasks.filter(task => task.category === "gaming");
    const otherTasks = firebaseTasks.filter(task => task.category === "others");

    const [clickedButton, setClickedButton] = useState("all");

    const [clickedTask, setClickedTask] = useState(null);

    const handleTaskClick = (taskId) => {
      setClickedTask(taskId);
    }

    const handleButtonClick = (buttonId) => {
      setClickedButton(buttonId);
    };

    

    // #endregion
    
// #region Edit Task Handler
   const [showEditTaskModal, setShowEditTaskModal] = useState("");
   const handleEditTaskClick = () => {
    setShowEditTaskModal(true);
    console.log("showEditTaskModal is now:", true); // or log it in a useEffect below
}

    const handleCloseEditTaskModal = () => {
      setShowEditTaskModal(false);
    }

    const updatedTaskTitle = useRef();
    const updatedTask = useRef();
    const updatedTaskDescription = useRef();
    const updatedTaskCategory = useRef();

    const handleEditTaskSubmit = async(editTask) => {
      editTask.preventDefault();
      const selectTaskRef = doc(firestore, "tasks", clickedTask.id);

      let updatedData = {
        title:updatedTaskTitle.current.value,
        task: updatedTask.current.value,
        description :updatedTaskDescription.current.value,
        category: updatedTaskCategory.current.value,
      };
      
      let formErrors = {};

      const titleEditValue = updatedTaskTitle.current.value.trim();
      const taskEditValue = updatedTask.current.value.trim();
      const descriptionEditValue = updatedTaskDescription.current.value.trim();
      const categoryEditValue =  updatedTaskCategory.current.value.trim();

      if (titleEditValue.length < 3){
        formErrors.title = "Title must be at least 3 characters long"
      }

      if (taskEditValue.length <3){
        formErrors.task = "task name must be at least 3 characters long"
      }

      if (descriptionEditValue <7 ) {
        formErrors.description = "description must be at least 7 characters long"
      }

      if (Object.keys(formErrors).length > 0){
        setErrors(formErrors);
        return;
      }

      try {
        await updateDoc(selectTaskRef, updatedData)
        console.log("Document updated");
        setShowEditTaskModal(false);
        setFlashMessage("Task Edit successfully");
        setShowFlashMessage(true);
        setTimeout( () => {
          setShowFlashMessage(false);
        } , 2000);
      } catch (error) {
        console.error("Error updating", error);
      }
    }

    const handleCompleteTask = async (completeTask) => {
      const selectTaskRef = doc(firestore, "tasks", clickedTask.id);

      let settleTask = {
        status: "complete"
      }
      try {
        await updateDoc(selectTaskRef, settleTask)
        console.log("Document updated");
        setShowEditTaskModal(false);
        setFlashMessage("Task Marked Completed");
        setShowFlashMessage("true");
        setTimeout( () => {
          setShowFlashMessage(false);
        } , 2000);
      } catch (error) {
        console.error("Error updating", error);
      }

    }
// #endregion

// #region Delete Task Handler

const [showDeleteModal, setShowDeleteModal] = useState("");

const handleDeleteTaskClick = () => {
  setShowDeleteModal(true);
  console.log("showdeletemodal is now:", true);
}

const handleCloseDeleteTaskModal = () =>{
  setShowDeleteModal(false);
}

const handleConfirmDelete = async(deleteTask) => {
  deleteTask.preventDefault();
  const deleteTaskRef = doc(firestore, "tasks", clickedTask.id);

  try {
    await deleteDoc(deleteTaskRef);
    console.log("deleted task with id:", clickedTask.id);
    setShowDeleteModal(false);
    setFlashMessage("task deleted successfully");
    setShowFlashMessage(true);


    setTimeout( () => {
      setShowFlashMessage(false);
    } , 2000);

  } catch (error) {
    console.error("Failed to delete task:", error);
  }
}

// #endregion

    return (
        <body className={`bg-deepPurple w-full min-h-[100vh] flex flex-col ${classes.myHeadSpaceSetting}` }>
    
      <Header/>

        <main className="flex w-full min-h-[100vh] items-center justify-center">
            <article className='w-4/5 h-4/5 mx-auto flex items-center justify-center bg-inherit '>
                <aside id="Projects" className={`h-full w-1/5 h-full  items-center justify-start overflow-y-auto bg-[#3498DB]  flex flex-col `}>
     
                  <div className={`mt-10 w-full mb-2 font-bold  ${classes.secondTaskBox} flex flex-col items-center justify-center`}> 
                    <div className="  w-full flex justify-center"> 
                      <button onClick={handleAddProject}> + Add a Project  </button>
                      { showAddProjectModal && (
                        <Modal onClose={handleCloseAddProjectModal}>
                          <form onSubmit={handleCreateProjectSubmit} className="min-w-[20vw] min-h-[30vh] flex flex-col items-center justify-center"> 
                              <div className='w-full min-h-[10vh] flex flex-col items-start justify-center '>
                                <p className='flex w-full items-start mb-2 justify-end'> 
                                  <button onClick={handleCloseAddProjectModal} className=''> X </button>
                                </p>
                                <p className='flex flex-col '>
                                <label className='sm:mx-8 xs:mx-8'> Project Name: </label>
                                <input ref={projectNameRef} type="text" placeholder="input project name here" className="sm:mx-8 xs:mx-8 border-2 border-black"/> 
                                <p className="text-red-500 text-sm sm:mx-8 xs:mx-8"> {errors.title && errors.title}  </p>
                                </p>
                              </div>

                              <div className='w-full min-h-[15vh]  flex flex-col items-start justify-center'>
                                <p className='flex flex-col '>
                                <label className='sm:mx-8 xs:mx-8'> Project Description: </label>
                                <textarea ref={projectDescriptionRef}  placeholder="input project name here" className="text-md sm:mx-8 xs:mx-8 border-2 border-black p-6"/> 
                                <p className="text-red-500 text-sm sm:mx-8 xs:mx-8"> {errors.description && errors.description}  </p>
                                </p>
                              </div>


                              <div className='w-full min-h-[10vh]  flex flex-col items-start justify-center'>
                                <p className='flex flex-col '>
                                <label className='sm:mx-8 xs:mx-8'> Project Category: </label>
                                <select className="sm:mx-8 xs:mx-8 border border-black" ref={projectCategoryRef}>
                                <option value="personal">Personal</option>
                                <option value="work">Work</option>
                                <option value="gaming">Gaming</option>
                                <option value="others">Other</option>
                                </select> 
                                </p>
                              </div>

                              <div className='w-full flex items-center justify-center p-2'>
                                <button className="bg-blue-300 hover:bg-blue-500"> Create Project</button>
                              </div>

                          </form>
                        </Modal>
                      ) }
                    </div>
                    <div className="mt-4"> Projects </div>
                    
                  </div>
                  
                  <section id="categoryContainer" className={`h-full w-full flex-col items-center  justify-center`}> 

                    <div className='p-1 text-center bg-inherit  w-full flex items-center justify-center space-y-4'> 
                      <button onClick={ () =>handleButtonClick("all")} className='p-1.5 w-2/3 bg-white h-full hover:bg-gray-300 rounded-sm'> All </button>
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
                        <p className="text-red-500 text-sm">{errors.title && errors.title} </p>
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
                  <div className="w-full rounded-sm h-5/6 flex-wrap justify-between flex items-start justify-center overflow-y-auto  ">
                    
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
                  <div className="h-1/4 flex w-full items-center justify-between">
                  { clickedTask ? (

                    <>
                     <div className="justify-start mx-4"> {clickedTask.title}  </div> 
                     <div className="justify-start mx-4 flex">  
                       <PencilIcon  onClick={handleEditTaskClick} className="font-bold w-5 h-5 text-orange-300 cursor-pointer mr-2" />
                       { showEditTaskModal && (
                        <Modal onClose={handleCloseEditTaskModal}> 
                        <form onSubmit={handleEditTaskSubmit} className="text-black min-w-[30vw] min-h-[50vh] flex flex-col items-center justify-start rounded-sm">
                          <div className="mt-4 font-bold text-lg">  Edit Task </div>


                          <div className="ml-12 p-2 rounded-sm mt-4 flex flex-col w-full items-start "> 
                            <p> <label> Task Title </label> </p>
                            <p> <input type="text" ref={updatedTaskTitle}  defaultValue={clickedTask.title} className="border-2 border-black w-48 bg-white text-black placeholder-gray-500 p-1"/> </p>
                            <p className="text-red-500 text-sm"> {errors.title}</p>
                          </div> 




                          <div className="ml-12 p-2 rounded-sm mt-4 flex flex-col w-full items-start "> 
                            <p> <label> Task Name </label> </p>
                            <p> <input type="text" ref={updatedTask} defaultValue={clickedTask.task} className="border-2 border-black w-48 bg-white text-black placeholder-gray-500 p-1"/> </p>
                            <p className="text-red-500 text-sm"> {errors.task}</p>
                          </div> 

                          <div className="ml-12 p-2 rounded-sm mt-4 flex flex-col w-full items-start"> 
                            <p><label>  Task Description</label></p>
                            <p className="w-full h-36">
                              <textarea
                                ref={updatedTaskDescription}
                                className="border-2 border-black w-5/6 h-full bg-white text-black placeholder-gray-500 p-1 resize-none"
                                defaultValue={clickedTask.description}
                              />
                            </p>
                            <p className="text-red-500 text-sm"> {errors.description} </p>
                          </div>

                          <div className=" p-2 rounded-sm mt-4 flex  w-full items-start  justify-between  mx-4">
                            
                            <div> <input type="file"
                            accept="image/*"/> 
                            </div>
                            
                            <div>
                              <label htmlFor="priority">Category:</label>
                              <select className="ml-1 border border-black"   defaultValue={clickedTask.category} ref={updatedTaskCategory}>
                                <option value="personal">Personal</option>
                                <option value="work">Work</option>
                                <option value="gaming">Gaming</option>
                                <option value="others">Other</option>
                              </select> 
                            </div>

                          </div>

                          <div className="p-2 rounded-sm mt-4 flex  w-full items-start justify-between"> 
                            <button className="bg-blue-300">Edit Task</button>
                            <button onClick={handleCompleteTask} className="bg-green-300">Mark as Complete</button>
                          </div>
                        </form>
                        </Modal>
                       )}
                       <TrashIcon onClick={handleDeleteTaskClick} className="font-bold w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" />
                       { showDeleteModal && (
                        <Modal onClose={handleCloseDeleteTaskModal}>
                        <form onSubmit={handleConfirmDelete} className="text-black min-w-[20vw] min-h-[20vh] flex flex-col items-center justify-center rounded-sm">
                          <div> Are you sure that you want to delete this task? </div>
                          <div className="flex w-full justify-between mt-8">  
                            <button className='ml-12 bg-red-500'> Yes </button>
                            <button onClick={handleCloseDeleteTaskModal} className='mr-12 bg-green-400'> No </button>
                          </div>
                        </form>
                        </Modal>
                       )}
                      </div> 
                     </>
                    ) : (<p>No task selected</p>)}
                   </div>

                  <div className="h-3/4 w-full flex justify-start mt-2 items-start"> 
                  { clickedTask ? (
                    <>
                    <p className="mx-4"> {clickedTask.description}</p>
                    </>
                    ) : (<p> select a task</p>)}
                    
                  
            
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

 
   

  