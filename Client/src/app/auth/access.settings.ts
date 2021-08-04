export const authSettings = {
  guest: {
    view: ['devices', 'current-guest'],
  },
  registered: {
    /*parent: 'guest',*/
    view: ['devices', 'current-user'],
    edit: ['devices', 'current-user'],
  },
  moderator: {
    parent: 'registered',
    view: ['devices', 'current-user'],
    edit: ['devices', 'current-user'],
  },
  admin: {
    parent: 'moderator',
    view: ['devices', 'current-user', 'users'],
    edit: ['devices', 'current-user', 'users'],
  },
};
