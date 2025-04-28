import React, { useRef } from 'react';
import { firestore } from "../firebase.js";
import { addDoc, collection } from "@firebase/firestore";

function MessageFormPage() {
  const messageRef = useRef();
  const ref = collection(firestore, "messages");

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(messageRef.current.value);

    let data = {
      message: messageRef.current.value,
    };
    
    try {
      await addDoc(ref, data);
      console.log("Message saved successfully!");
    } catch (e) {
      console.log("Error saving message:", e);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Save a Message to Firestore</h1>

      <form onSubmit={handleSave} className="flex flex-col space-y-4">
        <label className="text-lg font-semibold">Enter Message:</label>
        <input
          type="text"
          ref={messageRef}
          placeholder="Type your message here"
          className="p-2 border border-gray-400 rounded-md w-64"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default MessageFormPage;
