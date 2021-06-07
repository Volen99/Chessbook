export const authSettings = {
  guest: {
  },
  user: {
    parent: 'guest',
    view: ['devices', 'current-user'],
    edit: ['devices', 'current-user'],
  },
  registered: {
    parent: 'guest',
    view: ['devices', 'current-user'],
    edit: ['devices', 'current-user'],
  },
  admin: {
    parent: 'user',
    view: ['devices', 'current-user', 'users'],
    edit: ['devices', 'current-user', 'users'],
  },
};
