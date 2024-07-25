import PromoDataCardProps from 'types/Promo/PromoDataCardProps';

const createBlobURL = async (path: string) => {
  const response = await fetch(path);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

async function initializePromoData() {
  const promoDataCards: PromoDataCardProps[] = [
    {
      id: 0,
      img: await createBlobURL('img/promo1.jpg'),
      title: 'Скидка на комплексную проверку зрения',
      description: 'Скидка 20% на комплексную проверку зрения в наших салонах.',
      fullDescription:
        'Воспользуйтесь скидкой 20% на комплексную проверку зрения. Включает диагностику и консультацию врача-офтальмолога. Акция действительна во всех салонах оптики Vidial. Скидка не суммируется с другими скидками и спец.предложениями. Подробности по тел. 511-333 или у продавцов-консультантов.',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-03-31'),
    },
    {
      id: 1,
      img: await createBlobURL('img/promo2.jpg'),
      title: 'Скидка на солнцезащитные очки',
      description: 'Скидка 15% на все солнцезащитные очки.',
      fullDescription:
        'Воспользуйтесь скидкой 15% на все солнцезащитные очки. Огромный выбор моделей от ведущих производителей. Акция действительна во всех салонах оптики Vidial. Скидка не суммируется с другими скидками и спец.предложениями. Подробности по тел. 511-333 или у продавцов-консультантов.',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-04-30'),
    },
    {
      id: 2,
      img: await createBlobURL('img/promo3.jpg'),
      title: 'Акция на контактные линзы Acuvue',
      description:
        'Покупай 3 упаковки контактных линз Acuvue и получай 4-ю в подарок.',
      fullDescription:
        'Купите три упаковки контактных линз Acuvue и получите четвертую упаковку в подарок. Акция действительна во всех салонах оптики Vidial. Скидка не суммируется с другими скидками и спец.предложениями. Подробности по тел. 511-333 или у продавцов-консультантов.',
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-05-31'),
    },
    {
      id: 3,
      img: await createBlobURL('img/promo4.jpg'),
      title: 'Скидка на оправы Ray-Ban',
      description: 'Скидка 10% на все оправы Ray-Ban.',
      fullDescription:
        'Воспользуйтесь скидкой 10% на все оправы Ray-Ban. Стильные и качественные оправы для вашего идеального образа. Акция действительна во всех салонах оптики Vidial. Скидка не суммируется с другими скидками и спец.предложениями. Подробности по тел. 511-333 или у продавцов-консультантов.',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-06-30'),
    },
    {
      id: 4,
      img: await createBlobURL('img/promo5.jpg'),
      title: 'Бесплатная диагностика для пенсионеров',
      description:
        'Бесплатная диагностика зрения для пенсионеров по будним дням.',
      fullDescription:
        'Приходите на бесплатную диагностику зрения для пенсионеров в будние дни. Подробности по тел. 511-333 или у продавцов-консультантов. Акция действительна во всех салонах оптики Vidial.',
      startDate: new Date('2024-07-01'),
      endDate: new Date('2024-07-31'),
    },
    {
      id: 5,
      img: await createBlobURL('img/promo6.jpg'),
      title: 'Скидка на детские очки',
      description: 'Скидка 25% на все детские очки.',
      fullDescription:
        'Скидка 25% на все детские очки. Позаботьтесь о здоровье зрения ваших детей. Акция действительна во всех салонах оптики Vidial. Скидка не суммируется с другими скидками и спец.предложениями. Подробности по тел. 511-333 или у продавцов-консультантов.',
      startDate: new Date('2024-08-01'),
      endDate: new Date('2024-08-31'),
    },
  ];

  return promoDataCards;
}

export { initializePromoData };
