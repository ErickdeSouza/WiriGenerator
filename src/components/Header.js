import React, { useState } from 'react'
import sytles from './Header.css'
import Cat from './Cat'
import MenuBar from './Menu'

const Header = () => {
  const Buttom = ({target}) => {
     return(
       <MenuBar />
       )
}
const [caton, setCaton] = useState(false)
 const LiCat = () => {
    setCaton(!caton);
  }
  
  
  return(
    <div className="fds">
      <header className="headerp">
        <h2>Wiriless</h2>
        <Buttom target={LiCat}/>
        {caton && <Cat className="Cat"/>}
      </header>
    </div>
    );
};

export default Header