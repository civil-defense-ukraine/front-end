import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { useMemo } from 'react';
import { AdminCatalog } from '../AdminCatalog/AdminCatalog';
import { AdminTeamCard } from './AdminTeamCard';
import { TeamForm } from '../AdminForm/TeamForm';
const TeamColumns = ['Name', 'Image', 'Role', 'Text'];

const AdminTeam = () => {
  const { team } = useAppSelector(state => state.team);
  console.log(team);

  const [searchParams] = useSearchParams();
  const numberOfPages = useMemo(() => {
    return Math.ceil(team.length / 15);
  }, [team]);
  // const visibleTeam = useMemo(() => {
  //   const page = searchParams.get('page');

  //   return getVisibleNews({ news: news, page });
  // }, [searchParams, news]);

  return (
    <>
      <AdminCatalog columns={TeamColumns} numberOfPages={numberOfPages}>
        {team.map(item => (
          <AdminTeamCard item={item} key={item.id} />
        ))}
      </AdminCatalog>
      <TeamForm />
    </>
  );
};

export default AdminTeam;
