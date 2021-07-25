import { useGetUsersQuery } from '../../../services/users';

import UserCard from '../../components/UserCard';

function Users() {
  const { data: users, error, isLoading, isError } = useGetUsersQuery({});

  if (isLoading) return <span>Loading users</span>
  if (isError) return <span>{JSON.stringify(error)}</span>
  return (
    <div className="grid gap-2 justify-items-center sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
      {Array.isArray(users)
        ? users?.map((user, index) => <UserCard key={index} showProfileButton={true} {...user} />)
        : null
      }
    </div>
  );
}

export default Users;
