export const getCurrentDate = () => {
  let today = new Date();
  let date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  return  date + ' ' + time;
};

export function msToHMS(ms) {
  // 1- Convert to seconds:
  let seconds = ms / 1000;
  // 2- Extract hours:
  const hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  const minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;
  return hours + 'giờ:' + minutes + 'phút:' + seconds + 'giây'
}
