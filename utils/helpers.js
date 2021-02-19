import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications  from 'expo-notifications'
import * as Permissions  from 'expo-permissions'

const NOTIFICATION_KEY = 'MobileFlashCard:notifications'

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  
export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
                if (status === 'granted') {
                    Notifications.cancelAllScheduledNotificationsAsync()
                    
                    Notifications.scheduleNotificationAsync({
                        content: {
                            title: "Complete today's quiz",
                            body: "Don't forget to complete today's quiz"
                            },
                        trigger: {
                            repeats: true,
                            hour: 10,
                            minute: 30
                            }
                        })
                        
                    Notifications.setNotificationHandler({
                        handleNotification: async () => ({
                            shouldShowAlert: true,
                            shouldPlaySound: true,
                            shouldSetBadge: true,
                        }),
                        });

                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
    
                }
            })
        }
      })
  }


