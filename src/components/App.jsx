import React from 'react';
import { GlobalStyle } from 'GlobalStyles.styled';
import { AddContact } from './AddCont/Add';
import { FilterContact } from './FindCont/Find';
import { RenderContact } from './RenderCont/Render';

import { Wrapper } from './Wrapper/Wrapper.styled';
import { TitleContact, TitleMain } from './Title/Title.styled';
import { ContactsWrapper } from './Wrapper/ContactsWrapper.styled';

export const App = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <TitleMain>Phonebook</TitleMain>
      <AddContact />

      <ContactsWrapper>
        <TitleContact>Contacts</TitleContact>
        <FilterContact />
        <RenderContact />
      </ContactsWrapper>
    </Wrapper>
  );
};
