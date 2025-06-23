import classes from '../Modal.module.css'
import React, { useState, useEffect } from 'react';
import { addDoc,collection, onSnapshot, doc, deleteDoc, updateDoc, serverTimestamp } from "@firebase/firestore"
import { firestore } from "../../firebase.js"

function EditProjectModal ({closeEditProjectModal, projectNameRef, projectDescriptionRef, projectClicked,
    projectCategoryRef, projectRef, activateAuthMessageError, clickedCategory, handleCloseAddProjectModal, 
    setShowEditProjectModal, flashMessage, setFlashMessage, showFlashMessage, setShowFlashMessage, showCompleteProjects, showEditProjectModal, handleEditProjectClick, setProjectClicked}) 
{
const [errors, setErrors] = useState({});

const handleCompleteProject = (project) => {
  setProjectClicked(project)
  const projectToCompleteRef = doc(firestore, "projects", projectClicked.id);
  let Data = {
    status: "complete"
  }
try {
  updateDoc(projectToCompleteRef, Data);
  setShowEditProjectModal(false);
  setFlashMessage("project marked as complete");
  setShowFlashMessage(true);
  setTimeout ( () => {setShowFlashMessage(false)}, 2000);
  console.log("attempt for", projectClicked.projectName)
} catch (error) {
  if (error.code === "permission-denied") {
    activateAuthMessageError();
  } else {
    console.error("Failed to add project", error);
  }
}
}

const handleUndoCompleteProject = (project) => {
  setProjectClicked(project)
  const projectToCompleteRef = doc(firestore, "projects", projectClicked.id);
  let Data = {
    status: "incomplete"
  }
try {
  updateDoc(projectToCompleteRef, Data);
  setShowEditProjectModal(false);
  setFlashMessage("project marked as complete");
  setShowFlashMessage(true);
  setTimeout ( () => {setShowFlashMessage(false)}, 2000);
  console.log("attempt for", projectClicked.projectName)
} catch (error) {
  if (error.code === "permission-denied") {
    activateAuthMessageError();
  } else {
    console.error("Failed to add project", error);
  }
}
}

const handleConfirmEditProject = async (e) =>{
e.preventDefault();

  let formErrors = {};

  let projectEditData = {
    projectName: projectNameRef.current.value,
    projectDescription: projectDescriptionRef.current.value,
    projectCategory:projectCategoryRef.current.value,
  }

  let projectDescriptionValue = projectDescriptionRef.current.value.trim();
  let projectNameValue = projectNameRef.current.value.trim();

  if(projectDescriptionValue.length > 100){
    formErrors.description = "project description must not exceed 100 characters"
  }
  if(projectNameValue.length > 40){
      formErrors.name = "project must not exceed 40 characters"
    }
  if(projectNameValue.length <1 ){
    formErrors.name = "project must have a name"
  }
  
  if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // stop submission
    }
  try 
  {

 const projectToEditRef = doc(firestore, "projects", projectClicked.id);
        await updateDoc(projectToEditRef, projectEditData)
        console.log("Document updated");
        setShowEditProjectModal(false);
        setFlashMessage("Project Edited successfully");
        setShowFlashMessage(true);
        setErrors("");
        setTimeout( () => {
          setShowFlashMessage(false);
        } , 2000);
        console.log(projectClicked.projectName);
      } catch (error) {
        if (error.code === "permission-denied") {
        activateAuthMessageError();
      } else {
        console.error("Failed to add project", error);
      }
  }
}

return (
<section className={`${classes.backdrop}`} onClick={closeEditProjectModal}>
<div onClick={(e) => e.stopPropagation()}>
    <form onSubmit={handleConfirmEditProject} className={` ${classes.modal} w-[90vw] max-w-lg h-[50vh] overflow-y-auto bg-white text-indigo-700 p-6 rounded-lg space-y-6`}>
                    
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
                {showCompleteProjects ? (
                    <button onClick={() => handleCompleteProject(projectClicked.id)} type="button"className="w-1/2 bg-green-700 text-white text-xs py-2 rounded ml-2" >
                          Mark as Complete
                    </button>
                      ) : (
                    <button  onClick={() => handleUndoCompleteProject(projectClicked.id)} type="button" className="w-1/2 bg-green-700 text-white text-xs py-2 rounded ml-2" >
                          Mark as Incomplete
                    </button>
                      )}
        </div>
    </form>
</div>
</section>
)
}
export default EditProjectModal;