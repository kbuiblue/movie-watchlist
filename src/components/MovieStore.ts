import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

export interface Movie {
    Poster: string;
    Title: string;
    imdbRating: string;
    imdbID: string;
    Runtime: string;
    Genre: string;
    Plot: string;
    Error?: string;
}

const api = (await import.meta.env.PUBLIC_OMDB_KEY) as string;

export async function fetchMovieById(imdbID: string) {
    const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=${api}`
    );
    return await response.json();
}

export const moviesData = atom<Movie[]>([]);

export const watchList = persistentAtom<Movie[]>("watchlist", [], {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export function addMovie(movie: Movie) {
    moviesData.set([movie, ...moviesData.get()]);
}

export async function addToWatchList(imdbID: string) {
    if (!isInWatchList(imdbID)) {
        const newMovie = await fetchMovieById(imdbID);
        watchList.set([newMovie, ...watchList.get()]);
    }
}

export function removeFromWatchList(imdbID: string) {
    const list = watchList.get();

    if (isInWatchList(imdbID)) {
        const removedMovie: Movie | undefined = list.find(
            (movie) => movie.imdbID === imdbID
        );
        
        if (removedMovie) {
            list.splice(list.indexOf(removedMovie), 1);
            watchList.set([...list]);
        }
    }
}

export function isInWatchList(imdbID: string) {
    const list = watchList.get();
    return list.some((movie) => movie.imdbID === imdbID);
}
