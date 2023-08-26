<script>
    import MovieCard from "./MovieCard.svelte";
    import { watchList } from "./MovieStore";

    let movieDataPromises = [];
    let movieDataArray = [];

    const api = import.meta.env.PUBLIC_OMDB_KEY;

    async function fetchMovieById(imdbID) {
        const response = await fetch(
            `https://www.omdbapi.com/?i=${imdbID}&apikey=${api}`
        );
        return await response.json();
    }

    watchList.subscribe(async () => {
        const movieIDs = watchList.get();
        movieDataPromises = await Promise.allSettled(
            movieIDs.map(fetchMovieById)
        );
        movieDataArray = movieDataPromises
            .filter((result) => result.status === "fulfilled")
            .map((result) => ({
                ...result.value,
                AddedToWatchList: true,
            }));
    });
</script>

{#if movieDataPromises && movieDataArray.length === 0}
    <div class="loading-container">
        <div class="loading-screen">
            <h3>Loading...</h3>
        </div>
    </div>
{:else if movieDataArray.length > 0}
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

<style>
    .link-card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(40vw, 1fr));
        gap: 2rem;
        padding: 0;
    }

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
</style>
