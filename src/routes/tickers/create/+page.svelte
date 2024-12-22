<script lang="ts">
	import type { PageData, ActionData } from "./$types";
    let {data, form}: {data: PageData, form: ActionData} = $props()
</script>

<main class="container">
<h2>ティッカーを作成する</h2>
<form method="post" action="/tickers/create">
    <label for="Lname">ティッカーの名前 (URLの一部になります)</label>
    {#if form?.alreadyTaken}
        <input type="input" name="name" id="Lname" aria-invalid="true" aria-describedby="invalid-name"/>
        <small id="invalid-name">既に取得されています</small>
    {:else}
        <input type="input" name="name" id="Lname"/>
    {/if}
    <label for="Lphrase">管理画面用パスフレーズ</label>
    <input type="input" name="phrase" id="Lphrase" />
    <button type="submit">作成する</button>
</form>
</main>