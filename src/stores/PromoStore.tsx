import { makeAutoObservable } from 'mobx';
import PromoDataCardProps from 'types/Promo/PromoDataCardProps';
import {
  addSinglePromo,
  getPromos,
  editSinglePromo,
  deleteSinglePromo,
} from 'api/Promo';

class PromoStore {
  promos: PromoDataCardProps[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  isError: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async loadPromos() {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await getPromos();
      this.promos = data;
    } catch (error) {
      this.error = (error as Error).message;
      this.isError = true;
    } finally {
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  }

  async addPromo(promo: PromoDataCardProps) {
    this.isLoading = true;
    this.error = null;
    try {
      const newPromo = await addSinglePromo(promo);
      this.promos.push(newPromo);
    } catch (error) {
      this.error = (error as Error).message;
      this.isError = true;
      console.error('Error adding promo:', (error as Error).message);
    } finally {
      this.isLoading = false;
    }
  }

  async editPromo(updatedPromo: PromoDataCardProps & { promo_id: number }) {
    this.isLoading = true;
    this.error = null;
    try {
      const promo = await editSinglePromo(updatedPromo.promo_id, updatedPromo);
      const index = this.promos.findIndex(
        (promo) => promo.id === updatedPromo.id,
      );
      if (index !== -1) {
        this.promos[index] = promo;
      }
    } catch (error) {
      this.error = (error as Error).message;
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }

  async deletePromo(id: number) {
    this.isLoading = true;
    this.error = null;
    try {
      await deleteSinglePromo(id);
      this.promos = this.promos.filter((promo) => promo.id !== id);
    } catch (error) {
      this.error = (error as Error).message;
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }

  getPromoById(id: number): PromoDataCardProps | undefined {
    return this.promos.find((promo) => promo.id === id);
  }
}

const promoStore = new PromoStore();
export default promoStore;
