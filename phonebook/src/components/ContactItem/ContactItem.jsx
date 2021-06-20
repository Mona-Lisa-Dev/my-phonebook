import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import swal from 'sweetalert';
import { Draggable } from 'react-beautiful-dnd';

import Modal from 'components/Modal';
import ModalFormUpdateContact from 'components/ModalFormUpdateContact';
import contactsOperations from 'redux/contacts/contacts-operations';

import styles from './ContactItem.module.scss';

const ContactItem = ({ contact, index }) => {
  const { id, name, number } = contact;

  const [showModal, setShowModal] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const dispatch = useDispatch();

  const onDeleteContact = () => dispatch(contactsOperations.deleteContact(id));
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'favorite':
        setFavorite(!favorite);

        if (!favorite) {
          swal(`If you like me, call me (◕‿◕)♡! ${value}`);
        }
        break;

      default:
        return;
    }
  };

  return (
    <>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <ModalFormUpdateContact
            contact={contact}
            onCloseModal={handleCloseModal}
          />
        </Modal>
      )}

      {/* <li className={styles.ContactItem}>
        <label>
          <div className={styles.favoriteWrap}>
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="favorite"
              value={name}
              onChange={handleChange}
              size="small"
            />
            <span className={styles.contactName}>{name}:</span>
          </div>

          <a
            className={styles.phoneNumber}
            href={'tel:' + number}
            aria-label="Call"
          >
            {number}
          </a>
        </label>

        <div>
          <button
            className={styles.contactBtn}
            onClick={handleShowModal}
            title="Update contact"
          >
            <EditTwoToneIcon />
          </button>
          <button
            className={styles.contactBtn}
            onClick={onDeleteContact}
            title="Delete contact"
          >
            <DeleteForeverTwoToneIcon />
          </button>
        </div>
      </li> */}

      <Draggable key={id} draggableId={String(id)} index={index}>
        {(provided, snapshot) => (
          <li
            className={styles.ContactItem}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <label>
              <div className={styles.favoriteWrap}>
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  name="favorite"
                  value={name}
                  onChange={handleChange}
                  size="small"
                />
                <span className={styles.contactName}>{name}:</span>
              </div>

              <a
                className={styles.phoneNumber}
                href={'tel:' + number}
                aria-label="Call"
              >
                {number}
              </a>
            </label>

            <div>
              <button
                className={styles.contactBtn}
                onClick={handleShowModal}
                title="Update contact"
              >
                <EditTwoToneIcon />
              </button>
              <button
                className={styles.contactBtn}
                onClick={onDeleteContact}
                title="Delete contact"
              >
                <DeleteForeverTwoToneIcon />
              </button>
            </div>
          </li>
        )}
      </Draggable>
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactItem;
