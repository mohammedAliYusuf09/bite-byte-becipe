import { lazy, Suspense, useEffect, useState } from "react"
import SearchBox from "../components/SearchBox"
import recipeStore from "../Store/recipeStore"
import { FaArrowLeft,FaArrowRight  } from "react-icons/fa6";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
const Recipes = lazy(() => import('../components/Recipes'));



type Filter = string[];

const Home = () =>  {
  const filterItems : Filter = ['All', 'Italian', 'Asian', 'Pakistani', 'saved']
  const {recipes, getRecipes} = recipeStore();
  const [category , setCategory] = useState(filterItems[0]);
  const [curentPage, setCurentPage] = useState(0);

  useEffect(()=> {
    getRecipes(category);
    if(!localStorage.getItem('saved')){
      localStorage.setItem('saved', JSON.stringify([]));
    }
  },[category, recipes])

  const handelFilter = (indx:number) => {
    setCategory(filterItems[indx]);
    setCurentPage(0);
  }   

  const maxRecipe = 8;
  const pageNumber = Math.ceil(recipes.length / maxRecipe);
  const pageButtons = Array.from({ length: pageNumber }, (_, i) => i);
  
  const startPage = curentPage * maxRecipe;
  const endPage = startPage + maxRecipe;

  const handelPageButtonClick = (page:number) => {
    setCurentPage(page)
  }

  const handelNextButtonClick = () =>{
    setCurentPage((p)=> p + 1);
  }
  const handelPrivioustButtonClick = () =>{
    setCurentPage((p)=> p - 1);
  }
  
  return (
    <>
      <NavBar/>
      <div className="bg-stone-800">
      <div className="container text-white flex flex-col items-center gap-4 py-10">
        <img className="w-15 sm:w-18 md:w-20" src="./public/rcp-logo.png" alt="logo" />
        <SearchBox/>
      </div>
        {/*  filter settion  */}
        <div className="container py-3 -z-10">
          <ul className="flex text-gray-300 gap-6">
            {filterItems.map((filter, indx)=> (<li key={filter} className={`font-extralight cursor-pointer border-b  transition ease-in duration-200 hover:border-amber-50  hover:text-amber-50 ${filter === category ? 'border-amber-50 text-amber-50' : 'border-stone-800 text-gray-300'}`} onClick={()=>handelFilter(indx)}>{filter}</li>))}
          </ul>
        </div>

        {/* recipe list  */}
        <div className="container py-3 z-0 min-h-[80vh]">
        <Suspense fallback={<Loading/>}>
          <Recipes recipes={recipes} startPage={startPage} endPage={endPage}/>
        </Suspense>
            <div className="flex justify-center py-6">
              <div className="flex flex-wrap gap-4">
              <button disabled={curentPage < 1} className={` px-3 py-1 cursor-pointer flex items-center justify-center ${curentPage < 1 ? 'bg-stone-600' : 'bg-gray-400'}`} onClick={handelPrivioustButtonClick}><FaArrowLeft />
              </button>
                {pageButtons.map(item=> (<span className={` px-3 py-1 cursor-pointer hover:bg-amber-50 transition-colors ease-in duration-200 ${item === curentPage ? 'bg-amber-50' : 'bg-gray-400'} `}  key={item} onClick={() =>handelPageButtonClick(item)}>{item}</span>))}
                <button disabled={curentPage === pageButtons.length-1} className={` px-3 py-1 cursor-pointer flex items-center justify-center ${curentPage === pageButtons.length-1 ? 'bg-stone-600' : 'bg-gray-400'}`} onClick={handelNextButtonClick}><FaArrowRight />
              </button>
              </div>
            </div>
        </div>
      </div>
    </>
    
  )
}

export default Home

// {/* recipe list  */}
// <div className="container py-3 z-0 min-h-[80vh]">
// {recipes.length < 1 ? <div className="flex items-center justify-center ">
//   <h1>Loading...</h1>
// </div> 
// : 
// <>
// <Recipes recipes={recipes} startPage={startPage} endPage={endPage}/>
//   <div className="flex justify-center py-6">
//     <div className="flex flex-wrap gap-4">
//     <button disabled={curentPage < 1} className={` px-3 py-1 cursor-pointer flex items-center justify-center ${curentPage < 1 ? 'bg-stone-600' : 'bg-gray-400'}`} onClick={handelPrivioustButtonClick}><FaArrowLeft />
//     </button>
//       {pageButtons.map(item=> (<span className={` px-3 py-1 cursor-pointer hover:bg-amber-50 transition-colors ease-in duration-200 ${item === curentPage ? 'bg-amber-50' : 'bg-gray-400'} `}  key={item} onClick={() =>handelPageButtonClick(item)}>{item}</span>))}
//       <button disabled={curentPage === pageButtons.length-1} className={` px-3 py-1 cursor-pointer flex items-center justify-center ${curentPage === pageButtons.length-1 ? 'bg-stone-600' : 'bg-gray-400'}`} onClick={handelNextButtonClick}><FaArrowRight />
//     </button>
//     </div>
//   </div>
// </>
// }

