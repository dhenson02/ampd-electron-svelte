<script>
    import {
        tick,
        onMount,
        setContext,
    } from 'svelte';

    export let name = ``;
</script>

<header>
    <h1>{name}</h1>
    <h2>{new Date()}</h2>
</header>

<style>
    header {
        color: darkred;
    }

    h1 {
        color: cornflowerblue;
    }
</style>
