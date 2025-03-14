import { useEffect, useRef, useState } from "react"
import { Link } from "react-router";

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

function SearchBox() {
  
  const [showSugetion, setShowSugetion] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<Recipe[]>([]);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);

  
  // console.log(searchResult);
  const fetchSearch = async (input:string)=> {
  const res = await  fetch(`https://dummyjson.com/recipes/search?q=${input}`);
  if(!res.ok){
    throw new Error("Somthing is wrong, data is not being featchd successfully");
  }
  const data = await res.json();
    if(input.length > 1){
      setSearchResult(data?.recipes)
    }
  } 

  useEffect(()=>{
    const time = setTimeout(() => {
      fetchSearch(searchInput);
    }, 300);
    return ()=> {
      clearTimeout(time);
    }
  },[searchInput])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowSugetion(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <div ref={searchBoxRef} id="search_component" className="w-70 sm:w-85 md:w-95 relative">
      <div className="  ">
        <input
          type="text"
          className={`border border-gray-400 p-2 rounded-2xl focus:outline-none w-full bg-stone-900 text-white`}
          placeholder="Search Google Clone"
          onFocus={() => setShowSugetion(true)}
          value={searchInput}
          onChange={(e)=>setSearchInput(()=> e.target.value)}
        />
        <ul className={`absolute top-full z-50 w-full bg-stone-800 ${searchResult.length > 0 ? 'border border-gray-600' : 'border-none'} mt-2 rounded-md ${!showSugetion ? "hidden" : ""}`}>
        {searchResult.map(item=> (<Link to={`/${item.id}`} key={item.id}
         className={"text-gray-400 block py-1 px-2 rounded-sm cursor-pointer transition-colors ease-in duration-200 hover:bg-gray-700 border-b border-gray-500"}>{item.name}</Link>))}
        </ul>
      </div>
    </div>
  )
}

export default SearchBox 

{/* <ul className={`text-left p-2 overflow-auto top-full w-full absolute left-0 mt-1 z-50 ${!showSugetion ? "hidden" : ""}`}>
         {searchResult.map(item=> (<Link to={`/${item.id}`} key={item.id} 
         className={" text-gray-400 block py-1 px-2 rounded-sm cursor-pointer transition-colors ease-in duration-200 hover:bg-gray-700 "}>{item.name}</Link>))}
        </ul> */}