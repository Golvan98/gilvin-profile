

function ThirdSection ()
{

    return (
        <section id="section1" className="min-h-screen w-auto text-white flex-nowrap items-start space-y-16">
           <figure className=" w-full text-4xl">
                Projects Showcase
           </figure>

           <figure className="h-96  w-full text-2xl">

                <div className="h-1/3"> Needs Asssessment Survey </div>
                
                <div className="h-2/3 w-full  flex items-center justify-center"> 
                   <img src ="https://i.imgur.com/3pUhHUo.png"  className=" w-2/5 h-full object-contain w-full h-full"/>
                   <article className=" w-3/5 h-full flex-nowrap justify-start"> 
                    <div className="w-full h-4/5"> yappity yap yap yappers and yap yap yap yes imma yap more some yap yap yapy p  </div>
                    <div className="w-full h-1/5 flex justify-center items-center">  <p className="bg-white text-black w-1/6">view code here </p> </div>
                   </article>
                </div>
           </figure>


        </section>
    );
}

export default ThirdSection;