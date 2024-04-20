import { Signal } from "https://esm.sh/v135/@preact/signals@1.2.2/X-ZS8q/dist/signals.js";
import { PokemonResponse } from "../types.ts";

import {useEffect, useState} from "preact/hooks"
import { FunctionalComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";

type Props = {
    pokemon:Signal<PokemonResponse[]>; 
}; 

const Pokemon:FunctionalComponent<Props> = () => {
    const [name,setName] = useState<string>(""); 
    const [pokemon,setPokemon] = useState<PokemonResponse[]>([]); 
    const [page,setPage] = useState<number>(1); 
    const [end,setEnd] = useState<boolean>(false); 

    useEffect (()=>{
        fetchPokemon(name,page);
    },[name,page]); 

    
    const fetchPokemon = async(name:string,page:number) => {
        const response = await fetch(`https://fernandomur-random-data-72.deno.dev/pokemon?query=${name}&page=${page}`);
        const data:PokemonResponse[] = await response.json();
        if(data.length === 0){
        setEnd(true);
        setPokemon([]);
        }else{
        setPokemon(data);
        setEnd(false);
     }
    }

    return(
        <div>
        <input class="busqueda"placeholder={"Buscar Pokemon"} onInput={(e)=>setName(e.currentTarget.value)} value ={name}></input>
        {pokemon && (
            <div>
                
                {pokemon.map((e)=>(
                    <>
                    <div class={`type-${e.type}`}>
                    <h2>{e.name}</h2>
                    <p>#{e.id}</p>
                    <p>Type: {e.type}</p>
                    <p>Base exp: {e.base_experience}</p>
                    </div>
                    </>
                ))}
                {end && (<h3>No hay más pokemon</h3>)}
            </div>
        )}
       
        <button class="boton1izq"onClick={()=> setPage(page - 1)}>Anterior</button>
        <button class="boton2izq"onClick={()=> setPage(page + 1)}>Siguiente</button>
        </div>
    ); 
}

export default Pokemon; 