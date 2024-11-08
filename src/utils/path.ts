export const path = {
  getNormalizedName(path: string) {
    const normalized = path
      .split('-')
      .filter(word => word.length > 0)
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ')
      .replaceAll('-', ' ');
    return normalized;
  },

  getCurrent(fullPathName: string, currentIndex: number) {
    return fullPathName
      .split('/')
      .slice(0, currentIndex + 2)
      .join('/');
  },
};
