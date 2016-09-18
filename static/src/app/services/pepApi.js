pepo.service('pepsApi', function($resource) {
  return $resource('/api/statuses/:id', {}, {
    getPeps: {
      method: 'GET',
      isArray: true
    },
    getSinglePep: {
      method: 'GET',
      params: {
        id: '@id'
      }
    },
    sendPep: {
      method: 'POST'
    },
    deletePep: {
      method: 'DELETE',
      params: {
        id: '@id'
      }
    },
    editPep: {
      method: 'PATCH',
      params: {
        id: '@id'
      }
    }
  }
  );
})
