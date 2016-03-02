import moment from 'moment';
const now = Date.now();

export function formatDate(date) {
  const momentified = moment(date);
  if (momentified.isSame(now, 'day')) {
    return momentified.fromNow();
  }

  return momentified.calendar();
}
