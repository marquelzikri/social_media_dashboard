import { useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from '../containers/Modal';

import Loader from './Loader';
import PostForm from './PostForm';

import { Post as PostModel } from '../../models/Post';
import { useDeletePostMutation } from '../../services/posts';

function Post(props: Partial<PostModel & { showButtons: boolean }>) {
  const userId = 1;
  const { showButtons, ...postData } = props;

  const [deletePost, {
    isLoading: isDeleting,
    isError: isDeletePostError,
    isSuccess: isDeletePostSuccess,
    error: deletePostError,
  }] = useDeletePostMutation();

  const [isEditingPost, setIsEditingPost] = useState(false);
  const [isDeletingPost, setIsDeletingPost] = useState(false);

  const toggleEditPostModal = () => setIsEditingPost((isVisible) => !isVisible);
  const toggleDeletePostModal = () => setIsDeletingPost((isDeletingPost) => !isDeletingPost);
  const deletePostClickHandler = () => {
    setIsDeletingPost(true);
    deletePost({ id: postData.id! })
  };

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
                    onClick={toggleEditPostModal}
                  >
                    Edit Post
                  </button>
                  <button
                    className="px-4 py-2 mt-4 text-sm text-white bg-red-600 rounded-md"
                    onClick={deletePostClickHandler}
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
      <Modal isVisible={isEditingPost} onClose={toggleEditPostModal}>
        <PostForm id={postData.userId} {...postData} />
      </Modal>
      <Modal isVisible={isDeletingPost} onClose={toggleDeletePostModal}>
        <section className="p-6 bg-white rounded-md">
          {isDeleting && <Loader label="Deleting post..." />}
          {isDeletePostSuccess && <span className="text-lg font-bold">Post deleted</span>}
          {isDeletePostError && <span>{JSON.stringify(deletePostError)}</span>}
        </section>
      </Modal>
    </>
  );
}

export default Post;
