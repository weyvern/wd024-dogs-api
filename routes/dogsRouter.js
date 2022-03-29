import { Router } from 'express';
import { createDog, deleteDog, getAllDogs, getSingleDog, updateDog } from '../controllers/dogs.js';

const dogsRouter = Router();

dogsRouter.route('/').get(getAllDogs).post(createDog);

dogsRouter.route('/:id').get(getSingleDog).put(updateDog).delete(deleteDog);

export default dogsRouter;
