import { render, screen } from '@testing-library/react';

import DepartmentsPage from 'routes/ContentPage/DepartmentsPage';
import departmentStore from 'stores/DepartmentStore';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
  Slide: jest.fn(),
}));

jest.mock('stores/DepartmentStore', () => ({
  __esModule: true,
  default: {
    departments: [
      {
        id: 0,
        name: 'Филиал № 1',
        address: 'ТЦ Suncity, 70 лет Октября, 7',
        tel: '8 (3812) 20-20-44',
        longitude: '73.310846',
        latitude: '54.985343',
      },
      {
        id: 1,
        name: 'Филиал № 2',
        address: 'Авиагородок, 38',
        tel: '8 (3812) 552-652',
        longitude: '',
        latitude: '',
      },
    ],
    selectedDepartment: null,
    loadDepartments: jest.fn(),
    selectDepartment: jest.fn(),
    clearSelectedDepartment: jest.fn(),
    deleteDepartmentCoordinates: jest.fn(),
    saveDepartments: jest.fn(),
  },
}));

describe('DepartmentsPage', () => {
  it('renders DepartmentPage with a list of departments', () => {
    render(<DepartmentsPage />);

    expect(screen.getByText('Филиал № 1')).toBeInTheDocument;
    expect(screen.getByText('Филиал № 2')).toBeInTheDocument;

    expect(screen.getByText('ТЦ Suncity, 70 лет Октября, 7')).toBeInTheDocument;
    expect(screen.getByText('Телефон: 8 (3812) 20-20-44')).toBeInTheDocument;
    expect(screen.getByText('Авиагородок, 38')).toBeInTheDocument;
    expect(screen.getByText('Телефон: 8 (3812) 552-652')).toBeInTheDocument;
  });

  test('calls loadDepartments on component render', () => {
    render(<DepartmentsPage />);

    expect(departmentStore.loadDepartments).toHaveBeenCalled();
  });
});
