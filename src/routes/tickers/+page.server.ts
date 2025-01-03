import { getAuthToken } from '$lib/server/auth';
import { getPassphrase } from '$lib/server/firebase';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions = {
    create: async ({request}) => {
        const formData = await request.formData();
        const name = formData.get('name');
        if ( name === '12345' ) {
            return fail(400, {isAlreadyTaken: true, prevName: name});
        } else {
            redirect(303, `/tickers/${name}/`);
        }
    },

    auth: async ({cookies, request}) => {
        const formData = await request.formData();
        const name = formData.get('name');
        const phrase = formData.get('phrase');
        if ( name && phrase ) {
            const passphrase = await getPassphrase(name.toString());
            if ( passphrase === phrase.toString() ) {
                const token = getAuthToken(name.toString(), phrase.toString());
                cookies.set('htua', token, { path: '/' });
            }
        }

        redirect(303, `/tickers/${name}/manage`);
    }
} satisfies Actions;