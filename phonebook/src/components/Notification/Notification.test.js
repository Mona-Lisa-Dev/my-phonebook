import { render } from '@testing-library/react';
import Notification from './Notification';

describe('Notification', () => {
  test('the first test', () => {
    const { container } = render(<Notification message="Oops" type="notice" />);

    expect(container).toMatchSnapshot();
  });
});
