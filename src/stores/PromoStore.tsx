// src/stores/PromoStore.ts
import { makeAutoObservable } from 'mobx';
import { initializePromoData } from 'routes/ContentPage/PromosPage/PromoDataCard';
import PromoDataCardProps from 'types/Promo/PromoDataCardProps';

class PromoStore {
  promos: PromoDataCardProps[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadPromos();
  }

  async loadPromos() {
    const storedPromos = localStorage.getItem('promos');
    if (storedPromos) {
      this.promos = JSON.parse(storedPromos);
    } else {
      const data = await initializePromoData();
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

  deletePromo(id: number) {
    this.promos = this.promos.filter((promo) => promo.id !== id);
    this.savePromos();
  }

  getPromoById(id: number): PromoDataCardProps | undefined {
    return this.promos.find((promo) => promo.id === id);
  }
}

const promoStore = new PromoStore();
export default promoStore;
