import type { PageLoad } from "./$types";

export const load: PageLoad = ({ data }) => {
    return {
        slug: data.slug,
        info: data.info as TickerData,
        ticker: data.ticker as TickerLayout,
    }
}