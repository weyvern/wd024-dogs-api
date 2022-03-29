import pool from '../db/pg.js';

export const getAllDogs = async (req, res) => {
  try {
    const { rows: dogs } = await pool.query('SELECT * FROM dogs;');
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};

export const updateDog = async (req, res) => {
  try {
    const {
      params: { id },
      body: { name, breed, gender, color, alphanum, kid_friendly, haftpflichtversicherung }
    } = req;
    const { rowCount: found } = await pool.query('SELECT * FROM dogs WHERE id = $1', [id]);
    if (!found) {
      throw new Error(`The doggo you are trying to update doesn't exist`);
    }
    if (!name || !breed || !gender || !color || !alphanum) {
      throw new Error('Invalid body');
    }
    const {
      rows: [dog]
    } = await pool.query(
      'UPDATE dogs SET name = $2, breed = $3, gender = $4, color = $5 , alphanum = $6, kid_friendly = $7, haftpflichtversicherung = $8 WHERE id = $1 RETURNING *',
      [id, name, breed, gender, color, alphanum, kid_friendly, haftpflichtversicherung]
    );
    res.json(dog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDog = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const { rowCount } = await pool.query('DELETE FROM dogs WHERE id = $1 RETURNING *', [id]);
    if (rowCount) {
      return res.json({ msg: `Doggo with id of ${id} was deleted` });
    } else {
      throw new Error(`Doggo with id of ${id} doesn't even exist`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    x;
  }
};
