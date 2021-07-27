import { useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';

import Loader from '../../components/Loader';
import Post from '../../components/Post';
import UserCard from '../../components/UserCard';

import { useGetUserAlbumsQuery } from '../../../services/albums';
import { useGetUserPostsQuery } from '../../../services/posts';
import { useGetUserQuery } from '../../../services/users';
import Album from '../../components/Album';


function Profile() {
  const params = useParams<{ id: string }>();
  const userId = params.id ? parseInt(params.id) : undefined;
  const { data: user, isLoading } = useGetUserQuery({ userId }, { skip: !userId });

  return (
    <section data-testid="profile" className="justify-between h-full gap-3 md:flex">
      <section className="flex justify-center w-full mb-8 md:w-auto">
        <UserCard isLoading={isLoading} {...user} />
      </section>
      {userId && (<ProfileContent userId={userId} />)}
    </section>
  );
}

function ProfileContent(props: {userId: number}) {
  const { userId } = props;

  const [activeTab, setActiveTab] = useState('Posts');

  return (
    <section data-testid="profile-content" className="w-full md:h-full h-profile-content">
      <ul className="flex h-10 border-b-2 border-gray-200 border-solid cursor-pointer">
        <TabItem index={0} isTabActive={activeTab === "Posts"} label={"Posts"} setActiveTab={setActiveTab} />
        <TabItem index={1} isTabActive={activeTab === "Albums"} label={"Albums"} setActiveTab={setActiveTab} />
      </ul>
      {activeTab === "Posts" && <Posts userId={userId} />}
      {activeTab === "Albums" && <Albums userId={userId} />}
    </section>
  );
}

function TabItem(props: {index: number, label: string, isTabActive: boolean, setActiveTab: Function}) {
  return (
    <li
      data-testid={`tab-item-${props.index}`}
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

function Posts(props: {userId: number}) {
  const { userId } = props;
  const { data: posts, error, isLoading, isError } = useGetUserPostsQuery({ userId }, { skip: !userId });

  if (isError) return <span>{JSON.stringify(error)}</span>
  return (
    <section data-testid="user-posts" className="justify-center overflow-auto h-post-wrapper md:block md:h-full">
      {isLoading ? (
        <Loader label="Loading posts" />
      ) : (
        posts?.map((post, index) => (<Post key={index} {...post} />))
      )}
    </section>
  );
}

function Albums(props: {userId: number}) {
  const { userId } = props;
  const { data: albums, error, isLoading, isError } = useGetUserAlbumsQuery({ userId }, { skip: !userId });

  if (isError) return <span>{JSON.stringify(error)}</span>
  return (
    <section data-testid="user-albums" className="overflow-auto h-post-wrapper md:h-full">
      {isLoading ? (
        <Loader label="Loading posts" />
      ) : (
        <div>
          {albums?.map((album, index) => (<Album key={index} {...album} />))}
        </div>
      )}
    </section>
  );
}

export default Profile;
