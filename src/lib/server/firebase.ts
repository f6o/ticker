import { initializeServerApp } from 'firebase/app'
import { get, getDatabase, ref } from 'firebase/database'

const databaseURL = process.env.FIREBASE_REALTIMEDATABASE_URL;
if ( !databaseURL ) {
    throw new Error("undefined")
}

const app = initializeServerApp({
    databaseURL: databaseURL,
}, {
    
});

const database = getDatabase(app);

const findName = async (name: string): Promise<any> => {
    const snapshot = await get(ref(database, "tickers/" + name))
    return snapshot.val()
}

export { findName }