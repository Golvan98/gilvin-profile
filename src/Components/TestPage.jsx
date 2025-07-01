import React, { useRef } from 'react';
import { firestore } from "../firebase.js";
import { addDoc, collection } from "@firebase/firestore";

function MessageFormPage() {
  const messageRef = useRef();
  const ref = collection(firestore, "messages");



  return (
    <body className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  ha ha ha
    </body>
  );
}

export default MessageFormPage;
