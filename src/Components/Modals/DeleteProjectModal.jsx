import classes from '../Modal.module.css'
import React, { useState, useEffect } from 'react';
import { addDoc,collection, onSnapshot, doc, deleteDoc, updateDoc, serverTimestamp } from "@firebase/firestore"
import { firestore } from "../../firebase.js"


function DeleteProjectModal ({closeDeleteProjectModal, projectClicked ,setFlashMessage, showFlashMessage, activateAuthMessageError, setShowDeleteProjectModal, setShowFlashMessage }) {

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
    if (error.code === "permission-denied") {
        activateAuthMessageError();
      } else {
        console.error("Failed to add project", error);
      }
  }
 }

    return (
    <section className={`${classes.backdrop}`} onClick={closeDeleteProjectModal}>
    <aside onClick={(e) => e.stopPropagation()}>
    <form onSubmit={handleConfirmProjectDelete}  className={`w-[20vw]  ${classes.modal} h-[25vh] flex flex-col items-center justify-center text-black `}>
        <div className="w-full h-1/2 flex items-center justify-center mx-4  text-center"> 
                    <p className="mx-4 md:mt-2 md:text-[5px] lg:text-[12px] py-1"> Are you sure you want to delete project {projectClicked.projectName}? </p>
        </div>
        <div className="w-full  flex justify-center items-center">    
                      <button type="submit" className="bg-red-300 ml-12 mr-2 "> Yes</button>
                      <button onClick={closeDeleteProjectModal}className="bg-green-300 mr-12 ml-2 "> No</button>
        </div>
    </form>
    </aside>
    </section>   
    )


}




export default DeleteProjectModal;