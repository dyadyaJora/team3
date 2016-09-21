pepo.factory('pepoSocket', function (socketFactory) {
  var myIoSocket = io.connect();

  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
});
