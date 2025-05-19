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
import { TrashIcon, ClipboardDocumentListIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon, ChevronRightIcon, CheckIcon, ArrowPathIcon, ArrowUturnLeftIcon  } from '@heroicons/react/24/outline';

function MyHeadSpace(){

// #region global refs and declarations
  const [firebaseTasks, setFirebaseTasks] = useState([]);
  const projectRef = collection(firestore, "projects");
  const [projectClicked, setProjectClicked] = useState("");
  const handleProjectClick = (clickedProject) => {
    setProjectClicked(clickedProject);
    setClickedTask(null);

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
      formErrors.name = "project must have a name"
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
  const [clickedCategory, setClickedCategory] = useState("");
  const [ expandProject, setExpandProject] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState(new Set());



  
  const handleExpandProject = (project) => {
    console.log("hi, expanded projects are", expandedProjects);
   setExpandedProjects(prev => {
    const newSet = new Set(prev);
    if (newSet.has(project.id)){
      newSet.delete(project.id);
    } else{
      newSet.add(project.id);
    }
    return newSet;
   })

  }

 

  const handlePersonalClick = () => {
    setClickedCategory("personal");
    console.log("clicked category is", clickedCategory)
  }
  const handleWorkClick = () => {
    setClickedCategory("work");
    console.log("clicked category is", clickedCategory)
  }

  const handleGamingClick = () => {
    setClickedCategory("gaming");
    console.log("clicked category is", clickedCategory)
  }
  const handleOthersClick = () => {
    setClickedCategory("others");
    console.log("clicked category is", clickedCategory)
  }
  



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
      <aside onClick={() => handleProjectClick(project)} 
      key={project.id}
      className={`hover:bg-indigo-500 hover:text-white hover:border text-center project-item hover:cursor-pointer p-7 w-2/3 mt-2 rounded-md whitespace-nowrap flex items-center justify-start rounded-md 
      ${projectClicked.id == project.id ? 'bg-indigo-600 text-white' : 'bg-white text-black'}`}> 
      
      <div onClick={(e) => {
        e.stopPropagation();
        handleExpandProject(project);}} 
        className='flex justify-start items-start'> 
        
        {expandedProjects.has(project.id) 
        ? (<ChevronDownIcon className='w-5 h-5 text-red-500'></ChevronDownIcon>)


        : (<ChevronRightIcon className='w-5 h-5 text-red-500'></ChevronRightIcon>)
        
        }
        
        </div>

    
      
      <div className=" w-full flex flex-col justify-start items-start rounded-md">
        <p className='flex w-full justify-start '>
          <span className='capitalize font-bold text-lg w-4/6 text-start'> {project.projectName} </span>
          <span className='w-2/6  flex justify-end mx-1 space-x-2'> 
            <PencilIcon onClick={handleEditProjectClick} className='w-1/3 w-5 h-5 hover:cursor-pointer text-yellow-500 font-bold'>
            </PencilIcon> 
              { showEditProjectModal && (
                <Modal onClose={closeEditProjectModal}>
                  <form className='w-[25vw] h-[40vh] bg-white flex flex-col items-center justify-center text-indigo-700'>
                    <div className='w-full h-1/3 flex items-center justify-center flex flex-col'> 
                      <p className='w-full h-1/3 flex items-center justify-center '> Project Name </p>
                      <p className='w-full h-2/3'>
                        <input className="w-2/3 h-1/2 border border-indigo-700" defaultValue={project.projectName} type="text"/> 
                       </p>
                    </div>

                    <div className='w-full h-1/3'> 
                      <p className='w-full h-1/4'> Project Description</p>
                      <p className='w-full h-3/4 mb-8'> <textarea defaultValue={project.projectDescription} className=" border border-indigo-700 text-xs w-2/3 h-4/5 "/></p>
                    </div>
                    
                    <div className='w-full h-1/3 flex flex-col'> 
                      <p className='w-full h-1/3 flex items-center justify-center'>   
                        <label> Project Category: </label>
                        <select>  
                          <option> Personal</option>
                          <option> Gaming</option>
                          <option> Work</option>
                          <option> Others</option>
                        </select>
                      </p>

                      <p className="w-full h-2/3 flex items-center justify-center ">
                        <button className="w-1/4 bg-indigo-700 text-white"> Edit Project  </button>
                      </p>
                    </div>  
                  </form>
                </Modal>
              )}
            <TrashIcon onClick={handleDeleteProjectClick} className='w-1/3 w-5 h-5 hover:cursor-pointer text-red-500 font-bold'>
            </TrashIcon> 
            { showDeleteProjectModal && (
              <Modal onClose={closeDeleteProjectModal}>
                <form  className="w-[20vw] h-[30vh] flex flex-col items-center justify-center text-black">
                  <div className="w-full h-1/2 flex items-end justify-center"> 
                    Are you sure you want to delete this project? 
                  </div>
                  <div className="w-full h-1/2 flex justify-between items-center ">    
                      <button className="bg-red-300 ml-12"> Yes</button>
                      <button className="bg-green-300 mr-12"> No</button>
                    </div>
                </form>
              </Modal>


            )}
            <CheckIcon className='w-1/3 w-5 h-5 hover:cursor-pointer text-blue-500 font-bold'></CheckIcon> 
          </span>
       
        </p>
        <p
          className={` text-start overflow-hidden text-md  duration-500 transform transition-all ${
            expandedProjects.has(project.id)
              ? 'max-h-40 opacity-100 translate-y-2'
              : 'max-h-0 opacity-55 -translate-y-2'
          } whitespace-normal break-words leading-snug `}
        >
          {project.projectDescription}
        </p>

        

        
        <p
          className={`whitespace-normal break-words leading-snug text-start text-xs overflow-hidden duration-500 transform transition-all ${
          expandedProjects.has(project.id)
            ? 'max-h-40 opacity-100 translate-y-2'
            : 'max-h-0 opacity-55 -translate-y-2'
            }`}
          > {project.createdAt?.toDate
          ? `Created at ${project.createdAt.toDate().toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}`
          : 'Created at (date not available)'}
        </p>

      </div>
    
     </aside>
    ));
  }

  const renderWorkProjects = (projectList) => {
    return projectList.filter(project => project.projectCategory === "work").map(project => (
      <div onClick={() => handleProjectClick(project)} key={project.id}className="text-center project-item hover:cursor-pointer w-1/2 mt-2 rounded-md whitespace-nowrap bg-white flex items-center justify-center rounded-md"> 
      <p className={`hover:bg-indigo-100 text-indigo-900 p-8 w-full flex text-center justify-center items-center rounded-md ${projectClicked?.id === project.id ? 'bg-indigo-700 text-white' : ''}`}>{project.projectName} </p> 
     </div>
    ));
  }

  const renderGamingProjects = (projectList) => {
    return projectList.filter(project => project.projectCategory === "gaming").map(project => (
      <div onClick={() => handleProjectClick(project)} key={project.id}className="text-center project-item hover:cursor-pointer w-1/2 mt-2 rounded-md whitespace-nowrap bg-white flex items-center justify-center rounded-md"> 
      <p className={`hover:bg-indigo-100 text-indigo-900 p-8 w-full flex text-center justify-center items-center rounded-md ${projectClicked?.id === project.id ? 'bg-indigo-700 text-white' : ''}`}>{project.projectName} </p> 
     </div>
    ));
  }

  const renderOtherProjects = (projectList) => {
    return projectList.filter(project => project.projectCategory === "others").map(project => (
      <div onClick={() => handleProjectClick(project)} key={project.id}className="text-center project-item hover:cursor-pointer w-1/2 mt-2 rounded-md whitespace-nowrap bg-white flex items-center justify-center rounded-md"> 
      <p className={`hover:bg-indigo-100 text-indigo-900 p-8 w-full flex text-center justify-center items-center rounded-md ${projectClicked?.id === project.id ? 'bg-indigo-700 text-white' : ''}`}>{project.projectName} </p> 
     </div>
    ));
  }


   //#endregion
