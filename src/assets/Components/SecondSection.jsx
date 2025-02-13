import classes from './SecondSection.module.css';

function secondSection ()
{
    return (
        <section id="section2" className="h-1/2 w-full flex items-center justify-center bg-deepPurple text-white">
          <article class=" w-4/5 bg-red-300 h-full border border-white"> 
          
              <figure id="figure1" className={`${classes.figure1Big}  h-auto flex-nowrap`} >
                    <div className="w-full h-auto text-4xl flex items-center justify-center my-4">What We Do Echoes in Eternity</div>
                    <div className="w-full h-auto text-2xl flex items-center justify-center my-4">
                    <p className={`w-1/2 ${classes.figure2Small}`}>What we post online echoes throughout the information super highway. Let us build something worth preserving</p>
                    </div>
              </figure>

              <figure className="w-full h-2/5 bg-deepPurple">

                <div className="w-full h-1/5 flex items-center justify-center text-4xl"> 
                I Revel In 
                </div>

                <div className="mt-4 w-full h-2/5  flex items-center justify-center text-4xl space-x-4">

                    <p className="w-1/6 h-full flex items-center justify-center">
                    <img src="https://i.imgur.com/QM2COh0.png" className="object-contain w-full h-full" alt="Example" /> 
                    </p>

                    <p className="w-1/6 h-full flex items-center justify-center"> 
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1969px-Laravel.svg.png" className="object-contain w-full h-full" alt="Example" /> 
                    </p>

                    <p className="w-1/6 h-full flex items-center justify-center">
                    <img src="https://i.imgur.com/IYs1fa4.png" className="object-contain w-full h-full" alt="Example" /> 
                    </p>
                
                </div>
              </figure>
        
          </article>

      </section>




    );



}

export default secondSection;