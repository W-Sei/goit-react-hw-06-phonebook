import React from 'react';
import { ContactsInput, LabelTitle, NameInputWrapper } from './Find.styled';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';


export const FilterContact = () => {
  const dispatch = useDispatch();
  const changeFieldFilter = evt => dispatch(setFilter(evt.currentTarget.value));

  return (
    <NameInputWrapper>
      <LabelTitle>Find contacts by name</LabelTitle>
      <ContactsInput name="filter" type="text" onChange={changeFieldFilter} />
    </NameInputWrapper>
  );
};


