import Image from "next/image";
import Data from "./data/page"

export default function Home() {

  return (
    <section className="text-gray-600 body-font h-100vh">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
           <Data/>


    </div>
    </div>
    </section>

  );
}
