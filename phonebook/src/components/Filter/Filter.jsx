import { useSelector, useDispatch } from 'react-redux';

import { getFilter } from 'redux/contacts/contacts-selectors';
import * as contactsActions from 'redux/contacts/contacts-actions';

import styles from './Filter.module.scss';

const Filter = () => {
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();
  const onChangeFilter = e =>
    dispatch(contactsActions.changeFilter(e.currentTarget.value));

  return (
    <label className={styles.filterLabel}>
      <span className={styles.filterText}>Find contacts by name</span>
      <input
        className={styles.filterInput}
        type="text"
        placeholder="Enter contact's name"
        value={filter}
        onChange={onChangeFilter}
      />
    </label>
  );
};

export default Filter;
