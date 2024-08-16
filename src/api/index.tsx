import {
  getPromos,
  addSinglePromo,
  editSinglePromo,
  deleteSinglePromo,
} from './Promo';
import { department } from './department';
import { doctor } from './doctor';

const api = {
  getPromos,
  addSinglePromo,
  editSinglePromo,
  deleteSinglePromo,
  department,
  doctor,
};

export default api;
