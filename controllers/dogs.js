import pool from '../db/pg.js';

export const getAllDogs = async (req, res) => {
  try {
    const { rows: dogs } = await pool.query('SELECT * FROM dogs;');
    res.json(dogs);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createDog = async (req, res) => {
  try {
    const {
      body: { name, breed, gender, color, alphanum, kid_friendly, haftpflichtversicherung }
    } = req;
    if (!name || !breed || !gender || !color || !alphanum) {
      throw new Error('Invalid body');
    }
    const query =
      'INSERT INTO dogs (name, breed, gender, color, alphanum, kid_friendly, haftpflichtversicherung) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [name, breed, gender, color, alphanum, kid_friendly, haftpflichtversicherung];
    const {
      rows: [newDog]
    } = await pool.query(query, values);
    res.status(201).json(newDog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleDog = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const {
      rowCount,
      rows: [dog]
    } = await pool.query('SELECT * FROM dogs WHERE id = $1', [id]);
    if (!rowCount) return res.status(404).json({ error: `Doggo with id of ${id} not found` });
    res.json(dog);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateDog = (req, res) => res.send('PUT single dog');

export const deleteDog = (req, res) => res.send('DELETE single dog');
