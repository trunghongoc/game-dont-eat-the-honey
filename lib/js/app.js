var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $interval, $log, $timeout) {
    $scope.time = 0;
    $scope.heart = 3;
    $scope.score = 0;
    $scope.mtop = 0;
    $scope.mleft = 0;   
    $scope.gtop = -50;
    $scope.gleft = -50;
    $scope.showGift = false;

    $scope.showSpos = true;

    $scope.rd = function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $interval(function() {
        $scope.time = $scope.time + 1;
    }, 1000);

    $scope.stop = $scope.rd(0,9)*50;
    $scope.sleft = $scope.rd(0,9)*50;

    $scope.mPos = function()
    {
        if($scope.mtop < 0) $scope.mtop = 0;
        if($scope.mtop > 450) $scope.mtop = 450;
        if($scope.mleft < 0) $scope.mleft = 0;
        if($scope.mleft > 450) $scope.mleft = 450;

        $("#animate").animate({
            top: $scope.mtop+"px",
            left: $scope.mleft+"px"
        }, "fast");

        if($scope.mtop===$scope.stop && $scope.mleft===$scope.sleft){
            $scope.score = $scope.score + 5;
            $("#ting").trigger('play');
            $scope.setSpos();
            $scope.setBg();
        }

        if($scope.mtop===$scope.gtop && $scope.mleft===$scope.gleft){
            $scope.score = $scope.score + 25;
            $("#ringring").trigger('play');
            $scope.hideGift();
            $scope.setBg();
        }
    }

    $scope.setMpos = function(param) {
        if (param == "t") $scope.mtop -=50;
        else if (param == "l") $scope.mleft -=50;
        else if (param == "r") $scope.mleft +=50;
        else if (param == "b") $scope.mtop +=50;
        else {};
        $scope.mPos();
    }

    $scope.key = function($event){
        $log.info($event.keyCode);
        if ($event.keyCode == 38)//top
            $scope.mtop -=50;
        else if ($event.keyCode == 39)//right
            $scope.mleft +=50;
        else if ($event.keyCode == 40)//bottom
            $scope.mtop +=50;
        else if ($event.keyCode == 37)//left
            $scope.mleft -=50;
        $scope.mPos();
    }
    $scope.checkTrue = function(){
        if($scope.mtop==$scope.stop && $scope.mleft==$scope.sleft)
            return true;
        return false;
    }

    $scope.setSpos = function(){
        $scope.stop = $scope.rd(0,9)*50;
        $scope.sleft = $scope.rd(0,9)*50;
    }

    $scope.color = ["#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#16a085","#27ae60","#2980b9","#f1c40f","#e67e22","#ecf0f1","#95a5a6","#d35400","#f39c12","#bdc3c7","#7f8c8d"];
    $("#container").attr("style","background:"+$scope.color[$scope.rd(0,15)]);
    $scope.setBg = function(){
        $("#container").attr("style","background:"+$scope.color[$scope.rd(0,15)]);
    }

    $interval(function() {
        $scope.setSpos();
    }, 2000);

    $scope.hideGift = function()
    {
        $scope.gtop = -50;
        $scope.gleft = -50;
        $scope.showGift = false;
    }

    $scope.gift = function()
    {
        $scope.gtop = $scope.rd(0,9)*50;
        $scope.gleft = $scope.rd(0,9)*50;
    }

    $interval(function() {
        $scope.gift();
        $scope.showGift = true; 
    }, 10000);
    $interval(function() {
        $scope.hideGift();
    }, 11000);

});