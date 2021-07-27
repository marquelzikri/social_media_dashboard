import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetPostByIdQuery, useGetPostCommentsQuery } from '../../../services/posts';

import Modal from '../../containers/Modal';

import Comment from '../../components/Comment';
import CommentForm from '../../components/CommentForm';
import Loader from '../../components/Loader';

function Post() {
  const params = useParams<{ id: string }>();
  const postId = params.id ? parseInt(params.id) : undefined;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => setIsModalVisible((isVisible) => !isVisible);

  const { data: post, isLoading: isPostLoading } = useGetPostByIdQuery({ postId }, { skip: !postId });
  const { data: comments, isLoading: isCommentsLoading } = useGetPostCommentsQuery({ postId }, { skip: !postId && !post?.id });

  if (isPostLoading) return <Loader label="Loading post detail" />
  return (
    <>
      <section data-testid="post" className="justify-between h-full gap-3 overflow-auto">
        <section className="mb-8">
          <article className="p-4 bg-white rounded-md">
            <h1 className="mb-4 text-xl font-bold">
              {post?.title}
            </h1>
            <p>
              {post?.body}
            </p>
          </article>
        </section>
        <div className="w-full px-2">
          <div className="flex items-end justify-between mb-12 header">
            <div className="title">
              <p className="text-lg font-bold text-gray-800">
                Comments
              </p>
            </div>
            <div className="text-end">
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="button"
                onClick={toggleModal}
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
        {isCommentsLoading && <Loader label="Loading comments" />}
        <div className="grid items-center justify-items-center">
          {comments?.map((comment, index) => (
            <Comment key={index} showButtons={true} {...comment} />
          ))}
        </div>
      </section>
      <Modal isVisible={isModalVisible} onClose={toggleModal}>
        <CommentForm />
      </Modal>
    </>
  );
}

export default Post;
