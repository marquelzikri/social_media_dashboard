import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery, useGetPostCommentsQuery } from '../../../services/posts';
import Loader from '../../components/Loader';

function Posts() {
  const params = useParams<{ id: string }>();
  const postId = params.id ? parseInt(params.id) : undefined;

  const { data: post, isLoading: isPostLoading } = useGetPostByIdQuery({ postId }, { skip: !postId });
  const { data: comments, isLoading: isCommentsLoading } = useGetPostCommentsQuery({ postId }, { skip: !postId && !post?.id });

  if (isPostLoading) return <Loader label="Loading post detail" />
  return (
    <section id="posts" className="justify-between h-full gap-3 overflow-auto">
      <section className="flex justify-center w-full mb-8 md:w-auto">
        <article className="p-4 bg-white rounded-md 2xl:w-1/2">
          <h1 className="mb-4 text-xl font-bold">
            {post?.title}
          </h1>
          <p>
            {post?.body}
          </p>
        </article>
      </section>
      <h1 className="text-lg font-bold">Comments</h1>
      {isCommentsLoading && <Loader label="Loading comments" />}
      {comments?.map((comment, index) => (
        <article key={index} className="p-4 my-4 bg-white rounded-md 2xl:w-1/2">
          <h1 className="mb-4 text-xl font-bold">
            {comment.name}
          </h1>
          <p>
            {comment.body}
          </p>
        </article>
      ))}
    </section>
  );
}

export default Posts;
