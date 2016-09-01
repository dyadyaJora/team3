pepo.service('feedApi', function($resource) {
  return $resource('/api/feed', {}, {
    getFeed: {
      method: 'GET',
      isArray: false
    }
  }
  );
});

