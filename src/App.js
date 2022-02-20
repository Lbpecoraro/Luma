import React from 'react'
import NavBar from './components/NavBar'
import './App.scss'
import ItemListContainer from './components/ItemListContainer'

const App = () => {
  return (
    <div className="appContainer">
      <NavBar />
    <main className="main">
      <ItemListContainer/>
    </main>
    </div>
  )
}

export default App