import { useState } from 'react';

import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';
import PhoneInput from 'react-phone-number-input';
import swal from 'sweetalert';

import contactsOperations from 'redux/contacts/contacts-operations';
import { getContacts } from 'redux/contacts/contacts-selectors';

import styles from './ModalFormUpdateContact.module.scss';

const ModalFormUpdateContact = ({ contact, onCloseModal }) => {
  const { id, name, number } = contact;

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedNumber, setUpdatedNumber] = useState(number);

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setUpdatedName(value);
        break;

      default:
        return;
    }
  };

  const handleUpdateContact = event => {
    event.preventDefault();

    if (name === updatedName && number === updatedNumber) {
      onCloseModal();
      return;
    }

    const filteredContacts = contacts.filter(contact => contact.id !== id);

    const checkSameName = filteredContacts.find(
      ({ name }) => name === updatedName,
    );

    if (checkSameName) {
      swal({
        title: `${checkSameName.name}`,
        text: 'is already in contacts!',
        icon: 'info',
      });

      setUpdatedName(name);
      setUpdatedNumber(number);
      onCloseModal();
      return;
    }

    const checkSameNumber = filteredContacts.find(
      ({ number }) => number === updatedNumber,
    );

    if (checkSameNumber) {
      swal({
        title: 'This number already exists!',
        text: `${checkSameNumber.name}: ${checkSameNumber.number}`,
        icon: 'info',
      });

      setUpdatedName(name);
      setUpdatedNumber(number);
      onCloseModal();
      return;
    }

    const updatedContact = {
      name: updatedName,
      number: updatedNumber,
    };

    dispatch(contactsOperations.updateContact(id, updatedContact));
    onCloseModal();
  };

  return (
    <form className={styles.ContactUpdateItem} onSubmit={handleUpdateContact}>
      <label className={styles.formLabel}>
        <span className={styles.formText}>Name</span>
        <input
          type="text"
          name="name"
          value={updatedName}
          onChange={handleChange}
          autoComplete="off"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="The name can only consist of letters, apostrophes, dashes and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan, etc."
          required
        />
      </label>
      <label className={styles.formLabel}>
        <span className={styles.formText}>Number</span>
        <PhoneInput
          value={updatedNumber}
          onChange={setUpdatedNumber}
          defaultCountry="UA"
          international
          autoComplete="off"
          pattern="((\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?)"
          title="Phone number must be 10-14 digits long, can contain digits and can start with +"
          required
        />
      </label>
      <button className={styles.contactBtnSave} type="submit">
        <span className={styles.btnText}>Save</span>
        <SaveTwoToneIcon />
      </button>
    </form>
  );
};

ModalFormUpdateContact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default ModalFormUpdateContact;
