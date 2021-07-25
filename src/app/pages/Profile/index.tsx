import { useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';

import UserCard from '../../components/UserCard';

import { useGetUserPostsQuery } from '../../../services/posts';

import { useGetUserQuery } from '../../../services/users';


function Profile(props: any) {
  const params = useParams<{ id: string }>();
  const userId = params.id ? parseInt(params.id) : undefined;
  const { data: posts, error, isLoading, isError } = useGetUserPostsQuery({ userId }, { skip: !userId });
  const { data: user } = useGetUserQuery({ userId }, { skip: !userId });

  console.log('posts', posts);
  return (
    <section id="profile" className="flex justify-between gap-3">
      {!Array.isArray(user) ? (<UserCard {...user} />) : null}
      <ProfileContent />
    </section>
  );
}

function ProfileContent() {
  const [activeTab, setActiveTab] = useState('Posts');

  return (
    <section className="w-full">
      <ul className="flex border-b-2 border-gray-200 border-solid cursor-pointer">
        <TabItem isTabActive={activeTab === "Posts"} label={"Posts"} setActiveTab={setActiveTab} />
        <TabItem isTabActive={activeTab === "Albums"} label={"Albums"} setActiveTab={setActiveTab} />
      </ul>
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

export default Profile;
