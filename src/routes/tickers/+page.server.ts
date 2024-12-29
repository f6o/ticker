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
    }
} satisfies Actions;