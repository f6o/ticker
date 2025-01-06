<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" />
</svelte:head>

<script lang="ts">
    const { form } = $props();
</script>

<main class="container">
    <h2>ティッカーを作成する</h2>
    <form method="POST" action="/tickers?/create">
        <label for="Lname">ティッカーの名前 (URLの一部になります)</label>
        {#if form?.isAlreadyTaken}
        <input type="input" name="name" id="Lname" required aria-invalid="true" aria-describedby="invalid-name"/>
        <small id="invalid-name">既に取得されています: {form.prevName}</small>
        {:else if form?.invalidName}
        <input type="input" name="name" id="Lname" required aria-invalid="true" aria-describedby="invalid-name"/>
        <small id="invalid-name">名前は半角英数字のみです</small>
        {:else}
        <input type="input" name="name" id="Lname" required/>
        {/if}
        <label for="Lphrase">管理画面用パスフレーズ</label>
        {#if form?.invalidPhrase}
        <input type="input" name="phrase" id="Lphrase" required aria-invalid="true" aria-describedby="invalid-phrase"/>
        <small id="invalid-phrase">パスフレーズは半角英数字のみです</small>
        {:else}
        <input type="input" name="phrase" id="Lphrase" required />
        {/if}
        <button type="submit">作成する</button>
    </form>
</main>