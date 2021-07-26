import { useState } from 'react';

import Modal from '../../containers/Modal';

import Loader from '../../components/Loader';
import Post from '../../components/Post';
import PostForm from '../../components/PostForm';

import { useGetPostsQuery } from '../../../services/posts';

function Posts() {
  const { data: posts, isLoading, isError, error } = useGetPostsQuery({});

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => setIsModalVisible((isVisible) => !isVisible);

  return (
    <>
      <div className="w-full h-full">
        <div className="flex items-end justify-between mb-12 header">
          <div className="title">
            <p className="text-4xl font-bold text-gray-800">
              Latest Posts
            </p>
          </div>
          <div className="text-end">
            <button
              className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
              type="button"
              onClick={toggleModal}
            >
              Create Post
            </button>
          </div>
        </div>
        {isLoading && <Loader label="Loading posts" />}
        {isError && <span>{JSON.stringify(error)}</span>}
        {posts && (
          <div className="grid grid-cols-1 gap-4 overflow-auto h-post-list md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (<Post key={index} showButtons={true} {...post} />))}
          </div>
        )}
      </div>
      <Modal isVisible={isModalVisible} onClose={toggleModal}>
        <PostForm />
      </Modal>
    </>
  );
}

export default Posts;
