pepo.service('usersApi', function($resource) {
  return $resource('/api/users/:username/:statuses/:follow', {}, {
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
    },
    followUser: {
      method: 'POST',
      params: {
        username: '@username',
        follow: 'follow'
      }
    },
    unfollowUser: {
      method: 'DELETE',
      params: {
        username: '@username',
        follow: 'follow'
      }
    }
  }
  );
});

