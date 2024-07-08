import Image from "next/image";
import Data from "./data/page"
import Singup from'./pages/signup'
import Login from'./pages/login'


export default function Home() {

  return (
    <section className="text-gray-600 body-font h-100vh">
           <Data/>
           <Singup/>
           <Login/>



    </section>

  );
}
