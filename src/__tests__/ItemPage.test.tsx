import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemPage from 'routes/ContentPage/ItemsPage/ItemsPage';

const mockItems = [
  {
    title: 'Acuvue Oasys',
    description: 'Контактные линзы для ежедневного ношения.',
    img: 'test-img-1.jpg',
    price: 1800,
    index: 'ACV001',
  },
  {
    title: 'Biofinity',
    description: 'Линзы для непрерывного ношения на протяжении месяца.',
    img: 'test-img-2.jpg',
    price: 500,
    index: 'BIO002',
  },
];

jest.mock('stores/ItemStore', () => ({
  __esModule: true,
  default: {
    get items() {
      return mockItems;
    },
  },
}));

describe('ItemPage', () => {
  test('renders ItemPage with items', () => {
    render(<ItemPage />);

    mockItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(`${item.price} ₽`)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });
});
