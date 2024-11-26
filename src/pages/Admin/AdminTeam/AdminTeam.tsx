import { useAppSelector } from '../../../app/hooks';
import { useMemo } from 'react';

import { Error } from '../../../components/Error';
import { LoadingPage } from '../../LoadingPage/LoadingPage';
import { AdminCatalog } from '../components/AdminCatalog/AdminCatalog';
import { AdminTeamCard } from './components/AdminTeamCard';
import { TeamForm } from './components/TeamForm';
import { useSearchParams } from 'react-router-dom';
import { getVisibleItems } from '../../../utils/getVisibleItems';
const TeamColumns = ['Name', 'Image', 'Role', 'Text'];

const AdminTeam = () => {
  const { team, loading, error } = useAppSelector(state => state.team);
  const [searchParams] = useSearchParams();
  const numberOfPages = useMemo(() => {
    return Math.ceil(team.length / 8);
  }, [team]);

  const visibleTeam = useMemo(() => {
    const page = searchParams.get('page');

    return getVisibleItems({ items: team, page, itemsPerPage: 8 }).sort((person1, person2) => {
      return person1.id - person2.id;
    });
  }, [searchParams, team]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <AdminCatalog columns={TeamColumns} numberOfPages={numberOfPages}>
        {visibleTeam.map(item => (
          <AdminTeamCard item={item} key={item.id} />
        ))}
      </AdminCatalog>
      <TeamForm />
    </>
  );
};

export default AdminTeam;
