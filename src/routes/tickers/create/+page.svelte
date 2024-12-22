<script lang="ts">
	import { deserialize } from "$app/forms";
	import { invalidate } from "$app/navigation";
	import type { ActionResult } from "@sveltejs/kit";

async function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await fetch(event.currentTarget.action, {
        method: 'POST',
        body: data
    });
    const result: ActionResult = deserialize(await response.text());

    // TODO
}
</script>

<main class="container">
<h2>ティッカーを作成する</h2>
<form method="POST" action="/api/tickers/create" onsubmit={handleSubmit}>
    <label for="Lname">ティッカーの名前 (URLの一部になります)</label>
    <input type="input" name="name" id="Lname" aria-invalid="true" aria-describedby="invalid-name"/>
    <small id="invalid-name">既に取得されています</small>
    <input type="input" name="name" id="Lname"/>
    <label for="Lphrase">管理画面用パスフレーズ</label>
    <input type="input" name="phrase" id="Lphrase" />
    <button type="submit">作成する</button>
</form>
</main>