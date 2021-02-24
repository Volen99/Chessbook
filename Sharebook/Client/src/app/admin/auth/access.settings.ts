export const authSettings = {
  guest: {
  },
  user: {
    parent: 'guest',
      view: ['current-users'],
      edit: ['current-users'],
  },
  admin: {
    parent: 'user',
      view: ['current-users', 'users'],
      edit: ['current-users', 'users'],
  },
};
