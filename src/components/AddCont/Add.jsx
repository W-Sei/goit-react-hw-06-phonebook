import React from 'react';
import { Formik } from 'formik';
import Notiflix from 'notiflix';
import { object, string } from 'yup';
import { addContact } from 'redux/contactSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getContacts } from '../../redux/selectors';


import {
  FormSection,
  AddNumberInput,
  Button,
  InputTitle,
  ErrorMes,
} from './Add.styled';

const userSchema = object({
  nameContact: string().required(),
  number: string().required().min(5).max(20),
});

export const AddContact = () => {

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  function handleSubmit(values, { resetForm }) {
    const isName = contacts.some(
      contact => contact.name.toLowerCase() === values.nameContact.toLowerCase()
    );

    if (isName) {
      Notiflix.Notify.info(`${values.nameContact} is already in contacts`);
      return;
    } else {
      dispatch(addContact(values));
      resetForm();
    }
  }
  
  return (
    <Formik
      initialValues={{ nameContact: '', number: '' }}
      onSubmit={handleSubmit}
      validationSchema={userSchema}
    >
      <FormSection>
        <InputTitle>Name</InputTitle>
        <AddNumberInput
          type="text"
          name="nameContact"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <ErrorMes name="nameContact" component="div" />
        <InputTitle>Number</InputTitle>
        <AddNumberInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <ErrorMes name="number" component="div" />
        <Button type="submit">Add contact</Button>
      </FormSection>
    </Formik>
  );
};


