import { getAuthToken } from "$lib/server/auth";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params, cookies}) => {
    const name = params.slug;
    const requestAuthToken = cookies.get('htua');
    if ( requestAuthToken ) {
        // TODO: load from DB
        const passphrase = 'ticker00';
        if ( passphrase ) {
            const authToken = getAuthToken(name, passphrase);
            if ( authToken === requestAuthToken ) {
                return {
                    slug: name,
                    isAuthenticated: true
                }
            } else {
                cookies.delete('htua', {path: '/'});
            }
        }
    }

    return {
        slug: name,
        isAuthenticated: false
    }
}