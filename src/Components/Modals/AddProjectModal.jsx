import classes from '../Modal.module.css'
import React, { useState, useEffect } from 'react';
import { addDoc,collection, onSnapshot, doc, deleteDoc, updateDoc, serverTimestamp } from "@firebase/firestore"
import { firestore } from "../../firebase.js"


function AddProjectModal ( { onClose, projectNameRef, projectDescriptionRef, projectCategoryRef, setShowAddProjectModal, clickedCategory, activateAuthMessageError, projectRef, flashMessage, setFlashMessage, showFlashMessage, setShowFlashMessage }) {
const [errors, setErrors] = useState({});

const handleCreateProjectSubmit =  async (createProject) => {


    createProject.preventDefault();
    let formErrors = {}
    const projectNameValue = projectNameRef.current.value.trim();
    const projectDescriptionValue = projectDescriptionRef.current.value.trim();

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
      if (error.code === "permission-denied") {
      activateAuthMessageError();
      } else {
        console.error("Failed to add project", error);
      }
      }  
  }

return (
<section className={`${classes.backdrop}`} onClick={onClose}>
<aside onClick={(e) => e.stopPropagation()}>
<form onSubmit={handleCreateProjectSubmit} className={`w-[90vw] max-w-lg h-[50vh] overflow-y-auto ${classes.modal} bg-white flex flex-col items-center justify-center`}>
                                    {/* Close Button */}
    <aside className="flex flex-col  w-full"> 
        <div className='w-full flex justify-end items-center pr-4 h-1/5 mt-1 '>
            <button type="button" onClick={onClose} className="text-black">✕</button>
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
</aside>
</section>

)
}

export default AddProjectModal;