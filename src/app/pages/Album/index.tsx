import { useParams } from 'react-router-dom';
import { useGetAlbumByIdQuery, useGetAlbumPhotosQuery } from '../../../services/albums';

function Album() {
  const params = useParams<{ id: string }>();
  const albumId = params.id ? parseInt(params.id) : undefined;

  const { data: album } = useGetAlbumByIdQuery({ albumId }, { skip: !albumId });
  const { data: photos } = useGetAlbumPhotosQuery({ albumId }, { skip: !albumId });
  return (
    <section id="posts" className="justify-between h-full gap-3 overflow-auto">
      <section className="w-full mb-8 md:w-auto">
        <article className="p-4 bg-white rounded-md">
          <h1 className="text-xl font-bold">
            {album?.title}
          </h1>
        </article>
      </section>
      <h1 className="text-lg font-bold">Photos</h1>
      <div className="grid gap-2 overflow-auto justify-items-center sm:grid-cols-2 md:grid-cols-3">
        {photos?.map((photo, index) => (
          <article key={index} className="h-full m-auto overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer h-90 w-60 md:w-80">
            <a href="#" className="block w-full h-full">
              <img alt={photo.title} src={photo.url} className="object-cover w-full max-h-40" />
              <div className="w-full p-4 dark:bg-gray-800">
                <p className="font-medium text-indigo-500 text-md">
                </p>
                <p className="mb-2 text-xl font-medium text-gray-800 dark:text-white">
                  {photo.title}
                </p>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Album;
