<script lang="ts">
    import { invalidate } from '$app/navigation';
  import type { PageServerData } from './$types';

  export let data: PageServerData;
  function rerunLoadFunction() {
    invalidate('app:random');
  }
</script>

<h6>Data loaded in<br /><code>+page.ts</code></h6>
<p>{data.greeting}</p>
<button on:click={rerunLoadFunction}>Update random number</button>

