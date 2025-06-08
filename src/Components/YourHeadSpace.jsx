import {useState, useEffect, useRef} from 'react'
import classes from './MyHeadSpace.module.css'
import Modal from './Modal.jsx';
import { Link } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { firestore } from "../firebase.js"
import { addDoc,collection, onSnapshot, doc, deleteDoc, updateDoc, serverTimestamp } from "@firebase/firestore"
import { TrashIcon, ClipboardDocumentListIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon, ChevronRightIcon, CheckIcon, ArrowPathIcon, ArrowUturnLeftIcon  } from '@heroicons/react/24/outline';


function YourHeadSpace() 
{
  const [expandedProjects, setExpandedProjects] = useState(new Set());
  const [showInCompleteProjects, setShowInCompleteProjects] = useState(true);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [clickedCategory, setClickedCategory]  = useState("");
  const [projectClicked, setProjectClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFlashMessage, setShowFlashMessage] = useState("");
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const [errors, setErrors] = useState("");
  const [flashMessage, setFlashMessage] = useState("");

  
const [temporaryTasks, setTemporaryTasks] = useState(
    [
        { taskId:'task1', id:'project1', projectName:'Dummy Task for Work', projectCategory:'work', status:'incomplete'},
        { taskId:'task2', id:'project2', projectName:'Dummy Task for Personal', projectCategory:'personal', status:'incomplete'},
        { taskId:'task3', id:'project3', projectName:'Dummy Task for gaming', projectCategory:'gaming', status:'incomplete'},
        { taskId:'task4', id:'project4', projectName:'Dummy Task for Others', projectCategory:'others', status:'incomplete'},
    ]);
    

  const handleProjectClick = (project) => {
    setProjectClicked(project);
  }

  const [clickedProjectTasks, setClickedProjectTasks] = useState([]);

useEffect(() => {
  if (!projectClicked?.id) return;

  const filteredTasks = temporaryTasks.filter(task => task.id === projectClicked.id);
  setClickedProjectTasks(filteredTasks);
  console.log("Filtered tasks: ", filteredTasks);
}, [projectClicked, temporaryTasks]);



  const toggleProjectStatusView = () => {
    setShowInCompleteProjects(!showInCompleteProjects);
    console.log(" showCompleteProjects state is" , setShowInCompleteProjects);
  }
   const handleOpenEditProjectModal = (project) => {
    setProjectClicked(project);
    setShowEditProjectModal(true);
   }
   const handleCloseEditProjectModal = () => {
   
    setShowEditProjectModal(false);
   }

   const handleConfirmEditProject = async(e,project) => {
    e.preventDefault();

    let projectData = {
    projectName : projectNameRef.current.value,
    projectCategory : projectCategoryRef.current.value,
    projectDescription : projectDescriptionRef.current.value,
  }

  let formErrors = {};

  const projectNameValue = projectNameRef.current.value.trim();
  const projectCategoryValue = projectCategoryRef.current.value.trim();
  const projectDescriptionValue = projectDescriptionRef.current.value.trim();

  if (projectNameValue.length < 1 ) {
    formErrors.name = "project must have a name"
  }
  if (projectNameValue.length > 25 ) {
    formErrors.name = "project must not have a name of more than 25 characters"
  }

  if(projectDescriptionValue.length > 75) {
    formErrors.description = "project must not have a description of more than 75 characters"
  }

  if(Object.keys(formErrors).length > 0){
    setErrors(formErrors);
    return;
  }

  try {  

    const updatedProjects = temporaryProjects.map((p) =>
      p.id === project.id
        ? { ...p, ...projectData }  // updated project
        : p                         // all the others unchanged
    );
    
    setTemporaryProjects(updatedProjects);
    setFlashMessage("project edited");
    setShowFlashMessage(true);
    setShowEditProjectModal(false);
   
    setTimeout ( () => {
      setShowFlashMessage(false)}, 1000
    );
    }
    catch (error) {
      console.error("something went wrong", error);
    }
   }

   const handleUndoCompleteProject = (project) => {
    let completeProject = {
      status: "incomplete"
    }

    const completedProjects = temporaryProjects.map( (p) => 
        p.id == project.id 
    ? { ...p, ...completeProject}
    : p
    );

    setTemporaryProjects(completedProjects);
    setShowEditProjectModal(false);
    setFlashMessage("project marked as incomplete");
    setShowFlashMessage(true);
    setTimeout(() => {
    setShowFlashMessage(false)}, 1000);
   console.log("all dem projects are", temporaryProjects);
   }




   const handleCompleteProject = (project) => {
    let completeProject = {
      status: "complete"
    }

    const completedProjects = temporaryProjects.map( (p) => 
        p.id == project.id 
    ? { ...p, ...completeProject}
    : p
    );

    setTemporaryProjects(completedProjects);
    setShowEditProjectModal(false);
    setFlashMessage("project marked as complete");
    setShowFlashMessage(true);
    setTimeout(() => {
    setShowFlashMessage(false)}, 1000);
   console.log("all dem projects are", temporaryProjects);
   }

   const handleOpenDeleteProjectModal = (project) => {
    setProjectClicked(project);
    setShowDeleteProjectModal(true);
   }
   
   const handleCloseDeleteProjectModal = () => {
    setShowDeleteProjectModal(false);
   }

   const handleDeleteProjectSubmit = (e) => {
    e.preventDefault();

    setTemporaryProjects(prevProjects => prevProjects.filter(demproject => demproject.id !== projectClicked.id));
    setShowDeleteProjectModal(false);
    setFlashMessage("Temporary Project Deleted");
    setShowFlashMessage(true);
    setTimeout ( () => {
      setShowFlashMessage(false)}, 1000
    );
   }

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
  const categories = ['personal', 'work', 'gaming', 'others'];

  const handleCategoryClick = (category) => {
    setClickedCategory(category);
  console.log("Clicked category:", category);
};

  const renderProjects = () => {
    return renderProjectsByCategory(temporaryProjects, clickedCategory);
    
  };

  const handleOpenAddProjectModal = () => {
      setShowAddProjectModal(true);
  }

  const handleCloseAddProjectModal = () => {
    setShowAddProjectModal(false);
  }

    
const [temporaryProjects, setTemporaryProjects] = useState(
    [
        { id:'project1', projectName:'Project Dummy 1', projectCategory:'work', status:'incomplete'},
        { id:'project2', projectName:'Dummy Project 2', projectCategory:'personal', status:'incomplete'},
        { id:'project3', projectName:'3rd Project Dummy', projectCategory:'gaming', status:'incomplete'},
        { id:'project4', projectName:'Dummy Project, 4th', projectCategory:'others', status:'incomplete'},
    ]);

// #region projectSection
const projectNameRef = useRef();
const projectCategoryRef = useRef();
const projectDescriptionRef = useRef();

// #endregion
const handleDummy = () => {

}

const handleCreateProjectSubmit = async(createProject)  => {
  createProject.preventDefault();

  let formErrors = {}

  let projectData = {
    projectName : projectNameRef.current.value,
    projectCategory : projectCategoryRef.current.value,
    projectDescription : projectDescriptionRef.current.value,
  }

  const projectNameValue = projectNameRef.current.value.trim();
  const projectDescriptionValue = projectDescriptionRef.current.value.trim();

  if (projectNameValue.length < 1 ) {
    formErrors.name = "project must have a name"
  }
  if (projectNameValue.length > 25 ) {
    formErrors.name = "project must not have a name of more than 25 characters"
  }

  if(projectDescriptionValue.length > 75) {
    formErrors.description = "project must not have a description of more than 75 characters"
  }

  if(Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    console.log("errors are", formErrors);
    return;
  }

  const newProject = {
    id: crypto.randomUUID(),
    projectCategory: projectData.projectCategory,
    projectDescription: projectData.projectDescription,
    projectName: projectData.projectName,
    status: "incomplete"
  };

  try {
  setTemporaryProjects(prev => [...prev, newProject]);
  setErrors("");
  setShowAddProjectModal(false);
  setFlashMessage("Project Created");
  setShowFlashMessage(true);
   setTimeout( () => {
          setShowFlashMessage(false);
        } , 1000);

  console.log("projects currently in session", temporaryProjects);
  }
   catch (error) {
    console.error("something went wrong", error)
   }
  
};

 const renderProjectsByCategory = (temporaryProjects, category) => {
    const filteredProjects = temporaryProjects.filter(
      (project) =>
        project.projectCategory === category &&
        project.status === (showInCompleteProjects ? "incomplete" : "complete")
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
            <PencilIcon onClick={() => handleOpenEditProjectModal(project)} className="w-5 h-5 hover:cursor-pointer text-yellow-500 font-bold" />
            <TrashIcon onClick={() => handleOpenDeleteProjectModal(project)} className="w-5 h-5 hover:cursor-pointer text-red-500 font-bold" />
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

    return(
     <body className={`bg-deepPurple w-full min-h-[100vh] lg:min-h-[100vh]  flex flex-col ${classes.myHeadSpaceSetting}` }>
      <Header/>

        <main className="flex w-full min-h-[100vh]  items-center justify-center bg-inherit mt-8 flex flex-col ">
          <h2 className='text-center text-white mb-4 flex'>  This demo uses in-memory stage management only. To explore my live projects with real data, click  
              <p className='text-blue-500 ml-0.5'> 
                <Link to="/myHeadSpace" > here </Link> 
                <span className="text-white"> </span>
              </p>
              
          </h2>
          <section id="main article" className='w-4/5 bg-white text-back flex justify-center items-center text-center'> 
            <p className='mt-2'> Currently Viewing: {showInCompleteProjects ? (<span> Incomplete </span>) : (<span> Complete </span>)} Projects </p>
           </section>
          <section id="main article" className='w-4/5 h-full mx-auto flex flex-col flex-wrap items-center justify-center bg-inherit bg-white overflow-auto text-white text-center'> 
             
            <article id="first-column-wrapper" className='flex-shrink-0 w-1/4 mx-2 h-5/6 my-12 lg:w-1/5  flex flex-col bg-indigo-300 rounded-md p-2' > {/* comment: first-column-wrapper */} 
                    <nav id="Projects" className={`h-full w-full h-full  items-center justify-start overflow-y-auto bg-indigo-500 flex flex-col rounded-md   `}> 
        
                      <aside className={`mt-10 w-full mb-2 font-bold  ${classes.secondTaskBox} flex flex-col items-center justify-center `}> 
                        <div className=" w-full flex justify-center mx-4"> 
                          <div className={`items-center justify-center text-center ${classes.smallCategorySetting} ${classes.bigCategorySetting} bg-inherit  mx-4 rounded-md`}> Project Categories  </div>
                          
                        </div>
                        <div className="mt-4"> { /* comment: filler div for margin and spacing*/} </div>
                        
                      </aside>
                      
                    <section id="categoryContainer" className={`h-full w-full flex-col items-center text-indigo-900  justify-center `}> 

                      <div className="flex flex-col w-full items-center justify-center">
                        {categories.map((category, index) => (
                          <div
                            key={category}
                            id={category.toLowerCase()}
                            className={`flex flex-col w-full items-center justify-center ${index !== 0 ? 'mt-3' : ''}`}
                          >
                            <button
                              className={`w-2/3 items-center justify-center text-center ${classes.smallCategorySetting} ${classes.bigCategorySetting} bg-white h-full hover:bg-gray-300 mx-2 rounded-lg`}
                              onClick={() => handleCategoryClick(category)}
                            >
                              {category}
                            </button>
                          </div>
                        ))}
                      </div>

                    </section>

                  </nav>
            </article>

            <article id="2nd-column-wrapper" className="flex-shrink-0 h-5/6 w-2/5 p-2 bg-indigo-300 rounded-md text-black "> { /* comment: 2nd-column-wrapper*/}
                    <nav  className="h-full w-full flex flex-col items-center justify-center bg-indigo-500 rounded-md "> 

                      <aside id="addTaskSection" className="w-full flex items-center justify-between my-4"> 
                            <button onClick={toggleProjectStatusView} className='ml-4 mr-4'> 
                              { showInCompleteProjects ? ('View Completed Projects') : ('View Incomplete Projects') }
                              </button>
                            <button className='bg-white hover:bg-indigo-400 hover:text-white mr-4' onClick={handleOpenAddProjectModal}> + Add a Project  </button>
                          
                            { showAddProjectModal && (
                              <Modal onClose={handleCloseAddProjectModal}> { /*Add Project Modal  */}
                                <form onSubmit={handleCreateProjectSubmit} className="w-[90vw] max-w-lg h-[50vh] overflow-y-auto bg-white flex flex-col items-center justify-center">
                                    {/* Close Button */}
                                    <aside className="flex flex-col  w-full"> 
                                      <div className='w-full flex justify-end items-center pr-4 h-1/5 mt-1 '>
                                        <button type="button" onClick={handleDummy} className="text-black">✕</button>
                                      </div>
                                      {/* Project Name */}
                                      <div className='w-full h-4/5 flex items-center justify-center flex-col'>
                                        <label className='w-2/3 font-semibold'>Project Name</label>
                                        <input ref={projectNameRef} type="text" placeholder="Input project name here" className="w-2/3 px-1 h-full font-lg border border-indigo-700 "/>
                                        {errors.name && ( <p className="text-red-500 mt-1">{errors.name}</p>  )}
                                      </div>  
                                    </aside>
                                    {/* Project Description */}
                                      <div className='w-full h-1/3 flex flex-col items-center justify-center mt-1'>
                                        <label className='w-2/3 text-sm font-semibold'>Project Description</label>
                                        <textarea ref={projectDescriptionRef} placeholder="Input project description here" className="text-xs border border-indigo-700 w-2/3 h-[60%] px-1 py-2"/>
                                      {errors.description && ( <p className="text-xs text-red-500 mt-1">{errors.description}</p> )}
                                      </div>

                                    {/* Project Category & Submit */}
                                    <div className='w-full h-1/3 flex flex-col items-center justify-start mt-2'>
                                      <label className='text-sm font-semibold'>Project Category:</label>
                                      <select ref={projectCategoryRef} defaultValue={clickedCategory} className="border border-indigo-700 w-2/3 py-2 mt-1" >
                                        <option value="personal">Personal</option>
                                        <option value="work">Work</option>
                                        <option value="gaming">Gaming</option>
                                        <option value="others">Others</option>
                                      </select>

                                      <div className='mb-2 w-1/3'> <button type="submit"className="my-2 w-full bg-indigo-700 hover:bg-indigo-800 text-sm py-1 rounded " >
                                        Create Project
                                      </button>
                                      </div>
                                    </div>
                                </form>
                              </Modal>
                            ) }   
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
                              <button className="bg-white text-black p-2" onClick={handleDummy}> 
                                  + Add a Task
                              </button>
                              :    <div className="w-1/3">  </div>
                              }
                                {/* comment: Conditional rendering of Modal */}
                                {showModal && (
                                <Modal onClose={handleDummy}>
                                  <form onSubmit={handleDummy} className="min-w-[20vw] min-h-[20vh] flex flex-col items-center justify-start rounded-sm  text-black">
                                    
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
                          
                          {/* projectClicked && (firebaseTasks.length > 0 ? renderIncompleteTasks(firebaseTasks) : <p className='mx-8 text-white'> There are currently no tasks for this project...</p>) */}
    
                        </aside>

                        <aside id="completeTasks" className="h-1/2 w-full flex  flex-1 flex-col items-start justify-start overflow-y-auto bg-indigo-500">
                          <aside className='text-center w-full p-4 text-white '> Tasks Completed </aside>
                              
                          {/* projectClicked && (firebaseTasks.length > 0 ? renderCompleteTasks(firebaseTasks) : <p className='mx-8 text-white'> There are currently no tasks for this project...</p>) */}
                              
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
                                  <button onClick={handleDummy} className='mr-12 bg-green-400'> No </button>
                                </div>
                              </form>
                              </Modal>
        )}

        { showEditProjectModal &&  (
                <Modal onClose={handleCloseEditProjectModal}>
                  <form onSubmit={ (e) => (handleConfirmEditProject(e,projectClicked))} className="w-[90vw] max-w-lg h-[50vh] overflow-y-auto bg-white text-indigo-700 p-6 rounded-lg space-y-6">
                    
                    <div className="text-center">
                      <p className="text-lg font-bold text-black">Edit Project</p>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-medium">Project Name</label>
                      <input ref={projectNameRef} defaultValue={projectClicked.projectName} type="text" className="w-full border border-indigo-700 px-3 py-2 text-sm rounded" />
                      {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-medium">Project Description</label>
                      <textarea ref={projectDescriptionRef} defaultValue={projectClicked.projectDescription} className="w-full border border-indigo-700 px-3 py-2 text-sm rounded resize-none h-24"  />
                      {errors.description && (
                        <span className="text-red-500 text-sm">{errors.description}</span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-medium">Project Category</label>
                      <select ref={projectCategoryRef} defaultValue={projectClicked.projectCategory} className="w-full border border-indigo-700 px-3 py-2 text-sm rounded" >
                        <option value="personal">Personal</option>
                        <option value="gaming">Gaming</option>
                        <option value="work">Work</option>
                        <option value="others">Others</option>
                      </select>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button type="submit"  className="w-1/2 bg-indigo-700 text-white text-xs py-2 rounded mr-2"   >
                        Edit Project
                      </button>
                      {showInCompleteProjects ? (
                        <button onClick={() => handleCompleteProject(projectClicked)} type="button"className="w-1/2 bg-green-700 text-white text-xs py-2 rounded ml-2" >
                          Mark as Complete
                        </button>
                      ) : (
                        <button  onClick={() => handleUndoCompleteProject(projectClicked)} type="button" className="w-1/2 bg-green-700 text-white text-xs py-2 rounded ml-2" >
                          Mark as Incomplete
                        </button>
                      )}
                    </div>
                  </form>
                </Modal>
        )}
        { showDeleteProjectModal && (
              <Modal onClose={handleCloseDeleteProjectModal}>
                <form onSubmit={handleDeleteProjectSubmit}  className="w-[20vw] h-[25vh] flex flex-col items-center justify-center text-black ">
                  <div className="w-full h-1/2 flex items-center justify-center mx-4  text-center"> 
                    <p className="mx-4 md:mt-2 md:text-[5px] lg:text-[12px] py-1"> Are you sure you want to delete project {projectClicked.projectName}? </p>
                  </div>
                  <div className="w-full  flex justify-center items-center">    
                      <button type="submit" className="bg-red-300 ml-12 mr-2 "> Yes</button>
                      <button onClick={handleDummy}className="bg-green-300 mr-12 ml-2 "> No</button>
                    </div>
                </form>
              </Modal>
        )}
        </body>
    );
}



export default  YourHeadSpace;