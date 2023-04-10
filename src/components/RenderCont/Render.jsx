import React from 'react';
import PropTypes from 'prop-types';
import { List, Item, Button, Name } from './Render.styled';
export const RenderContact = ({ contacts, handleDelete }) => {
  return (
    <List>
      {contacts.map(({ name, number, id }) => (
        <Item key={id}>
          <Name>{name}</Name>
          <p>{number}</p>
          <Button type="button" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Item>
      ))}
    </List>
  );
};

RenderContact.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  handleDelete: PropTypes.func.isRequired,
};