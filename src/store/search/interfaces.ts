interface Podcaster {
  id: string;
  name: string;
  photoURL: string;
}

interface Series {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  createdAt: string;
}

export interface SearchState {
  searchResult: {
    series: Series[];
    podcasters: Podcaster[];
  };
  searchText: string;
}
