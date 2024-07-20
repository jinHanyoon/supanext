import Image from "next/image";
import Data from "./data/page"
import Singup from'./signUp/signup'
import LoginForm from './login/page'
import Sidebar from './component/sidebar/page'


export default function Home() {

  
  return (
    <section className="text-gray-600 body-font h-100vh">
      <Sidebar/>         
           <Data/>

    </section>

  );
}
