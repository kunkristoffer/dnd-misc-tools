export const firebasePublicConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_FIREBASE_APPID_LIVE
      : process.env.NEXT_PUBLIC_FIREBASE_APPID_PREVIEW,
};
