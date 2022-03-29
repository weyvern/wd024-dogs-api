// DATABASE
const dogs = [
  { id: 1, breed: 'Corgi', size: 'smol' },
  { id: 2, breed: 'Chihuahua', size: 'smol' }
];

export const getAllDogs = (req, res) => res.json(dogs);

export const createDog = (req, res) => {
  const { body } = req;
  const newDog = { id: dogs.length + 1, ...body };
  dogs.push(newDog);
  res.status(201).json(newDog);
};

export const getSingleDog = (req, res) => {
  const {
    params: { id }
  } = req;
  const found = dogs.find(dog => dog.id === parseInt(id));
  if (!found) return res.status(404).json({ msg: 'No doggo for you' });
  res.json(found);
};

export const updateDog = (req, res) => res.send('PUT single dog');

export const deleteDog = (req, res) => res.send('DELETE single dog');
