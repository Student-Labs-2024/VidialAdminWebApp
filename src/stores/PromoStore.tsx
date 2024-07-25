import { makeAutoObservable } from 'mobx';
import PromoDataCardProps from 'types/Promo/PromoDataCardProps';
import { initializePromoData } from 'routes/ContentPage/PromosPage/PromoDataCard';

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
      this.promos = data.map((promo) => ({
        ...promo,
        img: this.createBlobURL(promo.img),
      }));
      this.savePromos();
    }
  }

  savePromos() {
    localStorage.setItem('promos', JSON.stringify(this.promos));
  }

  addPromo(promo: PromoDataCardProps) {
    const newPromo = {
      ...promo,
      img: this.createBlobURL(promo.img),
    };
    this.promos.push(newPromo);
    this.savePromos();
  }

  editPromo(updatedPromo: PromoDataCardProps) {
    const index = this.promos.findIndex(
      (promo) => promo.id === updatedPromo.id,
    );
    if (index !== -1) {
      this.promos[index] = {
        ...updatedPromo,
        img: this.createBlobURL(updatedPromo.img),
      };
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

  private createBlobURL(imgPath: string): string {
    return imgPath.startsWith('blob:')
      ? imgPath
      : URL.createObjectURL(new Blob([imgPath]));
  }
}

const promoStore = new PromoStore();
export default promoStore;
