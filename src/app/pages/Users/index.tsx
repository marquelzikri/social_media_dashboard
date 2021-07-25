import { useGetUsersQuery } from '../../../services/users';
import Loader from '../../components/Loader';

import UserCard from '../../components/UserCard';

function Users() {
  const { data: users, error, isLoading, isError } = useGetUsersQuery({});

  if (isLoading) return <Loader label="Loading users" />
  if (isError) return <span>{JSON.stringify(error)}</span>
  return (
    <div className="grid h-full gap-2 overflow-auto justify-items-center sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
      {users?.map((user, index) => <UserCard key={index} showProfileButton={true} {...user} />)}
    </div>
  );
}

export default Users;
