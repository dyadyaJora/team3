pepo.service('imageUpload', function($q, $http, pepsApi) {
  return function(pep, file) {
    if (!file) {
      return $q.resolve(pep);
    }

    var fd = new FormData();
    fd.append('file', file);

    return $http
      .post('/api/statuses/' + pep._id + '/image', fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
      }).then(function(result) {
        return new pepsApi(result.data);
      })
      .catch(function() {
        return pep;
      });
  };
});
