<script lang="ts">
    import MovieCard from "./MovieCard.svelte";
    import { moviesData, isInWatchList } from "./MovieStore";
    import type { Movie } from "./MovieStore";

    let movies: readonly Movie[];
    let moviesInWatchList: Movie[];

    $: {
        const filteredMovies = movies
            ? movies.filter((movie) => !movie.Error)
            : [];
        moviesInWatchList = filteredMovies.map((movie) => {
            return { ...movie, AddedToWatchList: isInWatchList(movie.imdbID) };
        });
    }

    moviesData.subscribe((value) => {
        movies = value;
    });
</script>

{#if movies && movies.length > 0}
    {#if !movies[0].Error}
        <ul role="list" class="link-card-grid">
            {#each moviesInWatchList as movieData}
                <MovieCard {movieData} />
            {/each}
        </ul>
    {:else}
        <div class="error-container">
            <div class="error-screen">
                <h3>
                    Unable to find what you’re looking for. Please try another
                    search.
                </h3>
            </div>
        </div>
    {/if}
{:else}
    <div class="explore-container">
        <div class="explore-screen">
            <img src="/movie-icon.svg" alt="" />
            <h3>Start exploring</h3>
        </div>
    </div>
{/if}

<style>
    .explore-container,
    .error-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 70vh;
    }

    .explore-screen,
    .error-screen {
        text-align: center;
        padding: 1em;
    }

    .explore-screen > * {
        margin-bottom: 0;
    }

    .explore-screen h3 {
        margin-top: 0.25em;
        color: #2e2e2f;
    }

    .error-screen {
        min-width: 5vw;
        max-width: 400px;
    }

    .error-screen h3 {
        margin: 0;
    }

    .link-card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(40vw, 1fr));
        gap: 2rem;
        padding: 0;
    }

    :global(.link-card-grid:has(.movie-card:hover) .movie-card:not(:hover)) {
        scale: 0.98;
        opacity: 0.7;
    }
</style>
