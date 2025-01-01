import type { PageServerLoad } from "../../$types";

export const load: PageServerLoad = async ({params, cookies}) => {
    const authToken = 'TODO_here_';
    if ( authToken === cookies.get('authenticated') ) {
        return {
            slug: params.slug,
            isAuthenticated: true
        }
    } else {
        return {
            slug: params.slug,
            isAuthenticated: false
        }
    }
}