import { AUTH_COOKIE_NAME, getAuthToken } from '$lib/server/auth';
import { createPlayerInfo, getPassphrase, savePassphrase, updatePlayerInfo, updateTickerColor } from '$lib/server/firebase';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions = {
    create: async ({request}) => {
        const formData = await request.formData();
        const nameFormData = formData.get('name');
        const phraseFormData = formData.get('phrase');
        if ( nameFormData && phraseFormData ) {
            const name = nameFormData.toString();
            const phrase = phraseFormData.toString();

            let validationError = { invalidName: false, invalidPhrase: false }
            if ( !name.match(/^[a-zA-Z0-9]+$/) ) {
                validationError.invalidName = true;
            }

            if ( !phrase.match(/^[a-zA-Z0-9]+$/) ) {
                validationError.invalidPhrase = true;
            }

            if ( validationError.invalidName || validationError.invalidPhrase ) {
                return fail(400, validationError)
            }

            const passphraseInDb = await getPassphrase(name);
            if ( passphraseInDb ) {
                return fail(400, {isAlreadyTaken: true, prevName: name});
            } else {
                await Promise.all([
                    createPlayerInfo(name),
                    savePassphrase(name, phrase)
                ]);
            }
            redirect(303, `/tickers/${nameFormData}/`);
        }

        fail(400, {unexpeced: true});
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

    colors: async({cookies, request}) => {
        const formData = await request.formData();
        const name = formData.get('name');

        if ( name && cookies.get(AUTH_COOKIE_NAME) ) {
            const backgroundColor = formData.get('backgroundColor');
            const foregroundColor = formData.get('foregroundColor');
            const textColor = formData.get('textColor');
            const tickerColor = formData.get('tickerColor');
            
            if ( backgroundColor && foregroundColor && textColor && tickerColor ) {
                await updateTickerColor(name?.toString(), {
                    width: 1920,
                    height: 48,
                    backgroundColor: backgroundColor?.toString(),
                    foregroundColor: foregroundColor?.toString(),
                    tickerColor: tickerColor?.toString(),
                    textColor: textColor?.toString(),
                });
            }
        }

        redirect(303, `/tickers/${name}/manage`);      
    }
} satisfies Actions;