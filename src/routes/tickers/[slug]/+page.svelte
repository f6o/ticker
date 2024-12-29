<script lang="ts">
	import type { PageData } from "./$types";

    let { data } : { data : PageData } = $props();
</script>


<h1>TODO {data.slug}</h1>