import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({params, cookies}) => {
    const authToken = 'TODO_here_';
    const requestAuthToken = cookies.get('authenticated');

    if ( requestAuthToken ) {
        if ( authToken === requestAuthToken ) {
            return {
                slug: params.slug,
                isAuthenticated: true
            }
        } else {
            cookies.delete('authenticated', {path: '/'});
        }
    }
    return {
        slug: params.slug,
        isAuthenticated: false
    }
}