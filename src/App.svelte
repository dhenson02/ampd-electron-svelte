<script type="typescript">
    import {
        tick,
        onMount,
        setContext,
    } from 'svelte';

    import Header from "./Header.svelte";

    export let name: string = ``;
</script>

<Header
    {name}
    date={new Date()} />
