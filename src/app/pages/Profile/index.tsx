import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';

import Loader from '../../components/Loader';
import Post from '../../components/Post';
import UserCard from '../../components/UserCard';

import { useGetUserAlbumsQuery } from '../../../services/albums';
import { useGetUserPostsQuery } from '../../../services/posts';
import { useGetUserQuery } from '../../../services/users';


function Profile() {
  const params = useParams<{ id: string }>();
  const userId = params.id ? parseInt(params.id) : undefined;
  const { data: user, isLoading } = useGetUserQuery({ userId }, { skip: !userId });

  return (
    <section id="profile" className="justify-between h-full gap-3 md:flex">
      <section className="flex justify-center w-full mb-8 md:w-auto">
        <UserCard isLoading={isLoading} {...user} />
      </section>
      <ProfileContent userId={userId} />
    </section>
  );
}

function ProfileContent(props: any) {
  const { userId } = props;

  const [activeTab, setActiveTab] = useState('Posts');

  return (
    <section className="w-full md:h-full h-profile-content">
      <ul className="flex h-10 border-b-2 border-gray-200 border-solid cursor-pointer">
        <TabItem isTabActive={activeTab === "Posts"} label={"Posts"} setActiveTab={setActiveTab} />
        <TabItem isTabActive={activeTab === "Albums"} label={"Albums"} setActiveTab={setActiveTab} />
      </ul>
      {activeTab === "Posts" && <Posts userId={userId} />}
      {activeTab === "Albums" && <Albums userId={userId} />}
    </section>
  );
}

function TabItem(props: any) {
  return (
    <li
      className={clsx(
        "rounded-t-lg",
        props.isTabActive ? "bg-white" : "text-gray-500 bg-gray-200"
      )}
    >
      <button className="px-6 py-2" onClick={() => props.setActiveTab(props.label)}>
        {props.label}
      </button>
    </li>
  );
}

function Posts(props: any) {
  const { userId } = props;
  const { data: posts, error, isLoading, isError } = useGetUserPostsQuery({ userId }, { skip: !userId });

  if (isError) return <span>{JSON.stringify(error)}</span>
  return (
    <section className="justify-center overflow-auto h-post-wrapper md:block md:h-full">
      {isLoading ? (
        <Loader label="Loading posts" />
      ) : (
        posts?.map((post, index) => (<Post key={index} {...post} />))
      )}
    </section>
  );
}

function Albums(props: any) {
  const { userId } = props;
  const { data: albums, error, isLoading, isError } = useGetUserAlbumsQuery({ userId }, { skip: !userId });

  if (isError) return <span>{JSON.stringify(error)}</span>
  return (
    <section className="overflow-auto h-post-wrapper md:h-full">
      {isLoading ? (
        <Loader label="Loading posts" />
      ) : (
        albums?.map((album, index) => (
          <div key={index} className="flex justify-center">
            <article className="w-full p-4 m-4 bg-white rounded-md">
              <h1 className="mb-4 text-xl font-bold">
                {album.title}
              </h1>
              <Link
                to={`/albums/${album.id}`}
                className="px-4 py-2 mt-4 text-sm text-white bg-blue-600 rounded-md"
              >
                View Album
              </Link>
            </article>
          </div>
        ))
      )}
    </section>
  );
}

export default Profile;
