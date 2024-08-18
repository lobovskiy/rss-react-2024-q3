import classNames from 'classnames';

import { StoredFormData } from '../../types';

import './Tile.css';

interface Props {
  data: StoredFormData;
  lastAddedTileId?: string;
}

const Tile: React.FC<Props> = ({ data, lastAddedTileId }) => {
  const { id, picture, name, age, gender, email, password, terms, country } =
    data;
  const className = classNames('tile', { tile_new: lastAddedTileId === id });

  return (
    <div className={className}>
      <div
        className="tile__background"
        style={{
          background: `url(${picture as string})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          filter: 'opacity(25%)',
        }}
      />
      <div className="tile__detail">
        <div className="tile__detail-label">Name:</div>
        <div className="tile__detail-value">{name}</div>
      </div>
      <div className="tile__detail">
        <div className="tile__detail-label">Age:</div>
        <div className="tile__detail-value">{age}</div>
      </div>
      <div className="tile__detail">
        <div className="tile__detail-label">Gender:</div>
        <div className="tile__detail-value">{gender}</div>
      </div>
      <div className="tile__detail">
        <div className="tile__detail-label">Email:</div>
        <div className="tile__detail-value">{email}</div>
      </div>
      <div className="tile__detail">
        <div className="tile__detail-label">Password:</div>
        <div className="tile__detail-value">{password}</div>
      </div>
      <div className="tile__detail">
        <div className="tile__detail-label">Agree with T&C:</div>
        <div className="tile__detail-value">{terms ? 'yes' : 'no'}</div>
      </div>
      <div className="tile__detail">
        <div className="tile__detail-label">Country:</div>
        <div className="tile__detail-value">{country}</div>
      </div>
    </div>
  );
};

export default Tile;
