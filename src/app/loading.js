export default function Loading() {
    return(
      <>
      <div className="fixed w-full h-screen  bg-black/50 z-50 top-0">
      <div className=" absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">

        <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>


     </div>

</div>
</>
)
  }