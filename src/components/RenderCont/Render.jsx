import React from 'react';
import PropTypes from 'prop-types';
import { List, Item, Button, Name } from './Render.styled';
import { selectContacts, selectFilter } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactSlice';

export const RenderContact = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const filterContact = contacts.filter(cont =>
    cont.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <List>
      {filterContact.map(({ name, number, id }) => (
        <Item key={id}>
          <Name>{name}</Name>
          <p>{number}</p>
          <Button
            type="button"
            onClick={() => {
              dispatch(deleteContact(id));
            }}
          >
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
};
