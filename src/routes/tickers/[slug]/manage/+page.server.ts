import { getAuthToken } from "$lib/server/auth";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params, cookies}) => {
    const name = params.slug;
    const requestAuthToken = cookies.get('authenticated');
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
                cookies.delete('authenticated', {path: '/'});
            }
        }
    }

    return {
        slug: name,
        isAuthenticated: false
    }
}