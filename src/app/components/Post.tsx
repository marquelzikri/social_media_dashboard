import { Link } from 'react-router-dom';
import { Post as PostModel } from '../../models/Post';

function Post(props: Partial<PostModel>) {
  return (
    <div className="flex justify-center w-full">
      <article className="p-4 m-4 bg-white rounded-md">
        <h1 className="text-xl font-bold">
          {props.title}
        </h1>
        <p className="my-4">
          {props.body}
        </p>
        <Link
          to={`/posts/${props.id}`}
          className="px-4 py-2 mt-4 text-sm text-white bg-blue-600 rounded-md"
        >
          View Comments
        </Link>
      </article>
    </div>
  );
}

export default Post;
