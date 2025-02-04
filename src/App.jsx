import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainHeader from './assets/Components/MainHeader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <MainHeader/>
    </>
  )
}

export default App
