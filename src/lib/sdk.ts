import Surreal from 'surrealdb.js';

const db = new Surreal('http://127.0.0.1:8000/rpc');

export const signin = async ({ email, pass }) => {
  await db.signin({
    NS: 'intergate',
    DB: 'test',
    SC: 'account',
    email,
    pass,
  });
};
