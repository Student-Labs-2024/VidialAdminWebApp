import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import PromosPage from 'routes/ContentPage/PromosPage';
import promoStore from 'stores/PromoStore';
import PromoDataCardProps from 'types/Promo/PromoDataCardProps';

jest.mock('stores/PromoStore', () => ({
  loadPromos: jest.fn(),
  promos: [] as PromoDataCardProps[],
}));

describe('PromosPage', () => {
  beforeEach(() => {
    promoStore.promos = [
      {
        id: 1,
        img: 'img/promo1.jpg',
        title: 'Promo 1',
        description: 'Description 1',
        fullDescription: 'Full Description 1',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-03-31'),
      },
      {
        id: 2,
        img: 'img/promo2.jpg',
        title: 'Promo 2',
        description: 'Description 2',
        fullDescription: 'Full Description 2',
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-04-30'),
      },
    ];
  });

  it('renders PromosPage and displays promos', () => {
    render(
      <BrowserRouter>
        <PromosPage />
      </BrowserRouter>,
    );

    expect(screen.getByText('Promo 1')).toBeInTheDocument;
    expect(screen.getByText('Promo 2')).toBeInTheDocument;
  });
});
