import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
    render(){
      const det = this.props.details;

      const isAvailable = det.status === 'available';
      const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';

      return (
        <li className="menu-fish">
          <img src={det.image} alt={det.name}/>
          <h3 className="fish-name">
            {det.name}
            <span className="price">{formatPrice(det.price)}</span>
          </h3>
          <p>{det.desc}</p>
          <button onClick={() => this.props.addToOrder(this.props.index)} disabled={!isAvailable}>{buttonText}</button>
        </li>
      )

    }
}

Fish.propTypes = {
  details: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired,
  addToOrder: React.PropTypes.func.isRequired

}

export default Fish;
