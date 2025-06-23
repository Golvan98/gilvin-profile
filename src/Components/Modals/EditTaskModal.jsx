import classes from '../Modal.module.css'
import React, { useState, useEffect } from 'react';
import { addDoc,collection, onSnapshot, doc, deleteDoc, updateDoc, serverTimestamp } from "@firebase/firestore"
import { firestore } from "../../firebase.js"

 function EditTaskModal ({onClose, taskNameRef, errors, setErrors, projectClicked, setShowEditTaskModal,
    setShowFlashMessage,  setFlashMessage, activateAuthMessageError, setClickedTask, clickedTask }) {

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

    return (
    <section className={`${classes.backdrop}`} onClick={onClose}>
        <aside onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleEditTaskSubmit} className={`${classes.modal} text-black min-w-[20vw] min-h-[20vh] flex flex-col items-center justify-start rounded-sm`}>
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
        </aside>
    </section>
    )

}

export default EditTaskModal;