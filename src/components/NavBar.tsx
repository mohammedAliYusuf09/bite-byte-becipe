import { Link } from "react-router"


function NavBar() {
  return (
    <div className=" bg-stone-900">
      <div className="container sm:px-0 flex justify-between h-[40px] sm:h-[50px]  items-center text-white">
      <Link className="text-xl sm:text-2xl" to={'/'}>Bite Byte Recipe </Link>
      <div className="">
        <button className="border border-amber-50 px-2 rounded-full mr-4">Login</button>
        <button className="border px-2 rounded-full bg-amber-50 text-stone-900">Sign Up</button>
      </div>
      </div>
    </div>
    
  )
}

export default NavBar