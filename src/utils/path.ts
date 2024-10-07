export const path = {
  getNormalizedName(path: string) {
    return path
      .replaceAll('-', ' ')
      .split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  },

  getCurrent(fullPathName: string, currentIndex: number) {
    return fullPathName
      .split('/')
      .slice(0, currentIndex + 2)
      .join('/');
  },
};
