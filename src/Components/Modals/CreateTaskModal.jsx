import classes from '../Modal.module.css'
import React, { useState, useEffect } from 'react';
import { addDoc,collection, onSnapshot, doc, deleteDoc, updateDoc, serverTimestamp } from "@firebase/firestore"
import { firestore } from "../../firebase.js"


function CreateTaskModal({onClose, taskNameRef, taskStatusRef, errors, setErrors, projectClicked, activateAuthMessageError,
                            flashMessage, setShowFlashMessage, showFlashMessage, showModal, setShowModal, setFlashMessage}) {

const handleTaskCreate  = async (createTask) => 
    {
      createTask.preventDefault();
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
        dateCreated: new Date()
      };

      try {
      await addDoc (taskRef, taskData);
      setShowModal(false);
      setFlashMessage("Task successfully created");
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
       <section className={`${classes.backdrop}`} onClick={onClose}>
            <aside onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleTaskCreate} className={`min-w-[20vw] min-h-[20vh] flex flex-col items-center justify-start rounded-sm ${classes.modal}  text-black`}>
                                            
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
            </aside>
        </section>   
    )
}


export default CreateTaskModal;