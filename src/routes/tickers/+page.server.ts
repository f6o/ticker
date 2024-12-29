import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    create: async ({cookies, request}) => {
        const formData = await request.formData();
        const name = formData.get('name');
        if ( name === '12345' ) {
            return fail(400, {isAlreadyTaken: true});
        } else {
            return redirect(304, `/tickers/${name}/`);
        }
    }
}