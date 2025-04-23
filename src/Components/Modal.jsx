import classes from './Modal.module.css'
import React, { useState } from 'react';
function Modal({children, onClose} )
{


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