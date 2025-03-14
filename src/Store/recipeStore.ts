import { create } from 'zustand'

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

interface RecipeResponse {
  recipes: Recipe[];
}

interface RecipeState {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  getRecipes: (filterKey: string) => Promise<void>;
}

const recipeStore = create<RecipeState>((set) => ({
  recipes: [],
  setRecipes: (recipes) => set({ recipes }),
  getRecipes: async (filterKey: string) => {
      try {
        const res = await fetch("https://dummyjson.com/recipes?limit=50");
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        const data : RecipeResponse = await res.json();
        if(filterKey === 'All'){
          set({ recipes: data.recipes });
        }else if(filterKey === 'saved') {
          const savedRecipeIDString = localStorage.getItem('saved');
          if(savedRecipeIDString){
            const savedRecipeIDArr = JSON.parse(savedRecipeIDString);
            const savedRecipes = data.recipes.filter((item:Recipe)=> savedRecipeIDArr.includes(item.id));
            set({recipes: savedRecipes})
          }
        }
         else {
          const filteredRecipes = data.recipes.filter(
            (recipe) => recipe.cuisine === filterKey
          );
          set({ recipes: filteredRecipes });
        }
      } catch{
        throw new Error("Somthing is wrong");
      }
  },
}));

export default recipeStore;

