import styles from './Menu.css'

const MenuBar = () => {
  return(
    <div>
    <div class="nav">
      <input type="checkbox"/>
      <use xlink:href="#menu"/><use xlink:href="#menu"/>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg">
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 56" id="menu">
    <path d="M48.33,45.6H18a14.17,14.17,0,0,1,0-28.34H78.86a17.37,17.37,0,0,1,0,34.74H42.33l-21-21.26L47.75,4"/>
  </symbol>
</svg>
</div>
    )
}

export default MenuBar