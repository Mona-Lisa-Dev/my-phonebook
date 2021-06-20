import PropTypes from 'prop-types';
import styles from './Notification.module.scss';

const Notification = ({ message, type }) => {
  const classNameType = type === 'error' ? styles.error : styles.notice;

  return <p className={classNameType}>{message}</p>;
};

Notification.defaultProps = {
  type: 'notice',
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Notification;
