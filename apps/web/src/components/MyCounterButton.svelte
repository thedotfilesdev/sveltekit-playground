<script lang="ts">
  export let counter = 0;

  function clickCounter() {
    counter++;
  }
</script>

<button on:click={clickCounter}>{counter}</button>
