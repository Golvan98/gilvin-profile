import classes from './MyHeadSpace.module.css'
import HamburgerMenu from './HamburgerMenu.jsx';
import Footer from './Footer.jsx';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import { useState, useEffect, useRef } from 'react';
import { firestore } from "../firebase.js"
import { addDoc,collection, onSnapshot, doc, deleteDoc, updateDoc, serverTimestamp } from "@firebase/firestore"
import Modal from './Modal.jsx';
import tasks from '../assets/tasks'
import { TrashIcon, ClipboardDocumentListIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon, ChevronRightIcon, CheckIcon, ArrowPathIcon, ArrowUturnLeftIcon  } from '@heroicons/react/24/outline';
import LoginModal from './Modals/LoginModal.jsx';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import AddProjectModal from './Modals/AddProjectModal.jsx';
import EditProjectModal from './Modals/EditProjectModal.jsx';
import CreateTaskModal from './Modals/CreateTaskModal.jsx';

function MyHeadSpace(){

  const activateAuthMessageError = () => {
  setErrorMessage(
  <>  
     Hey there! 👋 You’re not authorized to edit Gilvin’s projects. 👉
     <Link to="/yourHeadSpace" className="underline text-blue-500">Click here </Link>
     to explore the demo version instead
  </>
  );
  setShowErrorMessage(true);
  setTimeout(() => {
    setShowErrorMessage(false);
  }, 4000);
};

    useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (!user) {
     
    } else {
      setShowLoginModal(false);
      setFlashMessage(`Logged in as ${user.displayName}`);
      setShowFlashMessage(true);
      setTimeout ( () => {
        setShowFlashMessage(false);
      }, 1000);
    }
  });

  return () => unsubscribe();
}, []);

    const [showLoginModal, setShowLoginModal] = useState(false);
    const openLoginModal = () => setShowLoginModal(true);
    const closeLoginModal = () => setShowLoginModal(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);

  // #region Create Task Handler
    const taskNameRef = useRef();
    const taskStatusRef = useRef();

  
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

  // #region Edit Task Handler
    const [clickedButton, setClickedButton] = useState("all");
    const [clickedTask, setClickedTask] = useState(null);

    const handleTaskClick = (taskId) => 
    {
      setClickedTask(taskId);
    }
    const handleButtonClick = (buttonId) => 
    {
      setClickedButton(buttonId);
    };
   const [showEditTaskModal, setShowEditTaskModal] = useState(false);
   const handleEditTaskClick = (task) => {
    
    setClickedTask(task);
    console.log("clickedTask is now:" ,task.name);
    setErrors("");
    setShowEditTaskModal(true);
}

    const handleCloseEditTaskModal = () => {
      setShowEditTaskModal(false);
      setErrors("");
    }

    const handleEditTaskSubmit = async(editTask) => 
    {
      editTask.preventDefault();
      let updatedData = {
        name: taskNameRef .current.value,
      };
      let formErrors = {};
      const titleEditValue = taskNameRef.current.value.trim();
      
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
        if (error.code === "permission-denied") {
        activateAuthMessageError();
        } else {
          console.error("Failed to add project", error);
        }
      }
    }

    const handleCompleteTask = async (taskId) => 
    {
      setClickedTask(taskId);
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
        if (error.code === "permission-denied") {
        activateAuthMessageError();
        } else {
          console.error("Failed to add project", error);
        }
        }
    }

    const handleReturnTask = async (taskId) => 
    {
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
        if (error.code === "permission-denied") {
        activateAuthMessageError();
        } else {
          console.error("Failed to add project", error);
        }
        }
    }
// #endregion

