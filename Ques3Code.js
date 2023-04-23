import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const SingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  const handleClick = useCallback(() => {
    onClickHandler(index);
  }, [index, onClickHandler]);

  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red' }}
      onClick={handleClick}
    >
      {text}
    </li>
  );
};

SingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// List Component
const List = ({ items = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = useCallback((index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  }, [selectedIndex]);

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          key={index}
          onClickHandler={handleClick}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index}
        />
      ))}
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default List;