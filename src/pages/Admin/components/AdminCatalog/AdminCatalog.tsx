import { Pagination } from '../../../../components/Pagination';
import styles from './AdminCatalog.module.scss';

type Props = {
  columns: string[];
  numberOfPages: number;
  children: React.ReactNode;
};

export const AdminCatalog: React.FC<Props> = ({
  columns,
  numberOfPages,
  children,
}) => {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {numberOfPages >= 2 && <Pagination numberOfPages={numberOfPages} />}
    </>
  );
};
