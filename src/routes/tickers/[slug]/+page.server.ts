import { findName } from "$lib/server/firebase";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params, cookies}) => {
    const name = params.slug;

    const data = await findName(name);
    if ( data ) {
        return {
            ...data,
            slug: name,
        }
    } else {
        error(404, 'ticker not found')
    }
}