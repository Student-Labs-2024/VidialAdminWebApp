import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import DoctorsPage from 'routes/ContentPage/DoctorsPage';

jest.mock('stores/DoctorStore', () => {
  return {
    loadDoctors: jest.fn(),
    doctors: [
      {
        id: 1,
        first_name: 'John',
        family_name: 'Doe',
        patronymic_name: 'A',
        name: 'John A. Doe',
        category: 'Cardiologist',
        portrait: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        first_name: 'Jane',
        family_name: 'Doe',
        patronymic_name: 'B',
        name: 'Jane B. Doe',
        category: 'Neurologist',
        portrait: '',
      },
    ],
    selectedDoctor: null,
    selectDoctor: jest.fn(),
    clearSelectedDoctor: jest.fn(),
    deleteDoctorPhoto: jest.fn(),
    saveDoctors: jest.fn(),
  };
});

describe('DoctorsPage', () => {
  test('renders buttons for doctors with and without photos', () => {
    render(<DoctorsPage />);

    const deletePhotoButton = screen.getByText(/Удалить фото/);
    expect(deletePhotoButton).toBeInTheDocument();

    const addPhotoButton = screen.getByText(/Добавить фото/);
    expect(addPhotoButton).toBeInTheDocument();
  });
});
