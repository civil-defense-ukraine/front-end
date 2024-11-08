export const getNormalized = {
  slicedText(text: string, maxLengthOfText = 270) {
    if (text.length <= maxLengthOfText) {
      return text;
    }

    const updatedString = text.slice(0, maxLengthOfText);
    const indexOfLastSpace = updatedString.lastIndexOf(' ');
    const isLastElSymbol =
      updatedString[indexOfLastSpace - 1].toUpperCase() ===
      updatedString[indexOfLastSpace - 1].toLowerCase();
    const lastIndex = isLastElSymbol ? indexOfLastSpace - 1 : indexOfLastSpace;
    return `${updatedString.slice(0, lastIndex)} ...`;
  },
  link(title: string) {
    return title
      .trim()
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word
          .split('')
          .filter(ch => {
            const isLetter = ch.toUpperCase() !== ch;
            const isNumber = !isNaN(Number(ch));
            return isLetter || isNumber;
          })
          .join('');
      })
      .filter(word => word.length > 0)
      .join('-');
  },
  title(title: string) {
    return title
      .split(' ')
      .map(word => {
        if (word.length === 0) {
          return '';
        } else {
          return word[0].toUpperCase() + word.slice(1);
        }
      })
      .join(' ');
  },
  date(date: Date) {
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}. ${day} ${year}`;
  },
  dateForAdmin(date: Date) {
    return new Intl.DateTimeFormat(['ban', 'id']).format(date);
  },
  dateForServer(dateStr: string) {
    const [day, month, year] = dateStr.split('/');
    const date = new Date(`${year}-${month}-${day}T08:33:51.074Z`);
    return date.toISOString();
  },
};
