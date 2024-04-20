import { FunctionalComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";
import { QuoteResponse } from "../types.ts";
import { Signal } from "@preact/signals"
import {useEffect, useState} from "preact/hooks"

type Props = {
    quote:Signal<QuoteResponse>
}


const Quotes:FunctionalComponent<Props> = () => {
    const [quote,setQuote] = useState<string>(""); 
    const [quotes,setQuotes] = useState<QuoteResponse[]>([])
    const [page,setPage] = useState<number>(1); 
    const [end,setEnd] = useState<boolean>(false); 

    useEffect(()=>{
        fetchQuotes(quote,page); 
    },[quote,page])

    
    const fetchQuotes = async(quote:string,page:number) => {
        const response = await fetch(`https://fernandomur-random-data-72.deno.dev/quotes?query=${quote}&page=${page}`);
        const data:QuoteResponse[] = await response.json();
        if(data.length === 0){
            setEnd(true); 
            setQuotes([]);
        }else{
            setQuotes(data);
            setEnd(false);
        }
    }
    return(
        <div>
        <input class="busqueda" placeholder={"Buscar frase"} onInput={(e)=>setQuote(e.currentTarget.value)} value ={quote}></input>
            <div>
                {quotes.map((e)=>(
                    <>
                    <h2>#{e.id}.-{e.quote}</h2>
                    </>
                ))}
                {end && (<h3>No hay más frases</h3>)}
            </div>
           
        <button class="boton1" onClick={()=> setPage(page - 1)}>Anterior</button>
        <button class="boton2" onClick={()=> setPage(page + 1)}>Siguiente</button>
        
        </div>
    ); 
}

export default Quotes; 