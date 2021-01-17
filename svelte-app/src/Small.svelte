<script lang="typescript">
  import { createEventDispatcher } from "svelte";
  import { SmallModel } from "./small.model";

  export let model: SmallModel = new SmallModel({ myVar: 10 });
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
  <p>My variable is {model.myVar}. Number of clicks is {numClicks}</p>
  <button on:click={onClick}>Click me</button>
  {#if model.extraContent}
    {@html model.extraContent}
  {/if}
</div>

<style>
  .wrapper {
    background-color: blue;
  }
  p {
    color: white;
  }
</style>
