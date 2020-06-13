<script type="typescript">
    import {
        tick,
        onMount,
        setContext,
    } from 'svelte';

    export let name: string = ``;
    export let date: Date;
</script>

<header>
    <h1>{name}</h1>
    <h2>{date}</h2>
</header>

<style>
    header {
        color: darkred;
    }

    h1 {
        color: cornflowerblue;
    }
</style>
