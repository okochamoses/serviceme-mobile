import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

const checkPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  // If Premission granted proceed towards token fetch
  if (enabled) {
    this.getToken();
  } else {
    // If permission hasn’t been granted to our app, request user in requestPermission method.
    this.requestPermission();
  }
};

const getToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      // user has a device token
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }
};

const requestPermission = async () => {
  try {
    await firebase.messaging().requestPermission();
    // User has authorised
    this.getToken();
  } catch (error) {
    // User has rejected permissions
    console.log('permission rejected');
  }
};

const createNotificationListeners = async () => {
  // This listener triggered when notification has been received in foreground
  this.notificationListener = firebase
    .notifications()
    .onNotification(notification => {
      const {title, body} = notification;
      this.displayNotification(title, body);
    });

  // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
  this.notificationOpenedListener = firebase
    .notifications()
    .onNotificationOpened(notificationOpen => {
      const {title, body} = notificationOpen.notification;
      this.displayNotification(title, body);
    });

  // This listener triggered when app is closed and we click,tapped and opened notification
  const notificationOpen = await firebase
    .notifications()
    .getInitialNotification();
  if (notificationOpen) {
    const {title, body} = notificationOpen.notification;
    this.displayNotification(title, body);
  }
};

const displayNotification = (title, body) => {
  // we display notification in alert box with title and body
  Alert.alert(
    title,
    body,
    [{text: 'Ok', onPress: () => console.log('ok pressed')}],
    {cancelable: false},
  );
};
