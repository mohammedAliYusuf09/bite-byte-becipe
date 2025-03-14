import { Link } from "react-router";
import { BsSave2 } from "react-icons/bs";

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

interface Prop {
  recipe: Recipe,
}

function RecipeBox({recipe} :Prop) {

  const saveRecipeTolocalStorage = (id:number) => {
    const savedList:string | null = localStorage.getItem("saved");
    if(savedList){
      const savedRecipe =  JSON.parse(savedList);
      if(!savedRecipe.includes(id)){
        savedRecipe.push(id);
        localStorage.setItem('saved', JSON.stringify(savedRecipe))
      }else{
        const savedAfterDelete = savedRecipe.filter((item:number)=> item !== id)
        localStorage.setItem('saved', JSON.stringify(savedAfterDelete));
      }
    }
  }

  // is it saved
  const isSaved = (id:number) => {
    const savedList:string | null = localStorage.getItem("saved");
    if(savedList){
      const savedRecipe =  JSON.parse(savedList);
      return savedRecipe.includes(id)
    }
  }
  
  return (
    <div className='flex flex-col rounded-xl bg-gray-200 overflow-hidden relative'>
      <img className="h-50 cover" src={recipe.image ? recipe.image : './src/asets/loadingimage.png'} alt={recipe.name}/>
      <div className="p-2">
        <h5 className="text-lg font-semibold">{recipe.name}</h5>
        <Link to={`/${recipe.id}`} className="font-light cursor-pointer">Read more</Link>
      </div>
      <span className={` ${isSaved(recipe.id) ? 'text-blue-400' : 'text-stone-900'} absolute bottom-2 right-2 cursor-pointer`} onClick={()=>saveRecipeTolocalStorage(recipe.id)}><BsSave2 /></span>
    </div>
  )
}

export default RecipeBox