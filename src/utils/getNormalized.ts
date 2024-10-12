export const getNormalized = {
  slicedText(text: string, maxLengthOfText = 270) {
    if (text.length <= maxLengthOfText) {
      return text;
    }

    const updatedString = text.slice(0, maxLengthOfText);

    return `${updatedString.slice(0, updatedString.lastIndexOf(' '))}...`;
  },
  link(title: string) {
    return title.toLowerCase().split(' ').join('-');
  },
  title(title: string) {
    return title
      .split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1))
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
};
