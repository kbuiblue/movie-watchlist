<script>
    export let movieData;

    import {
        addToWatchList,
        removeFromWatchList,
    } from "./MovieStore";

    let Poster,
        Title,
        imdbRating,
        Runtime,
        Genre,
        Plot,
        imdbID,
        AddedToWatchList;

    $: if (movieData) {
        ({
            Poster,
            Title,
            imdbRating,
            Runtime,
            Genre,
            Plot,
            imdbID,
            AddedToWatchList,
        } = movieData);
    }

    function toggleWatchList() {
        AddedToWatchList = !AddedToWatchList;
        if (AddedToWatchList) {
            addToWatchList(imdbID);
        } else {
            removeFromWatchList(imdbID);
        }
    }
</script>

<li class="movie-card">
    <a href="/movie-details">
        <img class="movie-poster" alt="" src={Poster} />
    </a>
    <div class="movie-info">
        <a href="/movie-details">
            <div class="top-info">
                <h2>{Title}</h2>
                <img class="star-icon" alt="" src="/star-icon.svg" />
                <h2>{imdbRating}</h2>
            </div>
        </a>

        <div class="mid-info">
            <p>{Runtime}</p>
            <p>{Genre}</p>
            <div
                on:click={toggleWatchList}
                on:keydown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        toggleWatchList();
                    }
                }}
                role="button"
                tabindex="0"
                class="watchlist-add"
            >
                {#if AddedToWatchList}
                    <img alt="" src="/remove-icon.svg" />
                    <p>Remove from Watchlist</p>
                {:else}
                    <img alt="" src="/add-icon.svg" />
                    <p>Add to Watchlist</p>
                {/if}
            </div>
        </div>
        <p class="plot">{Plot}</p>
    </div>
</li>

<style>
    .movie-card {
        list-style: none;
        display: grid;
        grid-template-columns: 8em 2em 1fr;
        grid-template-areas: "poster . info";
        padding: 2em 3em;
        background-color: #23262d;
        background-image: none;
        background-size: 400%;
        border-radius: 0.5em;
        background-position: 100%;
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        user-select: none;
    }

    .movie-card .movie-poster {
        grid-area: poster;
        max-width: 8em;
        max-height: 240px;
    }

    :global(a:has(> img)) {
        display: flex;
        align-items: center;
        min-height: 25vh;
        max-height: 240px;
    }

    .movie-info {
        grid-area: info;
        display: flex;
        min-height: 100%;
        flex-direction: column;
        justify-content: center;
    }

    .movie-info,
    .movie-info a {
        color: white;
        text-decoration: none;
        line-height: 1.4;
    }

    .movie-info > div {
        margin-bottom: 1em;
    }

    .top-info {
        display: flex;
        width: fit-content;
        justify-content: space-around;
        cursor: pointer;
        font-size: 1rem;
        max-height: 3em;
        margin: 0;
    }

    .top-info > * {
        margin: 0;
    }

    .top-info .star-icon {
        margin: 0 0.75em;
    }

    .mid-info {
        display: flex;
        font-size: 1rem;
        justify-content: flex-start;
        gap: 2em;
    }

    .watchlist-add {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        gap: 0.5em;
        cursor: pointer;
    }

    .watchlist-add:active {
        transform: scale(0.9);
        color: rgb(var(--accent-light));
    }

    .plot {
        margin: 0;
        font-size: 1rem;
    }

    .movie-card {
        transition: scale 350ms ease, opacity 350ms linear;
    }

    .movie-card:is(:hover) {
        box-shadow: inset 0 0 0 2px rgba(var(--accent-light), 50%);
    }
</style>
