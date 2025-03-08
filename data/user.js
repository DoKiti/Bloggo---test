import { users } from "./users.js"

const userId = '1';

export const user = JSON.parse(localStorage.getItem('user')) ||users.find((u) => u.userId === userId);