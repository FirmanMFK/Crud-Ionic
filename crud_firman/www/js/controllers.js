angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('TambahCtrl', function($scope,bukuService, $ionicPopup){

  $scope.showAlert = function(msg) {
    $ionicPopup.alert({
        title: msg.title,
        template: msg.message,
        okText: 'Ok',
        okType: 'button-positive'
    });
  };

  $scope.simpan = function(bukuTamu){

    if(!bukuTamu.nama){
      $scope.showAlert({
        title: "Information",
        message: "Nama Mohon Diisi"
      });
    }else if(!bukuTamu.email){
      $scope.showAlert({
        title: "Information",
        message: "Alamat Mohon Diisi"
      });
    }else if(!bukuTamu.pesan){
      $scope.showAlert({
        title: "Information",
        message: "Spesialis Mohon Diisi"
      });
    }else{
      bukuService.simpan({
        data: bukuTamu
      }).then(function(resp) {
        console.log(resp);
      
        $scope.showAlert({
          title: "Information",
          message: "Data Telah Disimpan"
        });
        // $state.go("tab.buku");
      },function(err) {
        console.error('Error', err);
      }); 
    }

  };

})

.controller('BukuCtrl', function($scope, $ionicPopup, bukuService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.showAlert = function(msg) {
    $ionicPopup.alert({
        title: msg.title,
        template: msg.message,
        okText: 'Ok',
        okType: 'button-positive'
    });
  };
  
  $scope.remove = function(buku_tamu) {
    bukuService.hapus(buku_tamu.buku_id).then(function(resp) {
      console.log(resp);
      $scope.showAlert({
        title: "Information",
        message: "Data Telah Dihapus"
      });
      $scope.showData();
    }, function(err) {
      console.log('Error', err);
    });
  }

  $scope.showData = function() {
    bukuService.ambilSemua().success(function(dataChat) {
      $scope.chats = dataChat;
    });  
  };

  $scope.showData();

  console.log($scope.chats);

})

.controller('BukuDetailCtrl', function($scope,$stateParams,$ionicPopup,$ionicModal,$state, bukuService) {

  $scope.showDataId = function() {
  bukuService.ambilSatu($stateParams.bukuId).success(function(dataChat) {
    $scope.bukuTamu = dataChat;
  });  
  };

  $scope.showDataId();

  $ionicModal.fromTemplateUrl('edit.html', function(modal){
    $scope.taskModal = modal;
  },{
    scope : $scope,
    animation : 'slide-in-up' 
  });
        
  $scope.showAlert = function(msg) {
    $ionicPopup.alert({
        title: msg.title,
        template: msg.message,
        okText: 'Ok',
        okType: 'button-positive'
    });
  };
  
  $scope.editModal = function(){
    $scope.taskModal.show();
  };
  
  $scope.batal = function(){
    $scope.taskModal.hide();
    $scope.showDataId();
  };

  $scope.edit = function(bukuTamu){

    if(!bukuTamu.nama){
      $scope.showAlert({
        title: "Information",
        message: "Nama Mohon Diisi"
      });
    }else if(!bukuTamu.email){
      $scope.showAlert({
        title: "Information",
        message: "Alamat Mohon Diisi"
      });
    }else if(!bukuTamu.pesan){
      $scope.showAlert({
        title: "Information",
        message: "Spesialis Mohon Diisi"
      });
    }else{
      bukuService.ubah({
        data: bukuTamu
      }).then(function(resp) {
        console.log(resp);
      
        $scope.showAlert({
          title: "Information",
          message: "Data Sudah Diupdate"
        });
      
        $scope.taskModal.hide();
        // $state.go("tab.buku");
      },function(err) {
        console.error('Error', err);
      }); 
    }
  };
})

.controller('TentangCtrl', function($scope) {
  
});
