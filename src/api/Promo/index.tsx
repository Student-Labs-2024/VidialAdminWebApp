import PromoDataCardProps from 'types/Promo/PromoDataCardProps';
import { instance } from 'api/helpers/axios';

export const getPromos = async () => {
  try {
    const response = await instance.get<PromoDataCardProps[]>(`/promos`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching promos: ${error}`);
  }
};

export const addSinglePromo = async (promo: PromoDataCardProps) => {
  try {
    const response = await instance.post<PromoDataCardProps>(`/promos`, promo);
    return response.data;
  } catch (error) {
    throw new Error(`Error adding promo: ${error}`);
  }
};

export const editSinglePromo = async (
  id: number,
  updatedPromo: PromoDataCardProps,
) => {
  try {
    const response = await instance.put<PromoDataCardProps>(
      `/promos/${id}`,
      updatedPromo,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error updating promo: ${error}`);
  }
};

export const deleteSinglePromo = async (id: number) => {
  try {
    const response = await instance.delete<PromoDataCardProps>(`/promos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting promo: ${error}`);
  }
};
