export interface SearchPodcaster {
  id: string;
  name: string;
  photoURL: string;
}

export interface SearchPodcast {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  category: string;
  createdAt: string;
}

export interface SearchResult {
  podcasts: SearchPodcast[];
  podcasters: SearchPodcaster[];
}
