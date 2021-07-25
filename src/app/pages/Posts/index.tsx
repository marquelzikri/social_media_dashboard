import { useGetPostsQuery } from '../../../services/posts';
import Post from '../../components/Post';

function Posts() {
  const {data: posts} = useGetPostsQuery({});
  return (
    <div className="w-full h-full">
      <div className="flex items-end justify-between mb-12 header">
        <div className="title">
          <p className="text-4xl font-bold text-gray-800">
            Latest Posts
          </p>
        </div>
        <div className="text-end">
          <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
            Create Post
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 overflow-auto h-post-list md:grid-cols-2 xl:grid-cols-3">
        {posts?.map((post, index) => (<Post key={index} {...post} />))}
      </div>
    </div>
  );
}

export default Posts;
