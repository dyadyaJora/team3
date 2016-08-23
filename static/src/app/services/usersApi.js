pepo.service('usersApi', function($resource) {
  return $resource('/api/users', {}, {
    getUsers: {
      method: 'GET',
      isArray: true
    }
  }
  );
});

