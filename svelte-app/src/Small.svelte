<script lang="typescript">
  import { createEventDispatcher } from "svelte";

  export let myVar: number = 10;
  let numClicks: number = 0;

  const dispatch = createEventDispatcher();

  function reportEvent() {
    dispatch("smallEvent", {
      numClicks: numClicks,
    });
  }

  function onClick() {
    numClicks++;
    reportEvent();
  }
</script>

<div class="wrapper">
  <p>My variable is {myVar}. Number of clicks is {numClicks}</p>
  <button on:click={onClick}>Click me</button>
</div>

<style>
  .wrapper {
    background-color: blue;
  }
  p {
    color: white;
  }
</style>
