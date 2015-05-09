module.exports = ["DownloadController", ["$scope", "$http", function($scope, $http) {
    $scope.total = 0;
    $scope.limit = 5;
    $scope.running = false;

    $scope.startDownload = function() {
      $scope.running = true;
      $scope.download();
    };

    $scope.download = function(limit) {
      var cacheBuster = "?cache=" + new Date().getTime();
      var url = "http://cdnjs.cloudflare.com/ajax/libs/1140/2.0/1140.css" + cacheBuster;

      var xhr = $http.get(url).success(downloadCallback).error(downloadCallback);
    };

    $scope.report = function() {
      $scope.running = false;
      console.log("Downloaded: ", $scope.total);
    };

    // helpers

    function downloadCallback(data, status, headers, config) {
      $scope.total = $scope.total + data.length;
      console.log($scope.total);
      if ($scope.total < ($scope.limit*1024*1024)) {
        $scope.download();
      } else {
        $scope.report();
      }
    }
  }]
];
