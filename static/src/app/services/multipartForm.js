pepo.service('multipartForm', function($q, $http) {
  this.patch = function (uploadUrl, data) {
    var fd = new FormData();

    for (var key in data) {
      fd.append(key, data[key]);
    }

    return $q.when($http.patch(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined }
    }));
  };
});
