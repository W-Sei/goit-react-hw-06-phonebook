import { useState, useEffect } from 'react';
import { GlobalStyle } from 'GlobalStyles.styled';
import { AddContact } from './AddCont/Add';
import { FilterContact } from './FindCont/Find';
import { RenderContact } from './RenderCont/Render';

import Notiflix from 'notiflix';
import { Wrapper } from './Wrapper/Wrapper.styled';
import { TitleContact, TitleMain } from './Title/Title.styled';
import { ContactsWrapper } from './Wrapper/ContactsWrapper.styled';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contactList')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const handleSubmit = e => {
    const id = nanoid();
    const name = e.name;
    const number = e.number;
    const contactsLists = [...contacts];

    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      Notiflix.Notify.info(`${name} is already in contacts.`);
    } else {
      contactsLists.push({ name, number, id });
    }

    return setContacts(contactsLists);
  };

  const handleDelete = e => {
    setContacts(contacts.filter(contact => contact.id !== e));
    Notiflix.Notify.success('Contact removed sucessfully.');
  };

  const getFilteredContacts = () => {
    const filterContactsList = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });

    return filterContactsList;
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <TitleMain>Phonebook</TitleMain>
      <AddContact handleSubmit={handleSubmit} />
      {contacts.length > 0 && (
        <ContactsWrapper>
          <TitleContact>Contacts:</TitleContact>
          <FilterContact filter={filter} handleChange={handleChange} />
          <RenderContact
            contacts={getFilteredContacts()}
            handleDelete={handleDelete}
          />
        </ContactsWrapper>
      )}
    </Wrapper>
  );
};
