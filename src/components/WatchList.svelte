<script lang="ts">
    import MovieCard from "./MovieCard.svelte";
    import { watchList } from "./MovieStore";
    import type { Movie } from "./MovieStore";

    let movieDataArray: Movie[] = [];

    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
    const promise = delay(1000);

    $: {
        movieDataArray = movieDataArray.filter(
            (movie) => movie.AddedToWatchList
        );
    }

    watchList.subscribe(async () => {
        const movies = watchList.get();

        movieDataArray = movies.map((movie) => ({
            ...movie,
            AddedToWatchList: true,
        }));
    });
</script>

{#await promise}
    <div class="loading-container">
        <div class="loading-screen">
            <h3>Loading...</h3>
        </div>
    </div>
{:then}
    {#if movieDataArray.length > 0}
        <ul role="list" class="link-card-grid">
            {#each movieDataArray as movieData}
                <MovieCard {movieData} />
            {/each}
        </ul>
    {:else}
        <div class="empty-container">
            <div class="empty-screen">
                <h3>Your watchlist is looking a little empty...</h3>
                <a href="/" class="add-movies">
                    <img alt="" src="/add-icon.svg" />
                    <p>Let’s add some movies!</p>
                </a>
            </div>
        </div>
    {/if}
{/await}

<style>
    .empty-container,
    .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 70vh;
    }

    .empty-screen,
    .loading-screen {
        text-align: center;
        padding: 1em;
        min-width: 5vw;
        max-width: 400px;
    }

    .empty-screen h3 {
        margin: 0;
    }

    .add-movies {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        font-weight: 700;
        margin-top: 1.25em;
        user-select: none;
        cursor: pointer;
        color: #fff;
        text-decoration-line: none;
        min-height: 1em;
    }

    .add-movies > * {
        margin: 0;
        line-height: 0.7;
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
