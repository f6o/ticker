<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" />
</svelte:head>

<script lang="ts">
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

    function resetWins() {
        player1Wins = 0;
        player2Wins = 0;
    }

    if ( data.isAuthenticated ) {
        const ref = getTickerRef(data.slug);

        loading = 'loading'
        onValue(ref, (snapshot) => {
            let { info } = snapshot.val();
            centerText = info.centerText;
            player1Name = info.p1.name;
            player2Name = info.p2.name;
            player1Wins = info.p1.wins;
            player2Wins = info.p2.wins;
            loading = '';
        }, {
            onlyOnce: true
        })
    }
</script>

<div class="container">
{#if data.isAuthenticated}
<h1>設定画面</h1>
<h2>情報</h2>
{#if loading}
<div>
    <p aria-busy="true">情報取得中...</p>
</div>
{:else}
<form method="POST" action="/tickers?/update">
<input type="hidden" name="name" value="{data.slug}" />
<div class="grid">
    <div>
        <!-- svelte-ignore a11y_no_redundant_roles -->
        <fieldset role="group">
            <input name="player1" id="Lplayer1" bind:value={player1Name} />
            <input name="player1wins" type="number" bind:value={player1Wins} />
        </fieldset>
    </div>
    <div>
        <input name="centerText" id="LcenterText" bind:value={centerText} />
    </div>
    <div>
        <!-- svelte-ignore a11y_no_redundant_roles -->
        <fieldset role="group">
            <input name="player2" id="Lplayer2" bind:value={player2Name} />
            <input name="player2wins" type="number" bind:value={player2Wins} />
        </fieldset>
    </div>
</div>
<div class="grid">
    <div>
        <!-- filler -->
    </div>
    <div>
        <button type="button" class="secondary" onclick={resetWins}>勝利数リセット</button>
    </div>
    <div>
        <button type="submit">更新</button>
    </div>
</div>
</form>
{/if}
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
