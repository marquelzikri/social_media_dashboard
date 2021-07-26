import { useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from '../containers/Modal';

import PostForm from './PostForm';

import { Post as PostModel } from '../../models/Post';

function Post(props: Partial<PostModel & { showButtons: boolean }>) {
  const userId = 1;
  const {showButtons, ...postData} = props;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => setIsModalVisible((isVisible) => !isVisible);

  return (
    <>
      <div className="flex justify-center w-full">
        <article className="p-4 m-4 bg-white rounded-md">
          <h1 className="text-xl font-bold">
            {postData.title}
          </h1>
          <p className="my-4">
            {postData.body}
          </p>

          {showButtons ? (
            <div className="flex flex-col">
              {postData.userId === userId ? (
                <>
                  <button
                    className="px-4 py-2 mt-4 text-sm text-white bg-green-600 rounded-md"
                    onClick={toggleModal}
                  >
                    Edit Post
                  </button>
                  <button
                    className="px-4 py-2 mt-4 text-sm text-white bg-red-600 rounded-md"
                  >
                    Delete Post
                  </button>
                </>
              ) : null}
              <Link
                to={`/posts/${postData.id}`}
                className="px-4 py-2 mt-4 text-sm text-center text-white bg-blue-600 rounded-md"
              >
                View Comments
              </Link>
            </div>
          ) : null}
        </article>
      </div>
      <Modal isVisible={isModalVisible} onClose={toggleModal}>
        <PostForm id={postData.userId} {...postData} />
      </Modal>
    </>
  );
}

export default Post;
