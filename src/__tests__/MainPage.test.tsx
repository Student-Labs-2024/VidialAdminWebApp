import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import MainPage from 'routes/MainPage/MainPage';
import mainPageBoxes from 'routes/MainPage/MainPageBoxes';

describe('MainPage', () => {
  const renderMainPage = () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );
  };

  it('renders welcome message', () => {
    renderMainPage();
    expect(
      screen.getByText('Добро пожаловать в Административную Панель Vidial'),
    ).toBeInTheDocument();
  });

  it('renders all main boxes with titles and texts', () => {
    renderMainPage();

    mainPageBoxes.forEach((box) => {
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
