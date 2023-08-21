<script>
    import MovieCard from "./MovieCard.svelte";
    import { moviesData } from "./MovieStore";
</script>

<ul role="list" class="link-card-grid">
    {#each $moviesData as MovieData}
        <MovieCard {MovieData} />
    {/each}
</ul>

<style>
    .link-card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(40vw, 1fr));
        gap: 2rem;
        padding: 0;
    }
</style>
