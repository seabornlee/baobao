angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $http, $location, Yunba, $rootScope) {
  var getUserIdFromUsername = function(username) {
    if (username === 'tjd@163.com') {
      return 1;
    }
    return 2;
  };

  $scope.user = {};
  $scope.login = function() {
    var userId = getUserIdFromUsername($scope.user.name);
    $http.defaults.headers.common = {
      'user_id': userId
    };

    Yunba.init(userId);
    $location.path('/tab/dash');
  };


})
.controller('DashCtrl', function($scope, $location, Users, $ionicPopup, Yunba, $rootScope) {
  $scope.users = [];
  $scope.search = function() {
    $scope.users = Users.query();
    console.log($scope.users);
  };
  $scope.startChatWith = function(user) {
    Yunba.requestSession(user.id);

    var alertPopup = $ionicPopup.alert({
      title: 'Waiting...',
      template: 'Wait ' + user.name + ' to confirm...',
      okText: 'Cancel',
      okType: 'button-assertive'
    });
    alertPopup.then(function(res) {
      console.log('Thank you for not eating my delicious ice cream cone');
    });
  };
})

.controller('ChatsCtrl', function($scope) {
})

.controller('ChatDetailCtrl', function($scope, $stateParams, $location, $ionicPopup) {
  $scope.msg = { text: '' };
  $scope.sendMessage = function() {
    var text = $scope.msg.text;
    if (text === '') {
      return;
    }
  }

  $scope.msgList = [];

  var showConfirmDialog = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Accept session',
      template: 'Are you sure you want to chat with tjd?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };
  var isRequest = $location.search().isRequest;
  if (isRequest) {
    showConfirmDialog();
  }
})

.controller('AccountCtrl', function($scope, $location) {
  $scope.logout = function() {
    $location.path('/login');
  };
});