// #region global refs and declarations
  const [firebaseTasks, setFirebaseTasks] = useState([]);
  const projectRef = collection(firestore, "projects");
  const [projectClicked, setProjectClicked] = useState(1);
  const handleProjectClick = (project) => {
    setProjectClicked(project);
    setClickedTask(null);
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
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  


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
  const [showCompleteProjects, setShowCompleteProjects] = useState(true);

  const toggleViewProjects = () => {
    setShowCompleteProjects(prev => !prev);
    console.log(showCompleteProjects);
  } 

  const renderProjects = () => {
    return renderProjectsByCategory(firebaseProjects, clickedCategory);
  };

  const handleExpandProject = (project) => 
  {
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
  const allProjects = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
    setFireBaseProjects(allProjects);
  });
  
  return () => unsubscribe(); 
    }, []);

    const renderProjectsByCategory = (projectList, category) => {
    const filteredProjects = projectList.filter(
      (project) =>
        project.projectCategory === category &&
        project.status === (showCompleteProjects ? "incomplete" : "complete")
    );

  return filteredProjects.map((project) => (
    <aside
      onClick={() => handleProjectClick(project)}
      key={project.id}
      className={`hover:bg-indigo-500 hover:text-white hover:border text-center project-item hover:cursor-pointer px-3 py-5 w-2/3 mt-2 rounded-md whitespace-nowrap flex items-center justify-start 
      ${projectClicked.id === project.id ? "bg-indigo-600 text-white" : "bg-white text-black"}`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleExpandProject(project);
        }}
        className="flex justify-start items-start"
      >
        {expandedProjects.has(project.id) ? (
          <p className=''> <ChevronDownIcon className="w-5 h-5 text-green-500 md:w-3 xs:w-3 lg:w-5" /> </p>
        ) : (
          <ChevronRightIcon className="w-5 h-5 text-green-500 md:w-3 xs:w-3 lg:w-5" />
        )}
      </div>

      <div className="w-full flex flex-col justify-start items-start rounded-md">
        <p className="flex w-full justify-start">
          <span className="capitalize font-bold w-4/6 flex items-center whitespace-normal break-words leading-snug text-start">
            {project.projectName}
          </span>
          <span className="w-2/6 flex justify-end mx-1 space-x-1">
            <PencilIcon onClick={() => handleEditProjectClick(project)} className="w-5 h-5 hover:cursor-pointer text-yellow-500 font-bold" />
            <TrashIcon onClick={() => handleDeleteProjectClick(project)} className="w-5 h-5 hover:cursor-pointer text-red-500 font-bold" />
          </span>
        </p>

        <p
          className={`text-start overflow-hidden text-md duration-500 transform transition-all ${
            expandedProjects.has(project.id)
              ? "max-h-40 opacity-100 translate-y-1 xs:-translate-y-1"
              : "max-h-0 opacity-55 -translate-y-2"
          } whitespace-normal break-words leading-snug`}
        >
          {project.projectDescription}
        </p>

        <p
          className={`whitespace-normal break-words leading-snug text-start overflow-hidden duration-500 transform transition-all ${
            expandedProjects.has(project.id)
              ? "max-h-40 opacity-100 translate-y-1 xs:-translate-y-1"
              : "max-h-0 opacity-55 -translate-y-2"
          }`}
        >
          {project.createdAt?.toDate
            ? `Created at ${project.createdAt.toDate().toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}`
            : "Created at (date not available)"}
        </p>
      </div>
    </aside>
  ));
};

   //#endregion
// #region Edit Project
const [showEditProjectModal, setShowEditProjectModal] = useState("");
const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);

const handleEditProjectClick = (project) => {
  setProjectClicked(project)
  setShowEditProjectModal(true);
  console.log("hello");
}

const closeEditProjectModal = () =>{
  setShowEditProjectModal(false);
}

// #endregion

// #region Delete Project

  const closeDeleteProjectModal = () => {
    setShowDeleteProjectModal(false);
  }
  const handleDeleteProjectClick = (project)  => {
    setProjectClicked(project)
    setShowDeleteProjectModal(true);
  }
 const handleConfirmProjectDelete = async (deleteProject) => 
  {
   const projectToDeleteRef = doc(firestore, "projects", projectClicked.id);;
  deleteProject.preventDefault();

  try{
    await deleteDoc(projectToDeleteRef);
    setShowDeleteProjectModal(false);
    setFlashMessage(`project ${projectClicked.projectName} deleted`);
    setShowFlashMessage(true);
    setTimeout( () => { setShowFlashMessage(false); } , 2000);
    
  } catch  (error) {
    console.log("error deleting project", error);
  }
 }

// #endregion

