import { PUBLIC_FIREBASE_REALTIMEDATABASE_URL } from "$env/static/public";
import { initializeApp } from "firebase/app"
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
    databaseURL: PUBLIC_FIREBASE_REALTIMEDATABASE_URL
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const getTickerRef = (tickerName: string) =>{
    return ref(database, 'ticker/' + tickerName);
}