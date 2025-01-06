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

export const createPlayerInfo = async (name: string) => {
    let info = {
        centerText: "1回戦",
        slit1: "",
        slit2: "",
        p1: {
            name: "プレイヤー1",
            wins: 0
        }, 
        p2: {
            name: "プレイヤー2",
            wins: 0
        }
    } as TickerData

    let ref = db.ref('ticker/'+name);
    await ref.set({
        info: info
    })
}

export const updatePlayerInfo = async (name: string, info: TickerData) => {
    let ref = db.ref('ticker/'+name);
    const infoRef = ref.child('info');
    await infoRef.update(info);
}

export const updateTickerColor = async (name: string, info: TickerLayout) => {
    let ref = db.ref('ticker/'+name);
    const colorRef = ref.child('ticker');
    await colorRef.update(info);
}

export const getPassphrase = async (name: string): Promise<string> => {
    let ref = db.ref('passphrase/' + name);
    let snapshot = await ref.get();
    return snapshot.val();
}

export const savePassphrase = async (name: string, passphrase: string) => {
    let ref = db.ref('passphrase/' + name);
    await ref.set(passphrase);
}