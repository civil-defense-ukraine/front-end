/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  items: any[];
  itemsPerPage?: number;
  page?: string | null;
};

export const getVisibleItems = ({ items, itemsPerPage = 12, page }: Props) => {
  const pageNumber = page ? +page : 1;
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = (pageNumber - 1) * itemsPerPage + itemsPerPage;

  return items.slice(startIndex, endIndex);
};
