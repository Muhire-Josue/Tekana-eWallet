import bcrypt from 'bcrypt';

export const comparePassword = (password = '', hashPassword = ''): boolean => {
  return bcrypt.compareSync(password, hashPassword);
};
