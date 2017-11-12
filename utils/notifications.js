import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

// A notification key is being created
const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

/*
 * To clear all notifications they get removed from the store
 * and they all get cancel on the system.
 */
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

/*
 * A new notification object is being created for Android
 */
function createNotification() {
  return {
    title: 'Do a quiz!',
    body: 'Ahoy! Train your brain and do a quiz today!',
    android: {
      priority: 'high',
      vibrate: true,
    }
  }
}

/*
 * A new notification is set by asking for permission and if they're
 * granted all existing are getting cleared and than a new daily
 * repeating notification is being set starting tomorrow at 7pm.
 * And if there is already a notification nothing happens, because
 * well... the notification is already set.
 */
export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if(data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if(status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(19);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          })
      }
    })
}
