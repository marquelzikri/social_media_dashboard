import { BiBuildings } from 'react-icons/bi';
import { IoMailOpenSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { User as UserModel } from '../../models/User';

function UserCard(props: Partial<UserModel & { showProfileButton?: boolean }>) {
  const { id, email, name, company, showProfileButton } = props;

  return (
    <div className="w-64 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
      <img alt="profile" src="https://picsum.photos/300" className="w-full mb-4 rounded-t-lg h-28" />
      <div className="flex flex-col items-center justify-center p-4 -mt-16">
        <a href="/#" className="relative block">
          <img alt="profile" src="https://i.pravatar.cc/100" className="object-cover w-16 h-16 mx-auto rounded-full " />
        </a>
        <p className="mt-2 text-xl font-medium text-gray-800 dark:text-white">
          {name}
        </p>
        <p className="flex items-center text-xs text-gray-500">
          <span className="mr-1">
            <IoMailOpenSharp />
          </span>
          {email}
        </p>
        {company?.name ? (
          <p className="flex items-center text-xs text-gray-500">
            <span className="mr-1">
              <BiBuildings />
            </span>
            {company?.name}
          </p>
        ) : null}
        {showProfileButton ? (
          <div className="flex items-center justify-between w-full gap-4 mt-8">
            <Link
              to={`/users/${id}`}
              className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              See Profile
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default UserCard;
