const calculateTimeAgo = (date) => {
  const currentDate = new Date();
  const pastDate = new Date(date);

  const years = currentDate.getFullYear() - pastDate.getFullYear();
  let months = currentDate.getMonth() - pastDate.getMonth();
  let days = currentDate.getDate() - pastDate.getDate();

  const hours = currentDate.getHours() - pastDate.getHours();
  const minutes = currentDate.getMinutes() - pastDate.getMinutes();
  const seconds = currentDate.getSeconds() - pastDate.getSeconds();

  // Adjust for leap year
  if (pastDate.getMonth() === 1) {
    if (
      pastDate.getFullYear() % 100 === 0
        ? pastDate.getFullYear() % 400 === 0
        : pastDate.getFullYear() % 4 === 0
    ) {
      days += 1;
    }
  }

  // Map months to their respective number of days
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (days < 0) {
    months--;
    days += monthDays[(currentDate.getMonth() - 1 + 12) % 12];
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years > 0) {
    return `${years}yr`;
  } else if (months > 0) {
    return `${months}mo`;
  } else if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
};

export default calculateTimeAgo;