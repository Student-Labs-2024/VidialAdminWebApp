import { makeAutoObservable } from 'mobx';
import { Slide, toast } from 'react-toastify';

import PromoDataCardProps from 'types/Promo/PromoDataCardProps';
import api from 'api';

class PromoStore {
  promos: PromoDataCardProps[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  selectedPromo: PromoDataCardProps | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadPromos() {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await api.getPromos();
      this.promos = data;
    } catch (error) {
      this.error = (error as Error).message;
    } finally {
      this.isLoading = false;
    }
  }

  async addPromo(promo: PromoDataCardProps) {
    this.isLoading = true;
    this.error = null;
    try {
      const newPromo = await api.addSinglePromo(promo);
      this.promos.push(newPromo);
      toast.success('Акция добавлена!', {
        transition: Slide,
      });
    } catch (error) {
      this.error = (error as Error).message;
      console.error('Error adding promo:', (error as Error).message);
      toast.error(`Ошибка при добавлении акции: ${promoStore.error}`, {
        transition: Slide,
      });
    } finally {
      this.isLoading = false;
    }
  }

  async editPromo(updatedPromo: PromoDataCardProps & { promo_id: number }) {
    this.isLoading = true;
    this.error = null;
    try {
      const promo = await api.editSinglePromo(
        updatedPromo.promo_id,
        updatedPromo,
      );
      const index = this.promos.findIndex(
        (promo) => promo.id === updatedPromo.id,
      );

      if (index !== -1) {
        this.promos[index] = promo;
      }

      toast.success('Акция отредактирована!', {
        transition: Slide,
      });
    } catch (error) {
      this.error = (error as Error).message;
      toast.error(`Ошибка при редактировании акции: ${promoStore.error}`, {
        transition: Slide,
      });
    } finally {
      this.isLoading = false;
    }
  }

  async deletePromo(id: number) {
    this.isLoading = true;
    this.error = null;
    try {
      await api.deleteSinglePromo(id);
      this.promos = this.promos.filter((promo) => promo.id !== id);
      toast.success('Акция удалена!', { transition: Slide });
    } catch (error) {
      this.error = (error as Error).message;
      toast.error('Что-то пошло не так!', { transition: Slide });
    } finally {
      this.isLoading = false;
    }
  }

  getPromoById(id: number): PromoDataCardProps | undefined {
    return this.promos.find((promo) => promo.id === id);
  }

  selectPromo(selectedPromo: PromoDataCardProps) {
    this.selectedPromo = selectedPromo;
  }

  clearSelectedPromo() {
    this.selectedPromo = null;
  }
}

const promoStore = new PromoStore();
export default promoStore;
