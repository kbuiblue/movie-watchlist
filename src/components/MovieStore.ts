import { atom } from "nanostores";

export interface Movie {
    Poster: string;
    Title: string;
    imdbRating: string;
    Runtime: string;
    Genre: string;
    Plot: string;
    Error?: string;
}

export const moviesData = atom<Movie[]>([]);

export function addMovie(movie: Movie) {
    moviesData.set([movie, ...moviesData.get()]);
}