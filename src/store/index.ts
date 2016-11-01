export { IAppState, store } from './store';
export { IMap, IPos, IMarker } from './map';

export const GoogleMapsApi= {
    Keys: {
        Android: "AIzaSyAf28o-lSKrx64YnaiJks6zhP8tOl2fIq4",
        iOs: "AIzaSyBN_bNiILAlV0IM9apz3_oGzq8tg8kmOTQ",
        Js: "AIzaSyAguErZzGhpzaku0WHXpGB4Ce4JYmNWa-U" 
    }
}


//ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyAf28o-lSKrx64YnaiJks6zhP8tOl2fIq4" --variable API_KEY_FOR_IOS="AIzaSyBN_bNiILAlV0IM9apz3_oGzq8tg8kmOTQ" --variable API_KEY_FOR_WEB="AIzaSyAguErZzGhpzaku0WHXpGB4Ce4JYmNWa-U"