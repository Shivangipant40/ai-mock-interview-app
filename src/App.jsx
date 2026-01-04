
import './App.css'
import Header from './Components/Header'
import Navbar from './Components/Navbar'
import Home from './Pages.jsx/Home'
import Approutes from './routes/Approutes'

function App() {
  

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100'>
      <Header/>
      <Approutes />
        
    </div>
  )
}

export default App