//

// #region Edit Project

const [showEditProjectModal, setShowEditProjectModal] = useState(false);
const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);


const closeDeleteProjectModal = () => {
  setShowDeleteProjectModal(false);
}

const handleDeleteProjectClick = ()  => {
  setShowDeleteProjectModal(true);
}


const handleEditProjectClick = () => {
  setShowEditProjectModal(true);
  console.log("project edit modal is now", true);
}

const closeEditProjectModal = () =>{
  setShowEditProjectModal(false);
}




// #endregion


// #region Create Task Handler
  
    const taskNameRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const taskStatusRef = useRef();


    const handleTaskCreate  = async (createTask) => {
    createTask.preventDefault();
    console.log(taskNameRef.current.value);
    const taskRef = collection(firestore, "projects", projectClicked.id, "tasks");


    let formErrors = {};

    const taskValue = taskNameRef.current.value.trim();
    

    if (taskValue.length < 3) {
      formErrors.name = "Task name must be at least 3 characters long.";
    }
  
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // stop submission
    }
  
  let taskData = {
    name: taskNameRef.current.value,
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
      setErrors("");
    };

  

  // #endregion

// #region Read Task Handler

    useEffect (() => {
      if (!projectClicked?.id) return;
    
      const taskRef = collection(firestore, "projects" , projectClicked.id, "tasks");
      const unsubscribe = onSnapshot(taskRef, (snapshot) => {
      const projectTasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
      }));
      setFirebaseTasks(projectTasks);

      console.log(firebaseTasks);
      });

      return () => unsubscribe();

    }, [projectClicked]);


    const renderCompleteTasks = (taskList) => {
      return taskList.filter(task => task.status === "complete").map(task => (
        <nav className='w-full flex bg-red-300'>
        <aside key={task.id} className="w-full h-auto bg-white text-black flex items-center justify-center flex-col border hover:bg-indigo-100 px-4 py-2 ">  
                      <div className='w-full flex'>
                        <p className='w-full mx-4 flex'>
                          <span className='w-auto flex-1 items-center justify-center text-black '> {task.name} </span>
                          <span className='w-1/6 flex'> 
                            <PencilIcon  onClick={ ()=> handleEditTaskClick(task)} className=" text-orange-300 cursor-pointer mr-2" />
                            { showEditTaskModal && (
                              <Modal onClose={handleCloseEditTaskModal}> 
                              <form onSubmit={handleEditTaskSubmit} className="text-black min-w-[20vw] min-h-[20vh] flex flex-col items-center justify-start rounded-sm">
                                <div className="mt-4 font-bold text-lg">  Edit Task </div>


                                <div className={`ml-12 p-2 rounded-sm mt-4 flex flex-col w-full  ${classes.smallFontSetting} items-start`}> 
                                  <p> <label> Task Name </label> </p>
                                  <p className='w-full flex items-start justify-start'> <input type="text" ref={updatedTaskName}  defaultValue={clickedTask.name}  className="border-2 border-black w-4/5 bg-white text-black placeholder-gray-500 p-1"/> </p>
                                  <p className="text-red-500 text-sm"> {errors.name}</p>
                                </div> 

                                <div className={`p-2 rounded-sm mt-4  ${classes.smallFontSetting} flex w-full items-start justify-center mx-2`}> 
                                  <button className={`text-xs py-2 ${classes.smallFontSetting} bg-blue-500 text-white mr-2` }>Edit Task</button>
                                </div>
                              </form>
                              </Modal>
                            )}
                            <ArrowPathIcon onClick={ () => handleReturnTask(task)} className='text-blue-500 hover:cursor-pointer'/>
                            
                            <TrashIcon onClick={() => handleDeleteTaskClick(task)} className="font-bold text-red-500 hover:text-red-700 cursor-pointer"/>
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
                          </span>
                        </p>
                      </div>
          </aside>
          </nav>
      ));
    };

    const renderIncompleteTasks = (taskList) => {
      return taskList.filter(task => task.status === "incomplete").map(task => (
        <nav className='w-full flex'>
        <aside key={task.id} className="w-full h-auto bg-white text-black flex items-center justify-center flex-col border hover:bg-indigo-100 px-4 py-2">  
                      <div className='w-full flex'>
                        <p className='w-full mx-4 flex'>
                          <span className='w-auto flex-1 items-center justify-center text-black '> {task.name} </span>
                          <span className='w-1/6 flex'> 
                            <PencilIcon  onClick={ ()=> handleEditTaskClick(task)} className=" text-orange-300 cursor-pointer mr-2" />
                            { showEditTaskModal && (
                              <Modal onClose={handleCloseEditTaskModal}> 
                              <form onSubmit={handleEditTaskSubmit} className="text-black min-w-[20vw] min-h-[20vh] flex flex-col items-center justify-start rounded-sm">
                                <div className="mt-4 font-bold text-lg">  Edit Task </div>


                                <div className={`ml-12 p-2 rounded-sm mt-4 flex flex-col w-full  ${classes.smallFontSetting} items-start`}> 
                                  <p> <label> Task Name </label> </p>
                                  <p className='w-full flex items-start justify-start'> <input type="text" ref={updatedTaskName}  defaultValue={clickedTask.name}  className="border-2 border-black w-4/5 bg-white text-black placeholder-gray-500 p-1"/> </p>
                                  <p className="text-red-500 text-sm"> {errors.name}</p>
                                </div> 

                                <div className={`p-2 rounded-sm mt-4  ${classes.smallFontSetting} flex w-full items-start justify-center mx-2`}> 
                                  <button className={`text-xs py-2 ${classes.smallFontSetting} bg-blue-500 text-white mr-2` }>Edit Task</button>
                                </div>
                              </form>
                              </Modal>
                            )}
                            <CheckIcon onClick={ () => handleCompleteTask(task)} className='text-green-500 hover:cursor-pointer'/>
                            
                            <TrashIcon onClick={() => handleDeleteTaskClick(task)} className="font-bold text-red-500 hover:text-red-700 cursor-pointer"/>
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
                          </span>
                        </p>
                      </div>
          </aside>
          </nav>
      ));
    };

    
 

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
   const handleEditTaskClick = (taskId) => {
    
    setClickedTask(taskId);
    console.log("clickedTask is now:" ,taskId.name);
    setErrors("");
    setShowEditTaskModal(true);
    console.log("showEditTaskModal is now:", true); // or log it in a useEffect below
}

    const handleCloseEditTaskModal = () => {
      setShowEditTaskModal(false);
      setErrors("");
    }

    const updatedTaskName= useRef();
    const updatedTask = useRef();
    const updatedTaskDescription = useRef();
    const updatedTaskCategory = useRef();

    

    const handleEditTaskSubmit = async(editTask) => {
      editTask.preventDefault();

      
      let updatedData = {
        name: updatedTaskName.current.value,
      };
      
      let formErrors = {};

      const titleEditValue = updatedTaskName.current.value.trim();
      

      if (titleEditValue.length < 3){
        formErrors.name = "Title must be at least 3 characters long"
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
        setClickedTask(null);
        setTimeout( () => {
          setShowFlashMessage(false);
        } , 2000);
      } catch (error) {
        console.error("Error updating", error);
      }
    }
    const handleCompleteTask = async (taskId) => {
      setClickedTask(taskId);
      console.log("haha ta", taskId)
     

      let settleTask = {
        status: "complete"
      }
      try {
        const taskEditRef = doc(firestore, "projects", projectClicked.id, "tasks", taskId.id);
        await updateDoc(taskEditRef, settleTask)
        console.log("Document updated");
        setShowEditTaskModal(false);
        setFlashMessage(`Task  "${taskId.name}" Marked as Complete`);
        setShowFlashMessage("true");
        setTimeout( () => {
          setShowFlashMessage(false);
        } , 2000);
      } catch (error) {
        console.error("Error updating", error);
      }

    }

    const handleReturnTask = async (taskId) => {
      setClickedTask(taskId);


      let returnTask = {
      status: "incomplete"
      }


 try {
        const taskEditRef = doc(firestore, "projects", projectClicked.id, "tasks", taskId.id);
        await updateDoc(taskEditRef, returnTask);
        setShowEditTaskModal(false);
        setFlashMessage(`Task "${taskId.name}" is now marked as incomplete`);
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

const handleDeleteTaskClick = (taskId) => {
  setClickedTask(taskId)  
  setShowDeleteModal(true);
  console.log("showdeletemodal is now:", true);
}

const handleCloseDeleteTaskModal = () =>{
  setShowDeleteModal(false);
  setErrors("");
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
            <section id="main article" className='w-4/5 h-4/5 mx-auto flex items-center justify-center bg-inherit bg-white'>
                <article id="first column wrapper" className='w-1/5 h-5/6 my-12  flex flex-col mr-20 ml-10 bg-indigo-300 rounded-md p-2  '>
                  <nav id="Projects" className={`h-full w-full h-full  items-center justify-start overflow-y-auto bg-indigo-500 flex flex-col rounded-md   `}>
      
                    <aside className={`mt-10 w-full mb-2 font-bold  ${classes.secondTaskBox} flex flex-col items-center justify-center `}> 
                      <div className=" w-full flex justify-center mx-4"> 
                        <div className={`items-center justify-center text-center ${classes.smallCategorySetting} ${classes.bigCategorySetting} bg-inherit  mx-4 rounded-md`}> Project Categories  </div>
                        
                      </div>
                      <div className="mt-4"> 
                        
                      </div>
                      
                    </aside>
                    
                  <section id="categoryContainer" className={`h-full w-full flex-col items-center text-indigo-900  justify-center `}> 

                    <aside id="personal" className="flex flex-col w-full">
                      <div className="w-full flex items-center justify-center">
                          <button className={`w-2/3 items-center justify-center text-center ${classes.smallCategorySetting} ${classes.bigCategorySetting} bg-white h-full hover:bg-gray-300  mx-2 rounded-lg`} onClick={handlePersonalClick}> Personal </button>
                      </div>

                    </aside>    

                    <aside id="work" className="flex flex-col w-full mt-3">
                        <div className="w-full flex items-center justify-center">
                          <button className={`w-2/3 items-center justify-center text-center ${classes.smallCategorySetting} ${classes.bigCategorySetting} bg-white h-full hover:bg-gray-300  mx-2 rounded-lg`} onClick={handleWorkClick}> Work </button>
                        </div>
                    </aside>             
          
                     <aside id="gaming" className="flex flex-col w-full mt-3">
                        <div className="w-full flex items-center justify-center">
                          <button className={`w-2/3 items-center justify-center text-center ${classes.smallCategorySetting} ${classes.bigCategorySetting} bg-white h-full hover:bg-gray-300  mx-2 rounded-lg`} onClick={handleGamingClick}> Gaming </button>
                        </div>
                    </aside> 

                    <aside id="others" className="flex flex-col w-full mt-3">
                        <div className="w-full flex items-center justify-center">
                          <button className={`w-2/3 items-center justify-center text-center ${classes.smallCategorySetting} ${classes.bigCategorySetting} bg-white h-full hover:bg-gray-300  mx-2 rounded-lg`} onClick={handleOthersClick}> Others </button>
                        </div>
                    </aside> 

                </section>

                </nav>
                </article>

                <section className="h-5/6 w-2/5 mr-20 p-2 bg-indigo-300 rounded-md">
                  <article id="2ndColumn" className="h-full w-full  flex flex-col items-center justify-center text-black bg-indigo-500 rounded-md "> { /* task area */}

                    <nav id="addTaskSection" className="w-full flex items-center justify-end my-4"> 
                          <button className='bg-white hover:bg-indigo-400 hover:text-white mx-2' onClick={handleAddProject}> + Add a Project  </button>
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
                                    <p className="text-red-500 text-sm sm:mx-8 xs:mx-8"> {errors.name && errors.name}  </p>
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
                    </nav>

                    <nav className="w-full h-full flex flex-col items-center justify-start overflow-y-auto">
                  

                      {clickedCategory === "personal" ? (
                        renderPersonalProjects(firebaseProjects)
                      ) : (

                        clickedCategory.length <1 ? (
                          <p>  select a category to view projects</p>) :( null)
                      )}


                      

                      {clickedCategory === "work" ? (
                        renderWorkProjects(firebaseProjects)
                      ) : (
                        null
                      )}

                      {clickedCategory === "gaming" ? (
                        renderGamingProjects(firebaseProjects)
                      ) : (
                        null
                      )}

                      {clickedCategory === "others" ? (
                        renderOtherProjects(firebaseProjects)
                      ) : (
                        null
                      )}

                      

                    </nav>

                  </article>
                </section>  

                <section className="h-5/6 w-2/5 mr-10 p-2 bg-indigo-300 rounded-md">
                <article id="3rdColumn" className="h-full w-full flex flex-col bg-indigo-500 rounded-md ">

                      <nav id="inProgressTasks" className="h-1/2 w-full  flex-1 flex-col items-start justify-start overflow-y-auto">

                        <aside className='text-center w-full p-4 text-white flex justify-center items-center  '> 
                          <div className="w-1/3">  </div>
                          <div className="w-1/3"> Tasks in Progress </div>
                       
                            {projectClicked ?
                            <button className="bg-white text-black p-2" onClick={handleAddTaskClick}> 
                                + Add a Task
                            </button>
                            :    <div className="w-1/3">  </div>
                            }
                      
                              {/* Conditional rendering of Modal */}
                              {showModal && (
                              <Modal onClose={handleCloseModal}>
                                <form onSubmit={handleTaskCreate} className="min-w-[20vw] min-h-[20vh] flex flex-col items-center justify-start rounded-sm  text-black">
                                  
                                  <div className="mt-4 font-bold text-lg">  Create Task </div>
                          
                                  <div className=" mx-auto p-2 rounded-sm mt-4 flex flex-col w-full items-start justify-center "> 
                                
                                    <span className='text-center w-full'> <label> Task Name </label> </span>
                                    <span className="w-full flex items-center justify-center"> <input type="text" ref={taskNameRef} placeholder="enter task name" className="border-2 border-black w-1/2 bg-white text-black placeholder-gray-500 p-1"/> </span>
                                    <span className="text-red-500 text-sm">{errors.name && errors.name} </span>
                                  
                                  </div> 

                                  <div className="p-2 rounded-sm mt-4 flex  w-full items-start justify-center"> 
                                    <button className="bg-white border border-black text-indigo-700">Create Task</button>
                                  </div>
                                                          
                                </form>
                              </Modal>
                            )}
                        </aside>
                        

                        {projectClicked && (firebaseTasks.length > 0 ? renderIncompleteTasks(firebaseTasks) : <p className='mx-8 text-white'> There are currently no tasks for this project...</p>)}
                        
                        
                        

                      </nav>

                      <nav id="completeTasks" className="h-1/2 w-full flex  flex-1 flex-col items-start justify-start overflow-y-auto bg-indigo-500">
                        <aside className='text-center w-full p-4 text-white '> Tasks Completed </aside>
                        
                          
                        {projectClicked && (firebaseTasks.length > 0 ? renderCompleteTasks(firebaseTasks) : <p className='mx-8 text-white'> There are currently no tasks for this project...</p>)}
                  
                        
                      </nav>

                </article>
                </section>  
                

         
          </section>
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

 
   

  