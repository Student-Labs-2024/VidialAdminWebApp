interface MainPageBoxesProps {
  title: string;
  text: { [key: string]: { [key: string]: string } };
}

const mainPageBoxes: MainPageBoxesProps[] = [
  {
    title: 'Контент',
    text: {
      text1: {
        title: 'Акции:',
        description: 'Добавление, редактирование и удаление акций.',
      },
      text2: {
        title: 'Услуги:',
        description: 'Управление перечнем предоставляемых услуг.',
      },
      text3: {
        title: 'Товары:',
        description: 'Обновление информации о товарах.',
      },
      text4: {
        title: 'Филиалы:',
        description: 'Управление информацией о филиалах.',
      },
      text5: {
        title: 'Доктора:',
        description: 'Добавление и редактирование информации о докторах.',
      },
    },
  },
  {
    title: 'Полезные советы',
    text: {
      text1: {
        title: 'Обновление контента:',
        description:
          'Не забывайте сохранять изменения после редактирования карточек контента.',
      },
      text2: {
        title: 'Профиль:',
        description:
          'В правом верхнем углу отображается ваш профиль. Нажмите на него для доступа к настройкам профиля и выхода из системы.',
      },
      text3: {
        title: 'Поиск:',
        description:
          'В любом разделе контента используйте поисковое поле для быстрого поиска карточек контента.',
      },
    },
  },
];

export default mainPageBoxes;
