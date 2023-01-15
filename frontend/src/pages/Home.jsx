import React from "react"
import Log from "../components/Log"
import '../style/Home.css'
import logo from '../images/Sphere.png'

function Home() {
  return (
    <div>
      <h1>Bienvenue</h1>

      <div id='logo'>
        <div className="img-container">
          <img src={logo} alt='Logo'/>
        </div>
      </div>
      <Log signup={false} login={true} />
    </div>
  )
}

export default Home