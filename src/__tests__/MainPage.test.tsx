import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainPage from '../routes/MainPage/MainPage';
import { MemoryRouter } from 'react-router-dom';
import MainPageBoxes from '../routes/MainPage/MainPageBoxes';

describe('MainPage', () => {
  it('renders welcome message', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );
    expect(
      screen.getByText('Добро пожаловать в Административную Панель Vidial'),
    ).toBeInTheDocument();
  });

  it('renders all main boxes with titles and texts', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );

    MainPageBoxes.forEach((box) => {
      const titleElements = screen.getAllByText(box.title);
      expect(titleElements.length).toBeGreaterThan(0);

      Object.values(box.text).forEach((childText) => {
        const textElements = screen.getAllByText(
          new RegExp(childText.title, 'i'),
        );
        expect(textElements.length).toBeGreaterThan(0);
      });
    });
  });
});
