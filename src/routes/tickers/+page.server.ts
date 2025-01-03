import { AUTH_COOKIE_NAME, getAuthToken } from '$lib/server/auth';
import { getPassphrase, updatePlayerInfo } from '$lib/server/firebase';
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
                cookies.set(AUTH_COOKIE_NAME, token, { path: '/' });
            }
        }

        redirect(303, `/tickers/${name}/manage`);
    },

    update: async({cookies, request}) => {
        const formData = await request.formData();
        const name = formData.get('name');

        if ( name && cookies.get(AUTH_COOKIE_NAME) ) {
            const centerText = formData.get('centerText');
            const player1Name = formData.get('player1');
            const player2Name = formData.get('player2');
            const player1Wins = formData.get('player1wins');
            const player2Wins = formData.get('player2wins');
            
            if ( centerText && player1Name && player2Name && player1Wins && player2Wins ) {
                await updatePlayerInfo(name?.toString(), {
                    centerText: centerText?.toString(),
                    slit1: '',
                    slit2: '',
                    p1: {
                        name: player1Name.toString(),
                        wins: parseInt(player1Wins.toString()),
                    },
                    p2: {
                        name: player2Name.toString(),
                        wins: parseInt(player2Wins.toString()),
                    }
                });
            }
        }

        redirect(303, `/tickers/${name}/manage`);
    },
} satisfies Actions;