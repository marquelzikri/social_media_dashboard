import { useGetAlbumsQuery } from '../../../services/albums';

import Album from '../../components/Album';
import Loader from '../../components/Loader';

function Albums() {
  const { data: albums, isLoading, isError, error } = useGetAlbumsQuery({});

  if (isLoading) return <Loader label="Loading albums" />
  if (isError) return <span>{JSON.stringify(error)}</span>
  return (
    <div
      data-testid="albums"
      className="grid h-full gap-2 overflow-auto justify-items-center sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4"
    >
      {albums?.map((album, index) => <Album key={index} {...album} />)}
    </div>
  );
}

export default Albums;
