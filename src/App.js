import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js'
import './reset.css'
import Main from './components/Main.js'

function App() {
  return (
    <div className="App">
      <div id="blur">
        <Header/>
        
      </div> 
      <Main />
    </div>
  );
}

export default App;
