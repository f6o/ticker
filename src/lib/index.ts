// place files you want to import through the `$lib` alias in this folder.

import firebase from 'firebase/app'
import { getDatabase } from 'firebase/database'

const databaseURL = process.env.FIREBASE_REALTTIMEDATABSE_URL
if ( !databaseURL ) {
    throw new Error("undefined")
}

const app = firebase.initializeApp({
    databaseURL: databaseURL,
})

export const databse = getDatabase(app)