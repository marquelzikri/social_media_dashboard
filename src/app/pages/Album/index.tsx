import { useParams } from 'react-router-dom';
import { useGetAlbumByIdQuery, useGetAlbumPhotosQuery } from '../../../services/albums';
import Loader from '../../components/Loader';

function Album() {
  const params = useParams<{ id: string }>();
  const albumId = params.id ? parseInt(params.id) : undefined;

  const { data: album, isLoading: isAlbumLoading } = useGetAlbumByIdQuery({ albumId }, { skip: !albumId });
  const { data: photos, isLoading: isPhotosLoading } = useGetAlbumPhotosQuery({ albumId }, { skip: !albumId });
  return (
    <section data-testid="album" className="justify-between h-full gap-3 overflow-auto">
      <section className="w-full mb-8 md:w-auto">
        <article className="p-4 bg-white rounded-md">
          {isAlbumLoading && <Loader label="Loading album info" />}
          {album && (
            <h1 className="text-xl font-bold">
              {album.title}
            </h1>
          )}
        </article>
      </section>
      <h1 className="text-lg font-bold">Photos</h1>
      {isPhotosLoading && <Loader label="Loading photos" />}
      {photos && (
        <div data-testid="photo" className="grid gap-2 overflow-auto justify-items-center sm:grid-cols-2 xl:grid-cols-3">
          {photos.map((photo, index) => (
            <article key={index} className="h-full m-auto overflow-hidden bg-white rounded-lg shadow-lg h-90 w-60 md:w-80">
              <div className="block w-full h-full">
                <img alt={photo.title} src={photo.url} className="object-cover w-full max-h-40" />
                <div className="w-full p-4 dark:bg-gray-800">
                  <p className="mb-2 text-xl font-medium text-gray-800 dark:text-white">
                    {photo.title}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Album;
