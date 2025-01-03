import { getAuthToken } from "$lib/server/auth";
import { findName, getPassphrase } from "$lib/server/firebase";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params, cookies}) => {
    const name = params.slug;
    const requestAuthToken = cookies.get('htua');
    if ( requestAuthToken ) {
        const passphrase = await getPassphrase(name);
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