// #region Read Task Handler

    useEffect (() => {
      if (!projectClicked?.id) return;
     // const projectRef = doc(firestore, "projects", projectClicked.id);
      const taskRef = collection(firestore, "projects" , projectClicked.id, "tasks");
      const unsubscribe = onSnapshot
    (taskRef, (snapshot) => 
    {
      const projectTasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
      }));
      setFirebaseTasks(projectTasks);
    }
    );
      return () => unsubscribe();
    }, [projectClicked]);

    const renderCompleteTasks = (taskList) => {
      return taskList.filter(task => task.status === "complete").map(task => (
        <nav className='w-full flex'>
        <aside key={task.id} className="w-full h-auto bg-white text-black flex items-center justify-center flex-col border hover:bg-indigo-100 lg:px-4 lg:py-3 md:px-0 md:py-0 xs:p-0 xs:p-0 ">  
                      <div className='w-full flex'>
                          <p className='lg:w-5/6 md:w-4/6 xs:w-4/6 items-center justify-center  sm:text-xs mx-2'> {task.name} </p>
                          <p className='lg:w-1/6 md:w-2/6 xs:w-2/6 flex items-center justify-center '> 
                            <PencilIcon  onClick={ ()=> handleEditTaskClick(task)} className="w-1/3 text-orange-300 cursor-pointer" />
                            <ArrowPathIcon onClick={ () => handleReturnTask(task)} className='w-1/3 text-blue-500 hover:cursor-pointer'/>
                            <TrashIcon onClick={() => handleDeleteTaskClick(task)} className="w-1/3 font-bold text-red-500 hover:text-red-700 cursor-pointer"/>
                          </p>
                      </div>
        </aside>
        </nav>
      ));
    };
   
    const renderIncompleteTasks = (taskList) => {
      return taskList.filter(task => task.status === "incomplete").map(task => (
        <nav className='w-full flex'>
        <aside key={task.id} className="w-full h-auto bg-white text-black flex items-center justify-center flex-col border hover:bg-indigo-100 lg:px-4 lg:py-3 md:px-0 md:py-0 xs:p-0 xs:p-0 ">  
                      <div className='w-full flex'>
                          <p className='lg:w-5/6 md:w-4/6 xs:w-4/6 items-center justify-center  sm:text-xs mx-2'> {task.name} </p>
                          <p className='lg:w-1/6 md:w-2/6 xs:w-2/6 flex items-center justify-center '> 
                            <PencilIcon  onClick={ ()=> handleEditTaskClick(task)} className="w-1/3 text-orange-300 cursor-pointer" />
                            <CheckIcon onClick={ () => handleCompleteTask(task)} className='w-1/3 text-green-500 hover:cursor-pointer'/>
                            <TrashIcon onClick={() => handleDeleteTaskClick(task)} className="w-1/3 font-bold text-red-500 hover:text-red-700 cursor-pointer"/>
                          </p>
                        
                      </div>
          </aside>
          </nav>
      ));
    };
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
    if (error.code === "permission-denied") {
    activateAuthMessageError();
    } else {
      console.error("Failed to add project", error);
    }
  }
}
// #endregion

    return (

        <body className={`bg-deepPurple w-full min-h-[100vh] lg:min-h-[100vh]  flex flex-col ${classes.myHeadSpaceSetting}`  }>
        <Header toggleOpenLoginModal={openLoginModal}/>
        {showLoginModal && (
          <LoginModal onClose={closeLoginModal}></LoginModal>
      )}

        <main className="flex w-full min-h-[100vh]  items-center justify-center bg-inherit mt-8 flex flex-col ">
          <h2 className='text-center text-white mb-4'> This to do app is currenly live and is being updated daily by Gilvin, if you want to test this out temprorarily, click this link
              <p className='text-blue-500 '> 
                <Link to="/yourHeadSpace"> here </Link> 
                <span className="text-white"> it's the same, but the projects you create will be gone when you revisit the page</span>
              </p>
              
          </h2>

          <section className='w-4/5 bg-white text-back flex justify-center items-center text-center'> 
            <p className='mt-2'> Currently Viewing: {showCompleteProjects ? (<span> Incomplete </span>) : (<span> Complete </span>)} Projects </p>
          </section>

          <section id="main article" className='w-4/5 h-full mx-auto flex flex-wrap items-center justify-center bg-inherit bg-white overflow-auto text-white '> 
                
            <article id="first-column-wrapper" className='flex-shrink-0 w-1/4 mx-2 h-5/6 my-12 lg:w-1/5  flex flex-col bg-indigo-300 rounded-md p-2' > {/* comment: first-column-wrapper */} 
                    <nav id="Projects" className={`h-full w-full h-full  items-center justify-start overflow-y-auto bg-indigo-500 flex flex-col rounded-md   `}> 
        
                      <aside className={`mt-10 w-full mb-2 font-bold  ${classes.secondTaskBox} flex flex-col items-center justify-center `}> 
                        <div className=" w-full flex justify-center mx-4"> 
                          <div className={`items-center justify-center text-center ${classes.smallCategorySetting} ${classes.bigCategorySetting} bg-inherit  mx-4 rounded-md`}> Project Categories  </div>
                          
                        </div>
                        <div className="mt-4"> { /* comment: filler div for margin and spacing*/} </div>
                        
                      </aside>
                      
                    <section id="categoryContainer" className={`h-full w-full flex-col items-center text-indigo-900  justify-center `}> 

                      <div id="personal" className="flex flex-col w-full flex items-center justify-center">
                            <button className={`w-2/3 items-center justify-center text-center ${classes.smallCategorySetting} ${classes.bigCategorySetting} bg-white h-full hover:bg-gray-300  mx-2 rounded-lg`} onClick={handlePersonalClick}> Personal </button>
                      </div>    
                      <div id="work" className="flex flex-col w-full flex items-center justify-center mt-3">
                            <button className={`w-2/3 items-center justify-center text-center ${classes.smallCategorySetting} ${classes.bigCategorySetting} bg-white h-full hover:bg-gray-300  mx-2 rounded-lg`} onClick={handleWorkClick}> Work </button>
                      </div>             
                      <div id="gaming" className="flex flex-col w-full flex items-center justify-center mt-3">
                            <button className={`w-2/3 items-center justify-center text-center ${classes.smallCategorySetting} ${classes.bigCategorySetting} bg-white h-full hover:bg-gray-300  mx-2 rounded-lg`} onClick={handleGamingClick}> Gaming </button>
                      </div> 
                      <div id="others" className="flex flex-col w-full flex items-center justify-center mt-3">
                            <button className={`w-2/3 items-center justify-center text-center ${classes.smallCategorySetting} ${classes.bigCategorySetting} bg-white h-full hover:bg-gray-300  mx-2 rounded-lg`} onClick={handleOthersClick}> Others </button>
                      </div> 

                    </section>

                  </nav>
            </article>

            <article id="2nd-column-wrapper" className="flex-shrink-0 h-5/6 w-2/5 p-2 bg-indigo-300 rounded-md text-black "> { /* comment: 2nd-column-wrapper*/}
                    <nav  className="h-full w-full flex flex-col items-center justify-center bg-indigo-500 rounded-md "> 

                      <aside id="addTaskSection" className="w-full flex items-center justify-between my-4"> 
                            <button onClick={toggleViewProjects} className='ml-4 mr-4'> 
                              { showCompleteProjects ? ('View Completed Projects') : ('View Incomplete Projects') }
                              </button>
                            <button className='bg-white hover:bg-indigo-400 hover:text-white mr-4' onClick={handleAddProject}> + Add a Project  </button>
                          
                            { showAddProjectModal && (
                             <AddProjectModal projectRef={projectRef} activateAuthMessageError={activateAuthMessageError} 
                            clickedCategory={clickedCategory} projectNameRef={projectNameRef}
                            projectDescriptionRef={projectDescriptionRef} projectCategoryRef={projectCategoryRef} 
                            onClose={handleCloseAddProjectModal} setShowAddProjectModal={setShowAddProjectModal} 
                            flashMessage={flashMessage} setFlashMessage={setFlashMessage} showFlashMessage={showFlashMessage} setShowFlashMessage={setShowFlashMessage}
                            />
                            )}   
                      </aside>

                      <aside className="w-full h-full flex flex-col items-center justify-start overflow-y-auto">
                        {clickedCategory.length < 1 
                        ? (<p>Select a category to view projects</p> ) 
                        : (  renderProjects() )
                        }
                      </aside>

                    </nav>
            </article>  

            <article id="3rd-column-wrapper"  className=" flex-shrink-0 h-5/6 w-1/3 mx-2 p-2 bg-indigo-300 rounded-md mb-2"> {/* comment: third-column-wrapper */}
                  <nav className="h-full w-full flex flex-col bg-indigo-500 rounded-md ">

                        <aside id="inProgressTasks" className="h-1/2 w-full  flex-1 flex-col items-start justify-start overflow-y-auto">

                          <aside className='text-center w-full p-4 text-white flex justify-center items-center  '> 
                            <div className="w-1/3 ">  </div>
                            <div className="w-1/3 md:mr-8 xs:mr-1"> Tasks in Progress </div>
                        
                              {projectClicked ?
                              <button className="bg-white text-black p-2" onClick={handleAddTaskClick}> 
                                  + Add a Task
                              </button>
                              :    <div className="w-1/3">  </div>
                              }
                                {/* comment: Conditional rendering of Modal */}
                                {showModal && (
                                <CreateTaskModal taskNameRef={taskNameRef} taskStatusRef={taskStatusRef} onClose={handleCloseModal} errors={errors} setErrors={setErrors} projectClicked={projectClicked}
                                flashMessage={flashMessage} setShowFlashMessage={setShowFlashMessage} showFlashMessage={showFlashMessage} showModal={showModal} setShowModal={setShowModal} setFlashMessage={setFlashMessage}
                                activateAuthMessageError={activateAuthMessageError}/>
                              )}
                          </aside>
                          
                          {projectClicked && (firebaseTasks.length > 0 ? renderIncompleteTasks(firebaseTasks) : <p className='mx-8 text-white'> There are currently no tasks for this project...</p>)}
    
                        </aside>

                        <aside id="completeTasks" className="h-1/2 w-full flex  flex-1 flex-col items-start justify-start overflow-y-auto bg-indigo-500">
                          <aside className='text-center w-full p-4 text-white '> Tasks Completed </aside>
                              
                          {projectClicked && (firebaseTasks.length > 0 ? renderCompleteTasks(firebaseTasks) : <p className='mx-8 text-white'> There are currently no tasks for this project...</p>)}
                              
                        </aside>

                  </nav>
            </article>  
                
          </section>
        </main>

        {showFlashMessage && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300">
            {flashMessage}
          </div>
        )}
        {showErrorMessage && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300">
            {errorMessage}
          </div>
        )}
        <Footer/>
         { /* All Modals */ }
        { showEditTaskModal &&   
        (
                              <Modal onClose={handleCloseEditTaskModal}> 
                              <form onSubmit={handleEditTaskSubmit} className="text-black min-w-[20vw] min-h-[20vh] flex flex-col items-center justify-start rounded-sm">
                                <div className="mt-4 font-bold text-lg">  Edit Task </div>

                                <div className={`ml-12 p-2 rounded-sm mt-4 flex flex-col w-full  ${classes.smallFontSetting} items-start`}> 
                                  <p> <label> Task Name </label> </p>
                                  <p className='w-full flex items-start justify-start'> <input type="text" ref={taskNameRef}  defaultValue={clickedTask.name}  className="border-2 border-black w-4/5 bg-white text-black placeholder-gray-500 p-1"/> </p>
                                  <p className="text-red-500 text-sm"> {errors.name}</p>
                                </div> 

                                <div className={`p-2 rounded-sm mt-4  ${classes.smallFontSetting} flex w-full items-start justify-center mx-2`}> 
                                  <button className={`text-xs py-2 ${classes.smallFontSetting} bg-blue-500 text-white mr-2` }>Edit Task</button>
                                </div>
                              </form>
                              </Modal>
        )}
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

        { showEditProjectModal &&  (
                <EditProjectModal projectClicked={projectClicked} closeEditProjectModal={closeEditProjectModal} projectNameRef={projectNameRef} projectDescriptionRef={projectDescriptionRef}  projectCategoryRef={projectCategoryRef}
                            projectRef={projectRef} activateAuthMessageError={activateAuthMessageError} showCompleteProjects={showCompleteProjects}
                            clickedCategory={clickedCategory} setShowEditProjectModal={setShowEditProjectModal}  handleEditProjectClick={handleEditProjectClick}
                            flashMessage={flashMessage} setFlashMessage={setFlashMessage} showFlashMessage={showFlashMessage} setShowFlashMessage={setShowFlashMessage} setProjectClicked={setProjectClicked} 
                />
        )}
        { showDeleteProjectModal && (
              <Modal onClose={closeDeleteProjectModal}>
                <form onSubmit={handleConfirmProjectDelete}  className="w-[20vw] h-[25vh] flex flex-col items-center justify-center text-black ">
                  <div className="w-full h-1/2 flex items-center justify-center mx-4  text-center"> 
                    <p className="mx-4 md:mt-2 md:text-[5px] lg:text-[12px] py-1"> Are you sure you want to delete project {projectClicked.projectName}? </p>
                  </div>
                  <div className="w-full  flex justify-center items-center">    
                      <button type="submit" className="bg-red-300 ml-12 mr-2 "> Yes</button>
                      <button onClick={closeDeleteProjectModal}className="bg-green-300 mr-12 ml-2 "> No</button>
                    </div>
                </form>
              </Modal>
        )}
        </body>
    );
}
export default MyHeadSpace;

 
   

  