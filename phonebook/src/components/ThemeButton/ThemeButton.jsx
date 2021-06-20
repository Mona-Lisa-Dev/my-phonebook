import Brightness5OutlinedIcon from '@material-ui/icons/Brightness5Outlined';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';
import styles from './ThemeButton.module.scss';

const ThemeButton = ({ theme, themeToggler }) => {
  const classNameApp = theme === 'light' ? styles.lightTheme : styles.darkTheme;

  return (
    <button className={styles.ThemeButton} onClick={themeToggler}>
      <Brightness5OutlinedIcon className={classNameApp} />
      <Brightness4OutlinedIcon className={classNameApp} />
    </button>
  );
};

export default ThemeButton;
