import Pokemon from "../islands/Pokemon.tsx";
import Quotes from "../islands/Quotes.tsx";
import Users from "../islands/Users.tsx";

/*const Page = () => <Pokemon />
export default Page;*/


export default function Home() {
    return (
      <div class="containerpadre">
        <div class="containerhijoizq">
        <Pokemon />
        </div>
        <div class = "containerhijodrch">
            <div class="containerhijoarriba"><Quotes/></div>
            <div class = "containerhijoabajo"><Users/></div>
        </div>
      </div>
      
      
    );
  }