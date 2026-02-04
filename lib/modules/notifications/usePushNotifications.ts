import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { supabase } from '../../supabase';
import { registerForPushNotificationsAsync } from '../../core/notifications/notification.adapter';

export const usePushNotifications = (userId: string | undefined) => {
  useEffect(() => {
    if (!userId) return;

    async function saveToken() {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        await supabase
          .from('profiles')
          .update({ expo_push_token: token })
          .eq('id', userId);
      }
    }

    saveToken();
  }, [userId]);
};