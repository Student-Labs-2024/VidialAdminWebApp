import PromoDataCardProps from 'types/Promo/PromoDataCardProps';
import { instance } from 'api/helpers/axios';

export const promo = {
  getAllPromos: async (options: { signal?: AbortSignal }) => {
    const response = await instance.get<PromoDataCardProps[]>(`/promos`, {
      signal: options.signal,
    });

    return response.data;
  },
  getCurrentPagePromos: async (
    page: number = 1,
    per_page: number = 6,
    options: { signal?: AbortSignal },
  ) => {
    const response = await instance.get<PromoDataCardProps[]>(`/promos`, {
      params: {
        page,
        per_page,
      },
      signal: options.signal,
    });

    return response.data;
  },
  addSinglePromo: async (promo: PromoDataCardProps) => {
    const response = await instance.post<PromoDataCardProps>(`/promos`, promo);

    return response.data;
  },
  editSinglePromo: async (id: number, updatedPromo: PromoDataCardProps) => {
    const response = await instance.put<PromoDataCardProps>(
      `/promos/${id}`,
      updatedPromo,
    );

    return response.data;
  },
  deleteSinglePromo: async (id: number) => {
    const response = await instance.delete<PromoDataCardProps>(`/promos/${id}`);

    return response.data;
  },
};
