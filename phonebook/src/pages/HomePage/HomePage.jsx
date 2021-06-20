import Container from 'components/Container';

import hero from 'images/bg-home.png';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <Container>
      <div className={styles.HomePage}>
        <img className={styles.HomeImg} src={hero} alt="hero" width="600" />
      </div>
    </Container>
  );
};

export default HomePage;
