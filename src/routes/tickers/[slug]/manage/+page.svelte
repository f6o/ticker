<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" />
</svelte:head>

<script lang="ts">
	import { enhance } from "$app/forms";
	import { getTickerRef } from "$lib/firebase";
	import type { PageData } from "./$types";

    import { onValue } from "@firebase/database";

    let { data }: { data : PageData } = $props();

    let loading = $state('init')

    let centerText = $state('');
    let player1Name = $state('');
    let player2Name = $state('');
    let player1Wins = $state(0);
    let player2Wins = $state(0);

    let backgroundColor = $state('');
    let foregroundColor = $state('');
    let textColor = $state('');
    let tickerColor = $state('');

    if ( data.isAuthenticated ) {
        const ref = getTickerRef(data.slug);

        loading = 'loading'
        onValue(ref, (snapshot) => {
            let { info, ticker } = snapshot.val();
            centerText = info.centerText;
            player1Name = info.p1.name;
            player2Name = info.p2.name;
            player1Wins = info.p1.wins;
            player2Wins = info.p2.wins;

            console.log(ticker)
            backgroundColor = ticker.backgroundColor;
            foregroundColor = ticker.foregroundColor;
            textColor = ticker.textColor;
            tickerColor = ticker.tickerColor;

            loading = '';
        }, {
            onlyOnce: true
        })
    }
</script>

<div class="container">
{#if data.isAuthenticated}
<h1>設定画面</h1>
<details open>
<!-- svelte-ignore a11y_no_redundant_roles -->
<summary role="button" class="secondary">戦績</summary>
{#if loading}
<div>
    <p aria-busy="true">情報取得中...</p>
</div>
{:else}
<form method="POST" action="/tickers?/update" use:enhance={() =>{
    loading = 'loading';
    return async ({update}) => {
        await update();
        loading = '';
    }
}}>
<input type="hidden" name="name" value="{data.slug}" />
<div class="grid">
    <div>
        <!-- svelte-ignore a11y_no_redundant_roles -->
        <label>1P側
        <fieldset role="group">
            <input name="player1" id="Lplayer1" bind:value={player1Name} />
            <input name="player1wins" type="number" bind:value={player1Wins} />
        </fieldset>
        </label>
    </div>
    <div>
        <label>中央のテキスト
        <input name="centerText" id="LcenterText" bind:value={centerText} />
        </label>
    </div>
    <div>
        <label>2P側
        <!-- svelte-ignore a11y_no_redundant_roles -->
        <fieldset role="group">            
            <input name="player2" id="Lplayer2" bind:value={player2Name} />
            <input name="player2wins" type="number" bind:value={player2Wins} />
        </fieldset>
        </label>
    </div>
</div>
<button type="submit">更新</button>
</form>
{/if}
</details>
<details>
<!-- svelte-ignore a11y_no_redundant_roles -->
<summary role="button" class="secondary">色設定</summary>
<p class="caution">自動で反映されないため、色の設定後、OBSのブラウザソースのプロパティ画面から「現在のページのキャッシュを更新」をしてください。</p>
{#if loading}
<div>
    <p aria-busy="true">情報取得中...</p>
</div>
{:else}
<form method="POST" action="/tickers?/colors" use:enhance={() =>{
    loading = 'loading';
    return async ({update}) => {
        await update();
        loading = '';
    }
}}>
    <input type="hidden" name="name" value="{data.slug}" />
    <label>
    背景色 <code>{backgroundColor}</code>
    <input type="color" name="backgroundColor" bind:value={backgroundColor} />
    </label>
    <label>
    プレイヤー名の文字色 <code>{foregroundColor}</code>
    <input type="color" name="foregroundColor" bind:value={foregroundColor} />
    </label>
    <label>
    勝利数/中央の文字色 <code>{textColor}</code>
    <input type="color" name="textColor" bind:value={textColor} />
    </label>
    <label>
    中央の背景色 <code>{tickerColor}</code>
    <input type="color" name="tickerColor" bind:value={tickerColor} />
    </label>
    <button type="submit">更新</button>
</form>
{/if}
</details>
{:else}
<h1>パスフレーズを入力してください</h1>
<form method="POST" action="/tickers?/auth">
<input type="hidden" name="name" value="{data.slug}" />
<input name="phrase" required />
<button type="submit">確認</button>
</form>
{/if}
</div>
