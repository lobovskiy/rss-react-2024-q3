import { useAppSelector } from '../../redux/hooks.ts';

import Tile from '../../components/Tile/Tile.tsx';

const TileList = () => {
  const tiles = useAppSelector((state) => state.tiles.list);

  if (!tiles.length) {
    return <div className="tile-list">There are no tiles yet!</div>;
  }

  return tiles.map((tile, i) => <Tile key={i} data={tile} />);
};

export default TileList;
