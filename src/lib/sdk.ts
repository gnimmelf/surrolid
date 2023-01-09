import Surreal from 'surrealdb.js';

const db = new Surreal('http://127.0.0.1:8000/rpc');

export const signin = async ({ username, password }) => {
  await db.signin({
    NS: 'intergate',
    DB: 'test',
    SC: 'account',
    user: username,
    pass: password,
  });
};
