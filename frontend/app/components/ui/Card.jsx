import React from 'react';
import PropTypes from 'prop-types';

const Card = props => {
  return (
    <div>Card</div>
  )
}

Card.propTypes = {
    /** Card content */
    children: PropTypes.node.isRequired,
}


export default Card