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
import { TrashIcon, ClipboardDocumentListIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

function MyHeadSpace(){

// #region global refs and declarations
  const [firebaseTasks, setFirebaseTasks] = useState([]);
  const projectRef = collection(firestore, "projects");
  const [projectClicked, setProjectClicked] = useState("");
  const handleProjectClick = (clickedProject) => {
    setProjectClicked(clickedProject);
    console.log("project clicked is", clickedProject); 
  }
  const [errors, setErrors] = useState({});
  const [flashMessage, setFlashMessage] = useState("");
  const [showFlashMessage, setShowFlashMessage] = useState("");

// #endregion

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

   

    try{
      await addDoc (projectRef, projectData)
      setFlashMessage("project created successfully")
      setShowAddProjectModal(false);
      setShowFlashMessage(true);
      setTimeout (() =>{
        setShowFlashMessage(false);
      } , 2000)
    } 

    catch (error){
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

// #region Read Project
  const [firebaseProjects, setFireBaseProjects] = useState([]);

  



  useEffect (() => {
  const unsubscribe = onSnapshot(collection(firestore, "projects"), (snapshot) => {
  const projectData = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
    setFireBaseProjects(projectData);
  });
  
  return () => unsubscribe(); // Cleanup
    }, []);

    

  const renderPersonalProjects = (projectList) => {
    return projectList.filter(project => project.projectCategory === "personal").map(project => (
      <div onClick={() => handleProjectClick(project)} className="text-center project-item hover:cursor-pointer w-full mt-2 rounded-md whitespace-nowrap"> 
      
      { projectClicked.id == project.id  
      ?  ( <p className='bg-blue-800 text-white w-full p-2'>{project.projectName} </p> ) 
      : ( <p className='bg-blue-100 text-blue-900 w-full p-2'>{project.projectName} </p> )
      }
     </div>
    ));
  }

  const renderWorkProjects = (projectList) => {
    return projectList.filter(project => project.projectCategory === "work").map(project => (
      <div onClick={() => handleProjectClick(project)}  key={project.id} className="text-center project-item hover:cursor-pointer w-full mt-2 rounded-md whitespace-nowrap"> 
      { projectClicked.id == project.id  
      ?  ( <p className='bg-blue-800 text-white w-full p-2'>{project.projectName} </p> ) 
      : ( <p className='bg-blue-100 text-blue-900 w-full p-2'>{project.projectName} </p> )
      }
     </div>
    ));
  }

  const renderGamingProjects = (projectList) => {
    return projectList.filter(project => project.projectCategory === "gaming").map(project => (
          <div onClick={() => handleProjectClick(project)}  key={project.id} className=" text-center project-item hover:cursor-pointer w-full mt-2 rounded-md whitespace-nowrap"> 
           { projectClicked.id == project.id  
            ?  ( <p className='bg-blue-800 text-white w-full p-2'>{project.projectName} </p> ) 
            : ( <p className='bg-blue-100 text-blue-900 w-full p-2'>{project.projectName} </p> )
           }
          </div>
    ));
  }

  const renderOtherProjects = (projectList) => {
    return projectList.filter(project => project.projectCategory === "others").map(project => (
          <div onClick={() => handleProjectClick(project)}  key={project.id} className="text-center project-item hover:cursor-pointer w-full mt-2 rounded-md whitespace-nowrap"> 
          { projectClicked.id == project.id  
          ?  ( <p className='bg-blue-800 text-white w-full p-2'>{project.projectName} </p> ) 
          : ( <p className='bg-blue-100 text-blue-900 w-full p-2'>{project.projectName} </p> )
          }
          </div>
    ));
  }

  

 

  const [personalIsExpanded, setPersonalIsExpanded] = useState(false);
  const [workIsExpanded, setWorkIsExpanded] = useState(false);
  const [gamingIsExpanded, setGamingIsExpanded] = useState(false);
  const [otherIsExpanded, setOtherIsExpanded] = useState(false);
  
  const CategorySection = () => {
    const [expandedCategories, setExpandedCategories] = useState({});
  }

  const togglePersonal = () => {
    setPersonalIsExpanded(!personalIsExpanded)
  }

  const toggleWork = () => { 
    setWorkIsExpanded(!workIsExpanded)
  }

  const toggleGaming = () => {
    setGamingIsExpanded(!gamingIsExpanded)
  }

  const toggleOther = () => {
    setOtherIsExpanded(!otherIsExpanded)
  }


   //#endregion
//


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
    const taskRef = collection(firestore, "projects", projectClicked.id, "tasks");


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

    useEffect (() => {
      if (!projectClicked?.id) return;
    
    
      const taskRef = collection(firestore, "projects" , projectClicked.id, "tasks");
      const unsubscribe = onSnapshot(taskRef, (snapshot) => {
      const projectTasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
      }));
      setFirebaseTasks(projectTasks);
      });
    
      return () => unsubscribe();
    
    
    }, [projectClicked]);
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

      if (descriptionEditValue.length <7 ) {
        formErrors.description = "description must be at least 7 characters long"
      }

      if (Object.keys(formErrors).length > 0){
        setErrors(formErrors);
        return;
      }

      try {
        const taskEditRef = doc(firestore, "projects", projectClicked.id, "tasks", clickedTask.id);
        await updateDoc(taskEditRef, updatedData)
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
  const taskDeleteRef = doc(firestore, "projects", projectClicked.id, "tasks", clickedTask.id);;

  try {
    await deleteDoc(taskDeleteRef);
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
            <article className='w-4/5 h-4/5 mx-auto flex items-center justify-center bg-inherit'>
                <aside id="Projects" className={`h-full w-1/5 h-full  items-center justify-start overflow-y-auto bg-[#3498DB]  flex flex-col `}>
     
                  <div className={`mt-10 w-full mb-2 font-bold  ${classes.secondTaskBox} flex flex-col items-center justify-center`}> 
                    <div className="  w-full flex justify-center"> 
                      <button onClick={handleAddProject}> + Add a Project  </button>
                      { showAddProjectModal && (
                        <Modal onClose={handleCloseAddProjectModal}> { /*Add Project Modal  */}
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
                    <div className="mt-4"> Projects {personalIsExpanded} </div>
                    
                  </div>
                  
                <section id="categoryContainer" className={`h-full w-full flex-col items-center  justify-center `}> 

                    <aside id="personal" className="flex flex-col w-full">
                      <div className="w-full flex items-center justify-center">
                        {personalIsExpanded ? (
                          <ChevronDownIcon  onClick={togglePersonal} className="w-5 h-5 hover:cursor-pointer text-black" />
                          ) : (
                          <ChevronRightIcon
                            onClick={togglePersonal}
                            className="w-5 h-5 hover:cursor-pointer text-black"
                          />
                        )}
                        <div className="w-1/2 items-center justify-center text-center bg-white h-full hover:bg-gray-300 rounded-sm p-2 mr-2" onClick={togglePersonal}> Personal </div>
                      </div>

                      {/* Drop-down animation */}
                      <div className={`overflow-hidden transition-all duration-300 transform ${personalIsExpanded? 'max-h-auto opacity-100 translate-y-0': 'max-h-0 opacity-0 -translate-y-2'}`}>
                        <div className="w-full space-y-2 mt-2 flex flex-col items-center justify-center ">
                          <div className="w-full"> {renderPersonalProjects(firebaseProjects)}</div>
                        </div>
                      </div>
                    </aside>    

                    <aside id="work" className="flex flex-col w-full mt-3">
                      <div className="w-full flex items-center justify-center">
                        {workIsExpanded ? (
                          <ChevronDownIcon  onClick={toggleWork} className="w-5 h-5 hover:cursor-pointer text-black" />
                          ) : (
                          <ChevronRightIcon
                            onClick={toggleWork}
                            className="w-5 h-5 hover:cursor-pointer text-black"
                          />
                        )}
                        <div className="w-1/2  items-center justify-center text-center bg-white h-full hover:bg-gray-300 rounded-sm p-2 mr-2" onClick={toggleWork}> Work </div>
                      </div>

                      {/* Drop-down animation */}
                      <div className={`overflow-hidden transition-all duration-300 transform ${workIsExpanded? 'max-h-auto opacity-100 translate-y-0': 'max-h-0 opacity-0 -translate-y-2'}`}>
                        <div className="w-full space-y-2 mt-4 flex flex-col items-center justify-center">
                          <div className="w-full"> {renderWorkProjects(firebaseProjects)}</div>
                        </div>
                      </div>
                    </aside>             

                    <aside id="gaming" className="flex flex-col w-full mt-3">
                      <div className="w-full flex items-center justify-center">
                        {gamingIsExpanded ? (
                          <ChevronDownIcon  onClick={toggleGaming} className="w-5 h-5 hover:cursor-pointer text-black" />
                          ) : (
                          <ChevronRightIcon
                            onClick={toggleGaming}
                            className="w-5 h-5 hover:cursor-pointer text-black"
                          />
                        )}
                        <div className="w-1/2  items-center justify-center text-center bg-white h-full hover:bg-gray-300 rounded-sm p-2 mr-2" onClick={toggleGaming}> Gaming </div>
                      </div>

                      {/* Drop-down animation */}
                      <div className={`overflow-hidden transition-all duration-300 transform ${gamingIsExpanded? 'max-h-auto opacity-100 translate-y-0': 'max-h-0 opacity-0 -translate-y-2'}`}>
                        <div className="w-full space-y-2 mt-4 flex flex-col items-center justify-center">
                          <div className="w-full"> {renderGamingProjects(firebaseProjects)}</div>
                        </div>
                      </div>
                    </aside>     

                    <aside id="other" className="flex flex-col w-full mt-3">
                      <div className="w-full flex items-center justify-center">
                        {otherIsExpanded ? (
                          <ChevronDownIcon  onClick={toggleOther} className="w-5 h-5 hover:cursor-pointer text-black" />
                          ) : (
                          <ChevronRightIcon
                            onClick={toggleOther}
                            className="w-5 h-5 hover:cursor-pointer text-black"
                          />
                        )}
                        <div className="w-1/2  items-center justify-center text-center bg-white h-full hover:bg-gray-300 rounded-sm p-2 mr-2" onClick={toggleOther}> Others </div>
                      </div>

                      {/* Drop-down animation */}
                      <div className={`overflow-hidden transition-all duration-300 transform ${otherIsExpanded? 'max-h-auto opacity-100 translate-y-0': 'max-h-0 opacity-0 -translate-y-2'}`}>
                        <div className="w-full space-y-2 mt-4 flex flex-col items-center justify-center">
                          <div className="w-full"> {renderOtherProjects(firebaseProjects)}</div>
                        </div>
                      </div>
                    </aside>   

                </section>

                </aside>

                <aside id="nav2" className="h-full w-2/5  flex flex-col items-center justify-center text-black bg-[#2980B9]"> { /* task area */}
                  <div id="addTaskSection" className="w-full flex items-center justify-end my-4"> 
                   
                  {projectClicked ?
                  <button className="mx-4 bg-white" onClick={handleAddTaskClick}> 
                       + Add a Task
                 </button>
                  : <p className='mr-5 text-white'> Please select a project... </p>
                 }
            
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

 
   

  