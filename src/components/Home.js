// ----- Library -----
import React, {useState, useEffect, useContext} from 'react'
// ----- Style/CSS -----
import '../App.css';
// ----- Component -----
import { LoginContext } from '../LoginContext';
import { pokeContext } from '../App'



const Home = () => {
    const {pokesave, setpokesave} = useContext(pokeContext)
    const {isLogged} = useContext(LoginContext)
    const [pokemon, setPokemon] = useState(null);

    // in the mound of information
    useEffect( () => {
        
        // search and pull pokemon's information with pokemon id=1 in {Pokemon}
        const pokesearch = async () => {
            
            if (isLogged) {
                const res = await fetch("https://pokeapi.co/api/v2/pokemon/1");
                const data = await res.json();
                setpokesave([...pokesave,{...data}])
                console.log(data)
                setPokemon(data);
            }         
        }
        !pokemon && pokesearch();
        
    },[isLogged,pokesave,setpokesave]);

    console.log('pokesave -> ', pokesave)

    // pull pokemon's information with pokemon id=randomId in {Pokemon}
    const randomPokemon = async() => {
        let randomId = Math.floor(Math.random() * 151) + 1;
        const indexPokelist = pokesave.findIndex( pokemon => pokemon.id === randomId) ;

        if (indexPokelist === -1) {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            const data = await res.json();
            setpokesave([...pokesave,{...data}])
            setPokemon(data);
        } else {
            setPokemon(pokesave[indexPokelist]);
        }
    }

    if (isLogged === false){
        console.log("home is logged", isLogged)
        return <>
            <h3 className="loginAlert">Please Login</h3>
            <p>Username must have 15 character max</p>
            <p>password must have 6 character min</p>
        </>
    } 

    if (!pokemon){
        return null
    }
    
    let shiny =  Math.floor(Math.random() * 100) + 1;
    console.log("shiny ->" , shiny)

 

    return (
        
        <div className="mainContaint">
                <h1 className="mainTitle">Home</h1>      
                <div className="pokinfo">
                    <p>Id : {pokemon.id}</p>
                    <p>Name : {pokemon.name}</p>
                    <p>height : {pokemon.height}</p>
                    <p>Weight : {pokemon.weight}</p>
                    {pokemon.types.map((types, index) => <p key={index}>Type {index +1}: {types.type.name}</p> )}
                </div>
                <div className="pokimage">
                    <div>
                        {shiny === 10 ? 
                        <div> 
                        <img className="img-pokemon" src={pokemon.sprites.front_shiny}  alt="shinyImg"/> 
                        <p> Catch it ! He's a Shiny and very rare !! </p>
                        </div> :  
                        <img className="img-pokemon" src={pokemon.sprites.front_default}  alt="notShinyImg" />}
                    </div>
                    <button className="btn-retry" onClick={randomPokemon}>Try again !</button>
                </div> 
        </div>
    )
}

export default Home;