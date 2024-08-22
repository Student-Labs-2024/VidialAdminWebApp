import {
  getPromos,
  addSinglePromo,
  editSinglePromo,
  deleteSinglePromo,
} from './Promo';
import { department } from './department';
import { doctor } from './doctor';
import { auth } from './auth';

const api = {
  getPromos,
  addSinglePromo,
  editSinglePromo,
  deleteSinglePromo,
  department,
  doctor,
  auth,
};

export default api;
