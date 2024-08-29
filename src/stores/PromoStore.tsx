import { makeAutoObservable } from 'mobx';
import { Slide, toast } from 'react-toastify';

import PromoDataCardProps from 'types/Promo/PromoDataCardProps';
import api from 'api';

class PromoStore {
  allPromos: PromoDataCardProps[] = [];
  promos: PromoDataCardProps[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  selectedPromo: PromoDataCardProps | null = null;
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 6;

  constructor() {
    makeAutoObservable(this);
  }

  async loadPromos(page: number = 1, options: { signal?: AbortSignal }) {
    this.isLoading = true;
    this.error = null;
    try {
      const promos = await api.promo.getCurrentPagePromos(
        page,
        this.itemsPerPage,
        options,
      );
      this.allPromos = await api.promo.getAllPromos(options);
      this.promos = promos;
      this.currentPage = page;
      this.totalPages = Math.ceil(this.allPromos.length / this.itemsPerPage);
    } catch (error) {
      if (error === 'AbortError') {
        console.log('Request aborted');
      } else {
        this.error = (error as Error).message;
      }
    } finally {
      this.isLoading = false;
    }
  }

  async addPromo(promo: PromoDataCardProps) {
    this.isLoading = true;
    this.error = null;
    try {
      const newPromo = await api.promo.addSinglePromo(promo);
      this.allPromos.push(newPromo);
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
      const promo = await api.promo.editSinglePromo(
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
      await api.promo.deleteSinglePromo(id);
      this.allPromos = this.allPromos.filter((promo) => promo.id !== id);
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
