import PromoDataCardProps from 'types/Promo/PromoDataCardProps';
import { instance } from 'api/helpers/axios';

export const getPromos = async () => {
  const response = await instance.get<PromoDataCardProps[]>(`/promos`);

  return response.data;
};

export const addSinglePromo = async (promo: PromoDataCardProps) => {
  const response = await instance.post<PromoDataCardProps>(`/promos`, promo);

  return response.data;
};

export const editSinglePromo = async (
  id: number,
  updatedPromo: PromoDataCardProps,
) => {
  const response = await instance.put<PromoDataCardProps>(
    `/promos/${id}`,
    updatedPromo,
  );

  return response.data;
};

export const deleteSinglePromo = async (id: number) => {
  const response = await instance.delete<PromoDataCardProps>(`/promos/${id}`);

  return response.data;
};
