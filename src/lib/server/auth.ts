import { AUTH_SALT } from '$env/static/private';
import { createHmac } from 'node:crypto';

export const cookieName = 'htua'

const salt = AUTH_SALT || 'saltysalt';

export const getAuthToken = (name: string, passphrase: string) => {
    const body = `${name}/${passphrase}`;
    console.log(salt);
    console.log(body);

    const hash = createHmac('sha1', salt)
        .update(body)
        .digest('hex');
    return hash;
}
