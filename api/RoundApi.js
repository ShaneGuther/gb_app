import firebase from 'react-native-firebase';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';


export function addRound(round, addComplete){

    firebase.firestore()
    .collection('rounds')
    .add({
        course: round.course,
        par: round.par,
        score: round.score,
        gir: round.gir,
        greens: round.greens,
        fwh: round.fwh,
        fairways: round.fairways,
        weather: round.weather,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then((data)=> addComplete(data))
    .catch((error)=> console.log(error));
}

export async function getRound(roundRetrieved){

    var roundList = [];

    var snapshot = await firebase.firestore()
    .collection('rounds')
    .orderBy('createdAt')
    .get()

    snapshot.forEach((doc) => {
        roundList.push(doc.data());
    });

    roundRetrieved(roundList);
}    