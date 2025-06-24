import classes from '../Modal.module.css'
import React, { useState, useEffect } from 'react';
import { addDoc,collection, onSnapshot, doc, deleteDoc, updateDoc, serverTimestamp } from "@firebase/firestore"
import { firestore } from "../../firebase.js"



function DeleteTaskModal ({handleCloseDeleteTaskModal, clickedTask, projectClicked, showDeleteModal, setShowDeleteModal,
          setShowFlashMessage, showFlashMessage, setFlashMessage, activateAuthMessageError, setClickedTask, showEditTaskModal, setShowEditTaskModal}) {

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

return (
 <section className={`${classes.backdrop}`} onClick={handleCloseDeleteTaskModal}>
 <aside onClick={(e) => e.stopPropagation()}>
    <form onSubmit={handleConfirmDelete} className={`text-black min-w-[20vw] ${classes.modal} min-h-[20vh] flex flex-col items-center justify-center rounded-sm`}>
            <div> Are you sure that you want to delete this task? </div>
                <div className="flex w-full justify-between mt-8">  
                    <button className='ml-12 bg-red-500'> Yes </button>
                    <button onClick={handleCloseDeleteTaskModal} className='mr-12 bg-green-400'> No </button>
                </div>
    </form>
  </aside>
  </section>
)


}


export default DeleteTaskModal;