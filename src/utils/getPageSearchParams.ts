const start = '... ';
const end = ' ...';

export const getPagination = {
  searchParams(value: string | number, currentPage: number) {
    const newSearchParams = new URLSearchParams();
    if (typeof value === 'number') {
      newSearchParams.set('page', `${value}`);

      if (value === 1) {
        newSearchParams.delete('page');
      }
    }

    if (value === start) {
      newSearchParams.set('page', `${currentPage + 1}`);
    }

    if (value === end) {
      newSearchParams.set('page', `${currentPage - 1}`);
    }

    return newSearchParams;
  },
  smallScreen(numberOfPages: number, currentPage: number) {
    if (numberOfPages <= 4) {
      return new Array(numberOfPages).fill(0).map((el, index) => index + 1);
    }
    if (currentPage < 4) {
      return [1, 2, 3, start, numberOfPages];
    }

    if (currentPage >= numberOfPages - 2) {
      return [1, end, numberOfPages - 2, numberOfPages - 1, numberOfPages];
    }

    return [1, start, currentPage, end, numberOfPages];
  },

  bigScreen(numberOfPages: number, currentPage: number) {
    if (numberOfPages <= 7) {
      return new Array(numberOfPages).fill(0).map((el, index) => index + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, start, numberOfPages];
    }

    if (currentPage >= numberOfPages - 3) {
      return [
        1,
        end,
        numberOfPages - 3,
        numberOfPages - 2,
        numberOfPages - 1,
        numberOfPages,
      ];
    }

    return [
      1,
      start,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      end,
      numberOfPages,
    ];
  },
};
