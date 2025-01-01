import { getAuthToken } from "$lib/server/auth";
import { findName } from "$lib/server/firebase";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params, cookies}) => {
    const name = params.slug;
    const requestAuthToken = cookies.get('htua');
    if ( requestAuthToken ) {
        const data = await findName(name);
        const passphrase = data.passphrase;
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