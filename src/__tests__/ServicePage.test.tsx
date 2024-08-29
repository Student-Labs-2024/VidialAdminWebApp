import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ServicesPage from 'routes/ContentPage/ServicesPage';
import serviceStore from 'stores/ServiceStore';

const mockServices = [
  {
    id: 1,
    title: 'Service 1',
    description: 'Description 1',
    countProcedures: 5,
    price: 1000,
    tag: 'DT',
  },
  {
    id: 2,
    title: 'Service 2',
    description: 'Description 2',
    countProcedures: 0,
    price: 2000,
    tag: 'HT',
  },
];

jest.mock('stores/ServiceStore', () => ({
  loadServices: jest.fn(),
  get services() {
    return this._services;
  },
  set services(value) {
    this._services = value;
  },
  _services: [],
  addService: jest.fn(),
  deleteService: jest.fn(),
}));

describe('ServicesPage', () => {
  beforeEach(() => {
    (serviceStore.loadServices as jest.Mock).mockImplementation(() => {
      serviceStore.services = mockServices;
    });
    serviceStore.services = mockServices;
  });

  test('renders services correctly', async () => {
    render(
      <MemoryRouter>
        <ServicesPage />
        <ToastContainer />
      </MemoryRouter>,
    );

    await waitFor(() => {
      mockServices.forEach((service) => {
        expect(screen.getByText(service.title)).toBeInTheDocument();
        expect(screen.getByText(service.description)).toBeInTheDocument();
        expect(screen.getByText(`${service.price} ₽`)).toBeInTheDocument();

        if (service.countProcedures > 0) {
          expect(
            screen.getByText(`${service.countProcedures} процедур`),
          ).toBeInTheDocument();
        }
      });
    });
  });
});
