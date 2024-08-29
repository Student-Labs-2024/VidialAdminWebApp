import { makeAutoObservable } from 'mobx';
import ItemsCardProps from 'types/Items/ItemsCardProps';

class ItemStore {
  items: ItemsCardProps[] = [];
  selectedItem: ItemsCardProps | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadItems() {
    const storedItems = localStorage.getItem('items');

    if (storedItems) {
      this.items = JSON.parse(storedItems);
    } else {
      const data: ItemsCardProps[] = [
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
          img: '/img/item1.jpg',
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
          img: '/img/item2.jpg',
        },
        {
          title: 'Air Optix Night & Day Aqua',
          description:
            'Линзы для круглосуточного ношения на протяжении 30 дней.',
          manufacture: 'Alcon',
          brand: 'Air Optix',
          index: 'AON003',
          cover: 'Нет',
          color: 'Прозрачные',
          diameter: 13.8,
          material: 'Силикон-гидрогель',
          geometry: 'Сферические',
          lensType: 'Мягкие',
          lensClass: 'Премиум',
          technology: 'SmartShield',
          dioptre: -1.75,
          cylinder: 0.0,
          add: 0.0,
          price: 1200,
          amount: 5,
          department: 3,
          img: '/img/item3.jpg',
        },
        {
          title: 'Dailies Total 1',
          description:
            'Ежедневные контактные линзы с высокой кислородопроницаемостью.',
          manufacture: 'Alcon',
          brand: 'Dailies',
          index: 'DAL004',
          cover: 'Нет',
          color: 'Прозрачные',
          diameter: 14.1,
          material: 'Силикон-гидрогель',
          geometry: 'Сферические',
          lensType: 'Мягкие',
          lensClass: 'Премиум',
          technology: 'Water Gradient',
          dioptre: -4.0,
          cylinder: 0.0,
          add: 0.0,
          price: 2200,
          amount: 20,
          department: 4,
          img: '/img/item4.jpg',
        },
        {
          title: 'PureVision 2 HD',
          description: 'Линзы для месячного ношения с высоким разрешением.',
          manufacture: 'Bausch + Lomb',
          brand: 'PureVision',
          index: 'PVN005',
          cover: 'Нет',
          color: 'Прозрачные',
          diameter: 14.0,
          material: 'Силикон-гидрогель',
          geometry: 'Сферические',
          lensType: 'Мягкие',
          lensClass: 'Стандарт',
          technology: 'HD Optics',
          dioptre: -2.0,
          cylinder: 0.0,
          add: 0.0,
          price: 1400,
          amount: 12,
          department: 5,
          img: '/img/item5.jpg',
        },
      ];
      this.items = data;
      this.saveItems();
    }
  }

  saveItems() {
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  editItem(updatedItem: ItemsCardProps) {
    const index = this.items.findIndex(
      (item) => item.index === updatedItem.index,
    );

    if (index !== -1) {
      this.items[index] = updatedItem;
      this.saveItems();
    }
  }

  selectItem(selectedItem: ItemsCardProps) {
    this.selectedItem = selectedItem;
  }

  clearSelectedItem() {
    this.selectedItem = null;
  }

  resetItems() {
    this.items = [];
    this.selectedItem = null;
    localStorage.removeItem('items');
  }
}

const itemStore = new ItemStore();
export default itemStore;
