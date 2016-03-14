import moment from 'moment';
const now = Date.now();

export function formatMessageTime(date) {
  const momentified = moment(date);

  if (momentified.isSame(now, 'day')) {
    return momentified.fromNow();
  }
  return momentified.calendar();
}

export function formatRoomDate(date) {
  return moment(date).format('Do MMM YYYY');
}
