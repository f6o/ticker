import type { PageLoad } from "./$types";

export const load: PageLoad = ({ data }) => {
    return {
        slug: data.slug,
        info: data.tickerInfo as TickerData,
        ticker: {
            width: 1920,
            height: 48,
            textColor: '#f0f',
            tickerColor: '#ff0',
            backgroundColor: '#000',
            foreGroundColor: '#fff',
        } as TickerLayout,
    }
}