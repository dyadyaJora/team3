pepo.service('userApi', function($resource) {
  return $resource('/api/user', {}, {
    getUser: {
      method: 'GET',
      isArray: false
    }
  }
  );
});

