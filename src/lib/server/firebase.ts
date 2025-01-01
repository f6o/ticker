import { FIREBASE_REALTIMEDATABASE_URL } from '$env/static/private';
import admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

const app = admin.initializeApp({
    credential: applicationDefault(),
    databaseURL: FIREBASE_REALTIMEDATABASE_URL,
});

const db = admin.database(app);

export const findName = async (name: string): Promise<any> => {
    let ref = db.ref("ticker/" + name);
    let snapshot = await ref.get();
    return snapshot.val();
}