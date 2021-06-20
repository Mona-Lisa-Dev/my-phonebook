import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PhoneInput from 'react-phone-number-input';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import swal from 'sweetalert';

import contactsOperations from 'redux/contacts/contacts-operations';
import { getContacts } from 'redux/contacts/contacts-selectors';

import styles from './ContactForm.module.scss';
import 'react-phone-number-input/style.css';

const ContactForm = () => {
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const inputRef = useRef();
  useEffect(() => inputRef.current.focus(), []);

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setContactName(value);
        break;

      default:
        return;
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    const checkSameName = contacts.find(({ name }) => name === contactName);

    const checkSameNumber = contacts.find(
      ({ number }) => number === contactNumber,
    );

    if (checkSameNumber) {
      const { name, number } = checkSameNumber;
      swal({
        title: 'This number already exists!',
        text: `${name}: ${number}`,
        icon: 'info',
      });
      return;
    }

    if (checkSameName) {
      swal({
        title: `${contactName}`,
        text: 'is already in contacts!',
        icon: 'info',
      });
      return;
    }

    dispatch(contactsOperations.addContact(contactName, contactNumber));
    reset();
  };

  const reset = () => {
    setContactName('');
    setContactNumber('');
  };

  return (
    <form className={styles.ContactForm} onSubmit={handleFormSubmit}>
      <label className={styles.formLabel}>
        <span className={styles.formText}>Name</span>
        <input
          className={styles.formInput}
          type="text"
          placeholder="Enter contact's name"
          name="name"
          value={contactName}
          onChange={handleChange}
          autoComplete="off"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="The name can only consist of letters, apostrophes, dashes and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan, etc."
          ref={inputRef}
          required
        />
      </label>
      <label className={styles.formLabel}>
        <span className={styles.formText}>Number</span>
        <PhoneInput
          value={contactNumber}
          onChange={setContactNumber}
          defaultCountry="UA"
          international
          autoComplete="off"
          pattern="((\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?)"
          title="Phone number must be 10-14 digits long, can contain digits and can start with +"
          required
        />
      </label>

      <button className={styles.formBtn} type="submit">
        <span className={styles.btnText}>Add contact</span>
        <PersonAddTwoToneIcon />
      </button>
    </form>
  );
};

export default ContactForm;
