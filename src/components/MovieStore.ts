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

export interface WatchList {
    imdbID: string;
}

export const moviesData = atom<Movie[]>([]);

export const watchList = atom<WatchList[]>([]);

export function addMovie(movie: Movie) {
    moviesData.set([movie, ...moviesData.get()]);
}

export function addToWatchList(imdbID: string) {
    if (!isInWatchList(imdbID)) {
        watchList.set([...watchList.get(), imdbID]);
    }
}

export function removeFromWatchList(imdbID: string) {
    const list = watchList.get();

    if (list.includes(imdbID)) {
        list.splice(list.indexOf(imdbID), 1);
        watchList.set([...list])
    }
}

export function isInWatchList(imdbID: string) {
    const list = watchList.get();
    return list.includes(imdbID);
}
