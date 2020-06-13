<script type="typescript">
    import {
        tick,
        onMount,
        setContext,
    } from 'svelte';

    import { getDate } from "./data";
    import Header from "./Header.svelte";

    export let name: string = ``;
</script>

{#await getDate()}
    Loading
{:then date}
    <Header
        {name}
        {date} />
{:catch error}
    Error! {error}
{/await}
