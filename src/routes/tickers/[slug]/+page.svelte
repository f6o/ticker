<script lang="ts">
	import { getTickerRef } from "$lib/firebase";
	import { onValue } from "@firebase/database";
	import type { PageData } from "./$types";

    let { data } : { data : PageData } = $props();
    let { ticker, info }  = data;

    let googleFontName = $state('Dela Gothic One')
    let googleFontUrl = $derived('https://fonts.googleapis.com/css2?family='+googleFontName+'&display=swap');

    let backgroundColor = $state(ticker.backgroundColor);
    let foreGroundColor = $state(ticker.foregroundColor);
    let winForeGroundColor = $state(ticker.textColor);
    let centerBackGroundColor = $state(ticker.tickerColor);
    let centerForeGroundColor = $state(ticker.textColor);

    let marginX = 262
    let padding = 16
    
    let slitWidth = 100
    let slitHeight = 30

    let centerAreaWidth = 236
    let centerAreaHeight = 48

    let fullWidth = $state(ticker.width)
    let tickerWidth = $derived((fullWidth- marginX*2 - slitWidth*2 - centerAreaWidth)/2)
    let tickerHeight = $state(ticker.height)

    let player1NameFontX = marginX + padding
    let player2NameFontX = $derived(fullWidth - player1NameFontX)

    let nameFontSize = $derived(tickerHeight * 0.7)
    let nameFontY = $derived(nameFontSize + 3)

    let slitFontSize = slitHeight * 0.7
    let slitFontY = slitFontSize + 3

    let centerAreaFontSize = $state(tickerHeight * 0.7)
    let centerAreaFontY = $derived(centerAreaFontSize)

    let centerText = $state('');

    let player1Name = $state('');
    let player1Wins = $state(0);

    let player2Name = $state('');
    let player2Wins = $state(0);

    if ( info ) {
    const tickerRef = getTickerRef(data.slug);
        onValue(tickerRef, (snapshot) => {
            let newData = snapshot.val();
            centerText = newData.info.centerText;
            player1Name = newData.info.p1.name;
            player1Wins = newData.info.p1.wins;
            player2Name = newData.info.p2.name;
            player2Wins = newData.info.p2.wins;
        });
    }
</script>

<svelte:head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="{googleFontUrl}" rel="stylesheet">
</svelte:head>

{#if info}
<svg viewBox="0 0 {fullWidth} {300}">
    <defs>
        <filter id="shadow">
            <feDropShadow dx="1" dy="1" stdDeviation="0.2" flood-color="black"></feDropShadow>
        </filter>
        <filter id="nameShadow">
            <feDropShadow dx="1" dy="1" stdDeviation="0" flood-color="{foreGroundColor}"></feDropShadow>
        </filter>
        <filter id="nameShadow-right">
            <feDropShadow dx="-1" dy="1" stdDeviation="0" flood-color="{foreGroundColor}"></feDropShadow>
        </filter>
        <line id="sepline" stroke="{foreGroundColor}" stroke-width="2"/>
    </defs>

    <!-- player 1 -->
    <rect
        x="{marginX}"
        y="0"
        width="{tickerWidth}"
        height="{tickerHeight}"
        fill="{backgroundColor}">
    </rect>

    <text
        x="{player1NameFontX}"
        y="{nameFontY}"
        font-size="{nameFontSize}"
        font-family="{googleFontName}, san serif"><tspan fill="{foreGroundColor}">{player1Name}</tspan></text>
    <line
        x1="{marginX+tickerWidth-padding*2-nameFontSize}"
        y1="5"
        x2="{marginX+tickerWidth-padding*2-nameFontSize}"
        y2="{tickerHeight-5}"
        stroke="{foreGroundColor}"
        stroke-width="3"/>
    <text
        text-anchor="end"
        x="{marginX+tickerWidth-padding}"
        y="{nameFontY}"
        font-size="{nameFontSize}"
        font-family="{googleFontName}, san serif"><tspan fill="{winForeGroundColor}">{player1Wins}</tspan></text>

    <!-- slit 1 -->
    <rect
        x="{marginX+tickerWidth}"
        y="0"
        width="{slitWidth}"
        height="{slitHeight}"
        fill="{backgroundColor}"/>
    <text
        text-anchor="middle"
        x="{marginX+tickerWidth+slitWidth/2}"
        y="{slitFontY}"
        font-size="{slitFontSize}"
        font-family="{googleFontName}, san serif"><tspan fill="{winForeGroundColor}">{data.info.slit1}</tspan></text>

    <!-- center icon -->
    {#if centerText}
    <rect
        x="{marginX+tickerWidth+slitWidth}"
        width="{centerAreaWidth}"
        height="{centerAreaHeight}"
        fill="{centerBackGroundColor}"></rect>

    <text
        style="filter:url(#shadow)"
        text-anchor="middle"
        x="{marginX+tickerWidth+slitWidth+centerAreaWidth/2}"
        y="{centerAreaFontY}"
        font-size="{centerAreaFontSize}"
        font-family="{googleFontName}, san serif"><tspan fill="{centerForeGroundColor}">{centerText}</tspan></text>
    {/if}

    <!-- slit 2 -->
    <rect
        x="{marginX+tickerWidth+slitWidth+centerAreaWidth}"
        y="0"
        width="{slitWidth}"
        height="{slitHeight}"
        fill="{backgroundColor}"/>
    <text
        text-anchor="middle"
        x="{marginX+tickerWidth+slitWidth+centerAreaWidth+slitWidth/2}"
        y="{slitFontY}"
        font-size="{slitFontSize}"
        font-family="{googleFontName}, san serif"><tspan fill="{winForeGroundColor}">{data.info.slit2}</tspan></text>

    <!-- player 2 -->
    <rect
        x="{marginX+tickerWidth+slitWidth*2+centerAreaWidth}"
        y="0"
        width="{tickerWidth}"
        height="{tickerHeight}"
        fill="{backgroundColor}">
    </rect>
    
    <text
        text-anchor="end"
        x="{player2NameFontX}"
        y="{nameFontY}"
        font-size="{nameFontSize}"
        font-family="{googleFontName}, san serif"><tspan fill="{foreGroundColor}">{player2Name}</tspan></text>
    <line
        x1="{marginX+tickerWidth+slitWidth*2+centerAreaWidth+padding*2+nameFontSize}"
        y1="5"
        x2="{marginX+tickerWidth+slitWidth*2+centerAreaWidth+padding*2+nameFontSize}"
        y2="{tickerHeight-5}"
        stroke="{foreGroundColor}"
        stroke-width="3"/>
    <text
        text-anchor="start"
        x="{marginX+tickerWidth+slitWidth*2+centerAreaWidth+padding}"
        y="{nameFontY}"
        font-size="{nameFontSize}"
        font-family="{googleFontName}, san serif"><tspan fill="{winForeGroundColor}">{player2Wins}</tspan></text>


</svg>
{/if}