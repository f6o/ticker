<header>
    <h1>sf6ticker2</h1>
</header>
<main class="container">
<ul>
    <li>配信画面で対戦している名前や勝利数などを表示できる簡易ティッカーです</li>
    <li>OBSのブラウザソースに本ティッカーのURLを設定します</li>
    <li>管理者はティッカー管理画面で名前や勝利数などを変更できます</li>
    <li>変更はリアルタイムで反映されます</li>
</ul>

<h2>ティッカーを作成する</h2>

<form method="post">
    <label for="Lname">ティッカーの名前 (URLの一部になります)</label>
    <input type="input" name="name" id="Lname"/>
    <label for="Lphrase">管理画面用パスフレーズ</label>
    <input type="input" name="phrase" id="Lphrase" />
    <button type="submit">作成する</button>
</form>

</main>