import classes from '../Modal.module.css';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase'; // adjust path if needed
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


function LoginModal({ onClose }) {

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in as:", user.displayName);
      onClose();
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  return (
  <section className={`${classes.backdrop} text-lg xs:text-sm md:text-base lg:text-lg`}>
    <aside className={classes.modal}>
      <div className="w-[90vw] max-w-md h-[40vh] bg-white p-4 xs:p-2 rounded-lg flex flex-col justify-center items-center overflow-y-auto">
        
        <p className="text-center font-bold text-sm xs:text-xs mb-4 xs:mt-20">
          This personal CRUD app reflects my real-time development activity.
          Signing in won't grant edit access to my projects, but you can explore
          the demo version <Link to="/yourHeadSpace" className="text-blue-700 underline">here</Link>.
        </p>

        <button
          onClick={handleGoogleLogin}
          className="bg-indigo-700 text-white text-sm px-4 py-2 xs:text-xs xs:px-2 xs:py-1 rounded mb-2"
        >
          Sign in with Google
        </button>

        <button
          onClick={onClose}
          className="text-xs underline text-gray-600"
        >
          Close
        </button>

      </div>
    </aside>
  </section>
);

}

export default LoginModal;
