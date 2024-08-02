import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ServiceAllContent from 'routes/ContentPage/ServicesPage/ServiceAllContent';
import { ToastContainer } from 'react-toastify';
import serviceStore from 'stores/ServiceStore';

// Mock data
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
  services: [],
  addService: jest.fn(),
  deleteService: jest.fn(),
}));

describe('ServiceAllContent', () => {
  beforeEach(() => {
    (serviceStore.loadServices as jest.Mock).mockImplementation(() => {
      serviceStore.services = mockServices;
    });
  });

  test('renders services correctly', () => {
    render(
      <MemoryRouter>
        <ServiceAllContent />
        <ToastContainer />
      </MemoryRouter>,
    );

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
