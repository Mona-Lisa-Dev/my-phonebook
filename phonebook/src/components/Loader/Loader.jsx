import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/core';

const loader = css`
  display: flex;
  align-items: center;
  justify-content: center;
  // color: #576863;

  margin: 30px;
`;

const Loader = () => <ScaleLoader color={'#576863'} size={25} css={loader} />;

export default Loader;
