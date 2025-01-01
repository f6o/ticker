<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" />
</svelte:head>

<script lang="ts">
	import type { PageData } from "./$types";

    let { data }: { data : PageData } = $props();
</script>

<div class="container">
{#if data.isAuthenticated}
<h1>設定画面</h1>
<h2>情報</h2>
<h2>レイアウト情報</h2>
{:else}
<h1>パスフレーズを入力してください</h1>
<form method="POST" action="/tickers?/auth">
<input type="hidden" name="name" value="{data.slug}" />
<input name="phrase" required />
<button type="submit">確認</button>
</form>
{/if}
</div>
