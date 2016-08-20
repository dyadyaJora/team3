pepo.service('pepsApi', function($resource) {
  return $resource('/api/statuses/:id', {}, {
    getPeps: {
      method: 'GET',
      isArray: true
    },
    sendPep: {
      method: 'POST',
      params: {
        pepData: '@pepData'
      }
    },
    deletePep: {
      method: 'DELETE',
      params: {
        id: '@id'
      }
    }
  }
  );
})
