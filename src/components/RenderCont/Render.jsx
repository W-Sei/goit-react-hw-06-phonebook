import React from 'react';
import { List, Item, Button, Name } from './Render.styled';
import { getContacts, getFilter } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactSlice';

export const RenderContact = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
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


