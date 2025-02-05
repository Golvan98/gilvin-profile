import classes from './MainHeader.module.css';

function MainHeader() {
  return (


    <div className="fixed inset-0 bg-deepPurple">
     
      <header className="text-3xl font-bold flex justify-between p-3">
        <h1 className="text-lightCyan items-center ">Gilvin🧑‍💻</h1>
        <h1 className="text-lightCyan flex justify-betweenitems-center ">☰</h1>
      </header>

      {/* Full-Screen Section */}
      <div id="section1" className="h-screen flex items-center justify-center bg-deepPurple text-white">
        <h2 className="text-4xl">Section 1</h2>
      </div>
dada
    </div>
  );
}

export default MainHeader;
