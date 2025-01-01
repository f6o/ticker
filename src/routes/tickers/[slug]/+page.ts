import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
    return {
        slug: params.slug,
        ticker: {
            width: 1920,
            height: 48,
            textColor: '#f0f',
            tickerColor: '#ff0',
            backgroundColor: '#000',
            foreGroundColor: '#fff',
        } as TickerLayout, 
        info: {
            centerText: '1回戦',
            slit1: " ",
            slit2: " ",
            p1: {
                name: "ゲン",
                wins: 3
            },
            p2: {
                name: "リュウ",
                wins: 2
            }
        } as TickerData
    }
}