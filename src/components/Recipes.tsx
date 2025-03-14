import RecipeBox from "./RecipeBox";

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
  recipes: Recipe[],
  startPage: number,
  endPage: number
}


function Recipes({recipes, startPage, endPage}:Prop) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 md:gap-5">
          {recipes.slice(startPage, endPage).map(recipe=> <RecipeBox key={recipe.id} recipe={recipe}/>)}
    </div>
  )
}

export default Recipes