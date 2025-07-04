import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Sentiment from './pages/Sentiment'
import QuestionAsnwering from './pages/QuestionAsnwering'

import { Toaster } from 'react-hot-toast'
import Summarization from './pages/Summerization'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Sentiment/>} />
          <Route path='/text-summarization' element={<Summarization/>} />
          <Route path='/context-answering' element={<QuestionAsnwering/>} />
        </Routes>
      </BrowserRouter>
      <Toaster/>
    </div>
  )
}

export default App
