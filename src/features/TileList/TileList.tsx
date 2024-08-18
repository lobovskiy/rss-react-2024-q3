import { useAppSelector } from '../../redux/hooks.ts';

import Tile from '../../components/Tile/Tile';

import './TileList.css';

const TileList = () => {
  const tiles = useAppSelector((state) => state.tiles.list);

  if (!tiles.length) {
    return <div className="tile-list">There are no tiles yet!</div>;
  }

  return (
    <div className="tile-list">
      {tiles.map((tile, i) => (
        <Tile key={i} data={tile} />
      ))}
    </div>
  );
};

export default TileList;
