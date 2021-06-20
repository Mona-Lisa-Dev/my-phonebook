import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import {
  getContacts,
  getContactsToShow,
} from 'redux/contacts/contacts-selectors';
import contactsOperations from 'redux/contacts/contacts-operations';

import Notification from 'components/Notification';
import ContactItem from '../ContactItem';
import styles from './ContactList.module.scss';

const ContactList = () => {
  const allContacts = useSelector(getContacts);
  const contacts = useSelector(getContactsToShow);

  const [initialState, setInitialState] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => setInitialState(contacts), [contacts]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      initialState,
      result.source.index,
      result.destination.index,
    );

    setInitialState(items);

    const startContact = contacts[result.source.index];
    const endContact = contacts[result.destination.index];

    const startContactForFetch = {
      name: startContact.name,
      number: startContact.number,
    };
    const endContactForFetch = {
      name: endContact.name,
      number: endContact.number,
    };

    const idStartContact = startContact.id;
    const idEndContact = endContact.id;

    dispatch(
      contactsOperations.updateContact(idStartContact, endContactForFetch),
    );
    dispatch(
      contactsOperations.updateContact(idEndContact, startContactForFetch),
    );
  };

  // return allContacts.length > 0 ? (
  //   <ul className={styles.ContactList}>
  //     {contacts.map(contact => {
  //       const { id } = contact;

  //       return <ContactItem key={id} contact={contact} />;
  //     })}
  //   </ul>
  // ) : (
  //   <Notification message="Contact book is empty" />
  // );

  return allContacts.length > 0 ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <ul
            className={styles.ContactList}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {initialState.map((contact, index) => {
              const { id } = contact;

              return <ContactItem key={id} contact={contact} index={index} />;
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  ) : (
    <Notification message="Contact book is empty" />
  );
};

export default ContactList;
