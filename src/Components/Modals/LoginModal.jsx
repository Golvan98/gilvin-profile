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
    <div className="w-[90vw] max-w-md h-[25vh] bg-white p-4 xs:p-2 rounded-lg flex flex-col justify-between items-center overflow-y-auto">
      
      <p className="text-center font-bold text-sm xs:text-xs mb-4 xs:mt-12 px-2">
        The "myHeadSpace" CRUD app reflects my real-time development activity.
        Signing in won't grant WRITE access to my projects, but you can explore
        the demo version <Link to="/yourHeadSpace" className="text-blue-700 underline">here</Link>.
      </p>

      <div className="flex w-full justify-between px-4 mt-4">
        <button
          onClick={onClose}
          className="hover:bg-white hover:text-black w-1/2 bg-gray-200 text-gray-700 text-sm xs:text-xs px-2 py-2 rounded mr-2 hover:bg-gray-300"
        >
          Close
        </button>

        <button
  onClick={handleGoogleLogin}
  className="flex hover:bg-white hover:text-black text-white items-center justify-center bg-blue-500 border border-gray-300 rounded px-4 py-0.5 shadow hover:bg-gray-100 transition"
>
  <img
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="Google logo"
    className="w-5 h-5 mr-3 "
  />
  <span className="text-sm  font-medium   whitespace-nowrap">Sign in with Google</span>
</button>


      </div>

    </div>
  </aside>
</section>


);

}

export default LoginModal;
