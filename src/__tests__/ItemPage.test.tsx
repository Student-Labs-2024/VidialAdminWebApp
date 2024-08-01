import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ItemPage from 'routes/ContentPage/ItemsPage';
import itemStore from 'stores/ItemStore';

describe('ItemPage', () => {
  beforeAll(() => {
    itemStore.items = [
      {
        title: 'Acuvue Oasys',
        description: 'Контактные линзы для ежедневного ношения.',
        manufacture: 'Johnson & Johnson',
        brand: 'Acuvue',
        index: 'ACV001',
        cover: 'UV-защита',
        color: 'Прозрачные',
        diameter: 14.0,
        material: 'Силикон-гидрогель',
        geometry: 'Сферические',
        lensType: 'Мягкие',
        lensClass: 'Премиум',
        technology: 'Hydraclear Plus',
        dioptre: -3.0,
        cylinder: 0.0,
        add: 0.0,
        price: 1800,
        amount: 10,
        department: 1,
        img: '/img/acuvue-oasys.png',
      },
      {
        title: 'Biofinity',
        description: 'Линзы для непрерывного ношения на протяжении месяца.',
        manufacture: 'CooperVision',
        brand: 'Biofinity',
        index: 'BIO002',
        cover: 'Нет',
        color: 'Прозрачные',
        diameter: 14.2,
        material: 'Силикон-гидрогель',
        geometry: 'Сферические',
        lensType: 'Мягкие',
        lensClass: 'Стандарт',
        technology: 'Aquaform',
        dioptre: -2.5,
        cylinder: 0.0,
        add: 0.0,
        price: 500,
        amount: 15,
        department: 2,
        img: '/img/biofinity.png',
      },
    ];
  });

  test('renders ItemPage with items', () => {
    render(<ItemPage />);
    expect(screen.getByText('Acuvue Oasys')).toBeInTheDocument();
    expect(screen.getByText('Biofinity')).toBeInTheDocument();
  });

  test('opens modal on edit button click', () => {
    render(<ItemPage />);
    fireEvent.click(screen.getAllByText('Редактировать')[0]);
    expect(screen.getByLabelText('Название товара')).toBeInTheDocument();
  });
});
