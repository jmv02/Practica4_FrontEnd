import { Signal } from "https://esm.sh/v135/@preact/signals@1.2.2/X-ZS8q/dist/signals.js";
import { UsersResponse } from "../types.ts";

import {useEffect, useState} from "preact/hooks"
import { FunctionalComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";

type Props = {
    users:Signal<UsersResponse[]> 
}; 

const Users:FunctionalComponent<Props> = () => {
    const [name,setName] = useState<string>(""); 
    const [user,setUser] = useState<UsersResponse[]>([]); 
    const [page,setPage] = useState<number>(1); 
    const [end,setEnd] = useState<boolean>(false); 

    useEffect (()=>{
        fetchUsers(name,page);
    },[name,page]); 

    
    const fetchUsers = async(name:string,page:number) => {
        const response = await fetch(`https://fernandomur-random-data-72.deno.dev/users?query=${name}&page=${page}`);
        const data:UsersResponse[] = await response.json();
        if(data.length === 0){
            setUser([]); 
            setEnd(true);
        }else{
            setUser(data);
            setEnd(false);
        }
    }
    return(
        <div>
        <input class="busqueda" placeholder={"Buscar usuarios"} onInput={(e)=>setName(e.currentTarget.value)} value ={name}></input>
        {user && (
            <div>
            
                {user.map((e)=>(
                    <>
                    <h2>Name: {e.name}</h2>
                    <p>Alias:{e.username}</p>
                    <p>#{e.id}</p>
                    <p>Created:{e.created_at}</p>
                    </>
                ))}
                {end && (<h3>No hay más usuarios</h3>)}
            </div>
        )}
        <button class="boton1" onClick={()=> setPage(page - 1)}>Anterior</button>
        <button class="boton2" onClick={()=> setPage(page + 1)}>Siguiente</button>
        
        </div>
    ); 
}

export default Users; 