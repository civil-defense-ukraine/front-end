
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
    const modifiedTitle = title.trim().toLowerCase();
    return modifiedTitle.split(' ').join('-');
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
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
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
