import type { FormData } from '../../schemas/formSchema.ts';

import './Tile.css';

interface Props {
  data: FormData;
}

const Tile: React.FC<Props> = ({ data }) => {
  return (
    <div className="tile">
      <div
        className="tile__background"
        style={{
          background: `url(${data.picture as string})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          filter: 'opacity(25%)',
        }}
      />
      <div className="tile__detail">
        <div className="tile__detail-label">Name:</div>
        <div className="tile__detail-value">{data.name}</div>
      </div>
      <div className="tile__detail">
        <div className="tile__detail-label">Age:</div>
        <div className="tile__detail-value">{data.age}</div>
      </div>
      <div className="tile__detail">
        <div className="tile__detail-label">Gender:</div>
        <div className="tile__detail-value">{data.gender}</div>
      </div>
      <div className="tile__detail">
        <div className="tile__detail-label">Email:</div>
        <div className="tile__detail-value">{data.email}</div>
      </div>
      <div className="tile__detail">
        <div className="tile__detail-label">Password:</div>
        <div className="tile__detail-value">{data.password}</div>
      </div>
      <div className="tile__detail">
        <div className="tile__detail-label">Agree with T&C:</div>
        <div className="tile__detail-value">{data.terms ? 'yes' : 'no'}</div>
      </div>
      <div className="tile__detail">
        <div className="tile__detail-label">Country:</div>
        <div className="tile__detail-value">{data.country}</div>
      </div>
    </div>
  );
};

export default Tile;
