import axios from 'axios';
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  updateContactRequest,
  updateContactSuccess,
  updateContactError,
} from './contacts-actions';

const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());

  try {
    const { data } = await axios.get('/contacts');
    dispatch(fetchContactsSuccess(data));

    return data;
  } catch (error) {
    dispatch(fetchContactsError(error.message));
  }
};

const addContact = (name, number) => async dispatch => {
  const contact = { name, number };
  dispatch(addContactRequest());

  try {
    const { data } = await axios.post('/contacts', contact);
    dispatch(addContactSuccess(data));

    return data;
  } catch (error) {
    dispatch(addContactError(error.message));
  }
};

const deleteContact = contactId => async dispatch => {
  dispatch(deleteContactRequest());

  try {
    const { data } = await axios.delete(`/contacts/${contactId}`);
    dispatch(deleteContactSuccess(contactId));

    return data;
  } catch (error) {
    dispatch(deleteContactError(error.message));
  }
};

const updateContact = (id, updatedContact) => async dispatch => {
  dispatch(updateContactRequest());

  try {
    const { data } = await axios.patch(`/contacts/${id}`, updatedContact);
    dispatch(updateContactSuccess(data));

    return data;
  } catch (error) {
    dispatch(updateContactError(error.message));
  }
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
};
