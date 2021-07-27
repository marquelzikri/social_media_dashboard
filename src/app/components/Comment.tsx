import { useState } from 'react';

import Modal from '../containers/Modal';

import CommentForm from './CommentForm';
import Loader from './Loader';

import { Comment as CommentModel } from '../../models/Post';

import { useDeleteCommentMutation } from '../../services/posts';

function Comment(props: Partial<CommentModel & { showButtons?: boolean }>) {
  const [deleteComment, {
    isLoading: isDeleting,
    isError: isDeletePostError,
    isSuccess: isDeletePostSuccess,
    error: deletePostError,
  }] = useDeleteCommentMutation();

  const [isEditingComment, setIsEditingComment] = useState(false);
  const [isDeletingComment, setIsDeletingComment] = useState(false);

  const toggleEditCommentModal = () => setIsEditingComment((isVisible) => !isVisible);
  const toggleDeleteCommentModal = () => setIsDeletingComment((isDeletingPost) => !isDeletingPost);
  const deleteCommentClickHandler = () => {
    setIsDeletingComment(true);
    deleteComment({ id: props.id, postId: props.postId });
  };

  return (
    <>
      <article data-testid="comment" className="p-4 my-4 bg-white rounded-md 2xl:w-1/2">
        <h1 className="text-xl font-bold">
          {props.name}
        </h1>
        <span className="block mb-4 text-sm text-gray-500">
          {props.email}
        </span>
        <p>
          {props.body}
        </p>
        {props.showButtons ? (
          <div className="flex gap-2">
            <button
              className="px-4 py-2 mt-4 text-sm text-white bg-green-600 rounded-md"
              onClick={toggleEditCommentModal}
            >
              Edit Comment
            </button>
            <button
              className="px-4 py-2 mt-4 text-sm text-white bg-red-600 rounded-md"
              onClick={deleteCommentClickHandler}
            >
              Delete Comment
            </button>
          </div>
        ) : null}
      </article>
      <Modal isVisible={isEditingComment} onClose={toggleEditCommentModal}>
        <CommentForm {...props} />
      </Modal>
      <Modal isVisible={isDeletingComment} onClose={toggleDeleteCommentModal}>
        <section className="p-6 bg-white rounded-md">
          {isDeleting && <Loader label="Deleting post..." />}
          {isDeletePostSuccess && <span className="text-lg font-bold">Post deleted</span>}
          {isDeletePostError && <span>{JSON.stringify(deletePostError)}</span>}
        </section>
      </Modal>
    </>
  );
}

export default Comment;
