import { Link, useParams } from "react-router"
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";

type Recipe = {
  id: number;
  name: string;
  image: string;
  rating: number;
  cuisine: string;
  mealType: string[];
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  reviewCount: number;
  tags: string[]
};

function Details() {

  const [recipes, setRecipe] = useState<Recipe[]>([]);

  const fetchAllRecipe = async () => {
      const res = await fetch("https://dummyjson.com/recipes?limit=50");
      if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
      const data = await res.json();
      setRecipe(data?.recipes);
  }

  useEffect(()=> {
    fetchAllRecipe()
  },[])
  const {id} = useParams()
  const recipe = recipes.find(recipe=> recipe.id === Number(id));


  

  return (
    <div className="">
      <div className="bg-stone-900">
        <div className="container h-[80px] sm:h-[60px]  flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link to={'/'} className="text-white text-2xl"><FaArrowLeft /></Link>
            <p className="text-xl md:text-2xl text-white font-bold">{recipe?.name ? recipe.name : "Recipe Name"}</p>
            <div className="flex gap-4">
              <p className="bg-amber-600 px-2 rounded-sm text-white">{recipe?.cuisine}</p>
              <p className="bg-amber-600 px-2 rounded-sm text-white">{recipe?.difficulty}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-stone-800">
        <div className="flex flex-col items-center py-5">
          <img className="w-[20rem] my-4 rounded-2xl shadow-xl" src={recipe?.image ? recipe.image : '../src/assets/loadingimage.png'} alt={recipe?.name} />
          <div className="flex gap-2">
            <p className="text-amber-400">Rating : {recipe?.rating} ★</p> 
            <p className="text-amber-400">| {recipe?.reviewCount} Review</p>
          </div>
        </div>
      </div>
      <div className=" mp-2 bg-stone-900">
        <div className="container py-6">
          <div className="flex gap-4 flex-wrap">
            {recipe?.ingredients.map(item=> <p key={item} className="bg-amber-600 px-2 rounded-sm text-white">{item}</p>)}
          </div>
          <div className="mt-4">
              {recipe?.instructions.map((instruction, ind)=> <div 
              key={instruction}
              className="flex gap-2">
                <p className="text-amber-400 py-2"> <span className="font-semibold">STET {ind +1}</span> {instruction}</p>
              </div>)}  
          </div>  
        </div>
      </div>
    </div>
  )
}

export default Details