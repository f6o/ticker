import { FIREBASE_PROJECT_PRIVATE_KEY, FIREBASE_PROJECT_CLIENT_EMAIL, FIREBASE_PROJECT_ID, FIREBASE_REALTIMEDATABASE_URL } from '$env/static/private';
import admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';

const app = admin.initializeApp({
    credential: cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_PROJECT_CLIENT_EMAIL,
        privateKey: `-----BEGIN PRIVATE KEY-----\n${FIREBASE_PROJECT_PRIVATE_KEY}\n-----END PRIVATE KEY-----\n`,
    }),
    databaseURL: FIREBASE_REALTIMEDATABASE_URL,
});

const db = admin.database(app);

export const findName = async (name: string): Promise<any> => {
    let ref = db.ref("ticker/" + name);
    let snapshot = await ref.get();
    return snapshot.val();
}

export const updatePlayerInfo = async (name: string, info: TickerData) => {
    let ref = db.ref('ticker/'+name);
    const infoRef = ref.child('info');
    await infoRef.update(info);
}

export const getPassphrase = async (name: string): Promise<string> => {
    let ref = db.ref('passphrase/' + name);
    let snapshot = await ref.get();
    return snapshot.val();
}