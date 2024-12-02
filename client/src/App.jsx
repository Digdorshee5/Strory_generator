import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UploadPage from './components/Upload_page'
import Chat_gpt from './components/Chat_gpt'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <UploadPage/> */}
    <Chat_gpt/>
    </>
  )
}

export default App
