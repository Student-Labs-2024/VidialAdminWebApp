import { makeAutoObservable } from 'mobx';
import PromoDataCardProps from 'types/Promo/PromoDataCardProps';

class PromoStore {
  promos: PromoDataCardProps[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadPromos() {
    const storedPromos = localStorage.getItem('promos');

    if (storedPromos) {
      this.promos = JSON.parse(storedPromos);
    } else {
      const data: PromoDataCardProps[] = [
        {
          id: 0,
          img: '/img/promo1.jpg',
          title: 'Скидка на комплексную проверку зрения',
          description:
            'Скидка 20% на комплексную проверку зрения в наших салонах.',
          fullDescription:
            'Воспользуйтесь скидкой 20% на комплексную проверку зрения. Включает диагностику и консультацию врача-офтальмолога. Акция действительна во всех салонах оптики Vidial. Скидка не суммируется с другими скидками и спец.предложениями. Подробности по тел. 511-333 или у продавцов-консультантов.',
          startDate: new Date('2024-03-01'),
          endDate: new Date('2024-03-31'),
        },
        {
          id: 1,
          img: '/img/promo2.jpg',
          title: 'Скидка на солнцезащитные очки',
          description: 'Скидка 15% на все солнцезащитные очки.',
          fullDescription:
            'Воспользуйтесь скидкой 15% на все солнцезащитные очки. Огромный выбор моделей от ведущих производителей. Акция действительна во всех салонах оптики Vidial. Скидка не суммируется с другими скидками и спец.предложениями. Подробности по тел. 511-333 или у продавцов-консультантов.',
          startDate: new Date('2024-04-01'),
          endDate: new Date('2024-04-30'),
        },
        {
          id: 2,
          img: '/img/promo3.jpg',
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
          img: '/img/promo4.jpg',
          title: 'Скидка на оправы Ray-Ban',
          description: 'Скидка 10% на все оправы Ray-Ban.',
          fullDescription:
            'Воспользуйтесь скидкой 10% на все оправы Ray-Ban. Стильные и качественные оправы для вашего идеального образа. Акция действительна во всех салонах оптики Vidial. Скидка не суммируется с другими скидками и спец.предложениями. Подробности по тел. 511-333 или у продавцов-консультантов.',
          startDate: new Date('2024-06-01'),
          endDate: new Date('2024-06-30'),
        },
        {
          id: 4,
          img: '/img/promo5.jpg',
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
          img: '/img/promo6.jpg',
          title: 'Скидка на детские очки',
          description: 'Скидка 25% на все детские очки.',
          fullDescription:
            'Скидка 25% на все детские очки. Позаботьтесь о здоровье зрения ваших детей. Акция действительна во всех салонах оптики Vidial. Скидка не суммируется с другими скидками и спец.предложениями. Подробности по тел. 511-333 или у продавцов-консультантов.',
          startDate: new Date('2024-08-01'),
          endDate: new Date('2024-08-31'),
        },
      ];
      this.promos = data;
      this.savePromos();
    }
  }

  savePromos() {
    localStorage.setItem('promos', JSON.stringify(this.promos));
  }

  addPromo(promo: PromoDataCardProps) {
    this.promos.push(promo);
    this.savePromos();
  }

  editPromo(updatedPromo: PromoDataCardProps) {
    const index = this.promos.findIndex(
      (promo) => promo.id === updatedPromo.id,
    );

    if (index !== -1) {
      this.promos[index] = updatedPromo;
      this.savePromos();
    }
  }

  async deletePromo(id: number) {
    this.promos = this.promos.filter((promo) => promo.id !== id);
    this.savePromos();
  }

  getPromoById(id: number): PromoDataCardProps | undefined {
    return this.promos.find((promo) => promo.id === id);
  }
}

const promoStore = new PromoStore();
export default promoStore;
