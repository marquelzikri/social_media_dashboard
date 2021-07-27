import { Link } from 'react-router-dom';

import { Album as AlbumModel } from '../../models/Album';

function Album(props: AlbumModel) {
  return (
    <div data-testid="album" className="flex justify-center w-full h-full">
      <article className="w-full p-4 m-4 bg-white rounded-md">
        <h1 className="mb-4 text-xl font-bold">
          {props.title}
        </h1>
        <Link
          to={`/albums/${props.id}`}
          className="px-4 py-2 mt-4 text-sm text-white bg-blue-600 rounded-md"
        >
          View Album
        </Link>
      </article>
    </div>
  );
}

export default Album;
