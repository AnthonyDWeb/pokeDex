// ----- Library -----
// import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { Link } from 'react-router-dom';
import React, {useState, useEffect, createContext} from 'react'
// ----- Style/CSS -----
import './App.css';
// ----- Component -----
import Home from './components/Home';
import Login from './components/Login';
import { LoginContext } from './LoginContext';

export const pokeContext = createContext([])

function App() {
  
    const [pokesave, setpokesave] = useState([])

    const [isLogged, setisLogged] = useState(false)
    const [pokemon, setPokemon] = useState(null);
    const [pokemon2, setPokemon2] = useState(null);


    // in the mound of information
    useEffect( () => {

        // search and pull pokemon's information with pokemon id=1 in {Pokemon}
        const pokesearch = async () => {
            const res = await fetch("https://pokeapi.co/api/v2/pokemon/151");
            const data = await res.json();
            setPokemon(data);
            console.log("mew -> ", data);

            const res2 = await fetch("https://pokeapi.co/api/v2/pokemon/150");
            const data2 = await res2.json();
            setPokemon2(data2);
            console.log("mewtwoo -> ", data);
        }
        pokesearch();

      },[]);
      

    const setAuth = () =>{ setisLogged(!isLogged)  }
      
    console.log('is logged -> ', isLogged)


    if (!pokemon && !pokemon2){
      return null
    }
    if (!pokemon2){
      return null
    }

    return (
      <div className="bg">
          <BrowserRouter>
              <nav className="navBar">
                <ul>
                  <li><img className="mew" src={pokemon.sprites.front_default} alt="" /></li>
                  <li><Link to ="/pokeDex">Home</Link></li>
                  {isLogged ?
                  <li onClick={setAuth}><Link to ="/login">Logout</Link></li>:
                  <li><Link to ="/login">Login</Link></li> }
                  <li><img className="mewtwoo" src={pokemon2.sprites.front_default} alt="" /></li>
                </ul>
              </nav>
                  <LoginContext.Provider value={{isLogged, setAuth}}>
                      <pokeContext.Provider value={{pokesave,setpokesave}}>
                          <Switch>
                              <Route exact path="/pokeDex" component={Home} />
                              {isLogged ? 
                              null:
                              <Route path="/login" component={Login} />
                              }

                          </Switch>
                      </pokeContext.Provider>
                  </LoginContext.Provider>
          </BrowserRouter>
      </div>
    );
}

export default App;
