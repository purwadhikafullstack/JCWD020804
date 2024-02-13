import schedule from 'node-schedule';
import { sendDailyReminder, sendSameDayReminder } from './reminderController';

export const setupReminderScheduler = () => {
  schedule.scheduleJob({ hour: 8, minute: 0, tz: 'Asia/Jakarta' }, () => {
    console.log('Running daily booking reminder scheduler at 8 am GMT+7...');
    sendDailyReminder();
  });
};
export const scheduleSameDayReminder = () => {
  schedule.scheduleJob({ hour: 12, minute: 0, tz: 'Asia/Jakarta' }, () => {
    console.log(
      'Running same day booking reminder scheduler at 12 pm GMT+7...',
    );
    sendSameDayReminder();
  });
};
