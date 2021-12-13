import React from "react"
import logo from "../../assets/logo.png"
import './../css/Header.css'
import '../../layout.css'

function Header(){
    return (
        <header className='container-header flex-row'>
            <img className='logo-img' src={logo} alt='logo'/>
            <h1 className='logo-title'>Dindin</h1>
        </header>
    )
}

export default Header