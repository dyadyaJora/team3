pepo.service('pepsApi', function($resource) {
  return $resource('/api/statuses', {}, {
    getPeps: {
      method: 'GET',
      isArray: true
    },
    sendPep: {
      method: 'POST',
      params: {
        pepData: '@pepData'
      }
    }
  }
  );
})
