const initialiseAuthSDK = () => {
  if (typeof window !== 'undefined' && window?.initPWAuthWebSDK) {
    const propConfig = {
      flow: 'auth',
      webSDK: window.PWWebSDK,
      renderType: 'page',
      details: {
        parentURL: process.env.PUBLIC_AUTH_SDK_PARENT_URL,
        redirectDirectlyAfterLogin: process.env.PUBLIC_AUTH_SDK_REDIRECT_PATH,
      },
      firebaseRemoteConfig: {
        apiKey: process.env.PUBLIC_API_KEY,
        authDomain: process.env.PUBLIC_AUTH_DOMAIN,
        databaseURL: process.env.PUBLIC_DATA_BASEURL,
        projectId: process.env.PUBLIC_PROJECT_ID,
        storageBucket: process.env.PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.PUBLIC_SENDER_ID,
        appId: process.env.PUBLIC_APP_ID,
        measurementId: process.env.PUBLIC_MEASUREMENT_ID,
      },
    };
    window?.initPWAuthWebSDK(propConfig);
  }
};

export default initialiseAuthSDK;
