import { makeAutoObservable } from 'mobx';
import ServiceDataCardProps from 'types/Service/ServiceDataCardProps';

class ServiceStore {
  services: ServiceDataCardProps[] = [];
  selectedService: ServiceDataCardProps | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadServices() {
    const storedServices = localStorage.getItem('services');

    if (storedServices) {
      this.services = JSON.parse(storedServices);
    } else {
      const data: ServiceDataCardProps[] = [
        {
          id: 0,
          title: 'Расширенная консультация врача-офтальмолога',
          description:
            'При заказе очков или мягких контактных линз в оптиках Vidial',
          countProcedures: 0,
          price: 750,
          tag: 'DT',
        },
        {
          id: 1,
          title: 'Первичный подбор мягких контактных линз',
          description:
            'При заказе очков или мягких контактных линз в оптиках Vidial',
          countProcedures: 0,
          price: 750,
          tag: 'DT',
        },
        {
          id: 2,
          title: 'Расширенная консультация врача-офтальмолога',
          description:
            'Без последующего заказа очков или мягких контактных линз в оптиках Vidial',
          countProcedures: 0,
          price: 1500,
          tag: 'DT',
        },
        {
          id: 3,
          title: 'Рефрактометрия',
          description: '',
          countProcedures: 0,
          price: 200,
          tag: 'DT',
        },
        {
          id: 4,
          title: 'Тонометрия',
          description: '',
          countProcedures: 0,
          price: 150,
          tag: 'DT',
        },
        {
          id: 5,
          title: 'Повторный приём',
          description: 'В рамках курса лечения, в том числе после аппаратного',
          countProcedures: 0,
          price: 250,
          tag: 'DT',
        },
        {
          id: 6,
          title: 'Лечение на аппарате ВИЗОТРОНИК',
          description: '',
          countProcedures: 1,
          price: 150,
          tag: 'HT',
        },
        {
          id: 7,
          title: 'Лечение на аппарате ВИЗОТРОНИК',
          description: '',
          countProcedures: 10,
          price: 1500,
          tag: 'HT',
        },
        {
          id: 8,
          title: 'Магнитотерапия на аппарате АМО-АТОС',
          description: '',
          countProcedures: 10,
          price: 1000,
          tag: 'HT',
        },
        {
          id: 9,
          title: 'Магнитотерапия на аппарате АМО-АТОС с приставкой Амблио-1',
          description: '',
          countProcedures: 10,
          price: 1000,
          tag: 'HT',
        },
      ];
      this.services = data;
      this.saveServices();
    }
  }

  saveServices() {
    localStorage.setItem('services', JSON.stringify(this.services));
  }

  addService(service: ServiceDataCardProps) {
    this.services.push(service);
    this.saveServices();
  }

  editService(updatedService: ServiceDataCardProps) {
    const index = this.services.findIndex(
      (service) => service.id === updatedService.id,
    );

    if (index !== -1) {
      this.services[index] = updatedService;
      this.saveServices();
    }
  }

  deleteService(id: number) {
    this.services = this.services.filter((service) => service.id !== id);
    this.saveServices();
  }

  selectService(selectedService: ServiceDataCardProps) {
    this.selectedService = selectedService;
  }

  clearSelectedService() {
    this.selectedService = null;
  }
}

const serviceStore = new ServiceStore();
export default serviceStore;
