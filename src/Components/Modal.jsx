import classes from './Modal.module.css'
import React, { useState, useEffect } from 'react';
function Modal({children, onClose} )
{
    useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Attach event listener when modal mounts
    document.addEventListener('keydown', handleKeyDown);

    // Clean up when modal unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
     }, [onClose]);

    return (

        <>
                    <div className={classes.backdrop} onClick={onClose} />
                    <div open className={classes.modal}>
                        {children}
                    </div>
        </>

    );



}

export default Modal;