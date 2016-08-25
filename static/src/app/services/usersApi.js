pepo.service('usersApi', function($resource) {
  return $resource('/api/users/:username/:statuses', {}, {
    getUsers: {
      method: 'GET',
      isArray: true
    },
    getUser: {
      method: 'GET',
      params: {
        username: '@username'
      }
    },
    getUserStatuses: {
      method: 'GET',
      isArray: true,
      params: {
        username: '@username',
        statuses: 'statuses'
      }
    }
  }
  );
});

