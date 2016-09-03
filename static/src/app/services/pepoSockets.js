pepo.factory('pepoSocket', function (socketFactory) {
 var myIoSocket = io.connect();

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
});
