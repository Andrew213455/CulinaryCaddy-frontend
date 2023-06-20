import Recipe from "./Recipe";

interface Results {
  id: string;
  title: string;
  image: string;
}

export default interface SearchResults {
  results: Recipe[];
}
