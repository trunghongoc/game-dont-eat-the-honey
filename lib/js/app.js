var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $interval, $log, $timeout) {
    $('#myModal2').modal({show: 'true'});
    $scope.version = "1.4 release";
    $scope.time = 0;
    $scope.heart = 3;
    $scope.score = 0;
    $scope.mtop = 0;
    $scope.mleft = 0;   
    $scope.gtop = -50;
    $scope.gleft = -50;
    $scope.showGift = false;
    $scope.btop = -100;
    $scope.bleft = -100;
    $scope.b1top = -50;
    $scope.b1left = -50;
    $scope.b2top = -50;
    $scope.b2left = -50;
    $scope.b3top = -50;
    $scope.b3left = -50;
    $scope.b4top = -50;
    $scope.b4left = -50;
    $scope.b5top = -50;
    $scope.b5left = -50;
    $scope.showSuperBoom = false;
    $scope.showBoom1 = false;
    $scope.showBoom2 = false;
    $scope.showBoom3 = false;
    $scope.showBoom4 = false;
    $scope.showBoom5 = false;

    $scope.showSpos = true;
    $scope.modalHeader = "Game Over";
    $scope.modalBody = "";

    $scope.aniClass = ["wow bounce", "wow flash", "wow pulse", "wow rubberBand","wow shake","wow swing","wow tada","wow wobble","wow jello"];
    $scope.classSuperBoom = "";
    $scope.classBoom1 = "";
    $scope.classBoom2 = "";
    $scope.classBoom3 = "";
    $scope.classBoom4 = "";
    $scope.classBoom5 = "";
    $scope.currentAvartar = "ahi.png";

    $scope.avatar = ["a1.png","a2.png","a3.png","a4.png","a5.png","a6.png","a7.png","a8.png","a9.png","a10.png","ahi.png"];
    $scope.setAvatar = function(i)
    {
        $scope.currentAvartar = $scope.avatar[i];
        $('#nhanvat').modal('hide');
    }

    $scope.rd = function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $scope.gameOver = function()
    {
        if($scope.heart<1) return true;
        else return false;
    }

    setTime = $interval(function() {
        if($scope.gameOver!==true)
            $scope.time = $scope.time + 1;
    }, 1000);

    $scope.stop = $scope.rd(0,9)*50;
    $scope.sleft = $scope.rd(0,9)*50;

    $scope.eatStar = function()
    {
        $scope.score = $scope.score + 5;
        $("#ting").trigger('play');
        $scope.setSpos();
        $scope.setBg();
    }

    $scope.eatGift = function()
    {
        $scope.score = $scope.score + 25;
        $("#ringring").trigger('play');
        $scope.hideGift();
        $scope.setBg();
    }

    $scope.eatBoom = function()
    {
        $scope.score = $scope.score - 10;
        $scope.heart = $scope.heart - 1;
        $("#warningring").trigger('play');
        $scope.setBg();
    }
    $scope.eatSuperBoom = function()
    {
        $scope.score = $scope.score - 50;
        $scope.heart = $scope.heart - 2;
        $("#lahet").trigger('play');
        $scope.setBg();
    }

    $scope.mPos = function()
    {
        if($scope.gameOver===true) {return "";}

        if($scope.mtop < 0) $scope.mtop = 0;
        if($scope.mtop > 450) $scope.mtop = 450;
        if($scope.mleft < 0) $scope.mleft = 0;
        if($scope.mleft > 450) $scope.mleft = 450;

        $("#animate").animate({
            top: $scope.mtop+"px",
            left: $scope.mleft+"px"
        }, "fast");

        if($scope.mtop===$scope.stop && $scope.mleft===$scope.sleft)
            $scope.eatStar();

        if($scope.mtop===$scope.gtop && $scope.mleft===$scope.gleft)
            $scope.eatGift();

        if(($scope.mtop===$scope.b1top && $scope.mleft===$scope.b1left)||($scope.mtop===$scope.b2top && $scope.mleft===$scope.b2left)||($scope.mtop===$scope.b3top && $scope.mleft===$scope.b3left)||($scope.mtop===$scope.b4top && $scope.mleft===$scope.b4left)||($scope.mtop===$scope.b5top && $scope.mleft===$scope.b5left))
            $scope.eatBoom();
        
        if(($scope.mtop===$scope.btop && $scope.mleft===$scope.bleft)||($scope.mtop===$scope.btop && $scope.mleft===$scope.bleft+50)||($scope.mtop===$scope.btop+50 && $scope.mleft===$scope.bleft)||($scope.mtop===$scope.btop+50 && $scope.mleft===$scope.bleft+50))
            $scope.eatSuperBoom();
    }

    $scope.setMpos = function(param) {
        if($scope.gameOver===true) {return "";}

        if (param == "t") $scope.mtop -=50;
        else if (param == "l") $scope.mleft -=50;
        else if (param == "r") $scope.mleft +=50;
        else if (param == "b") $scope.mtop +=50;
        else {};
        $scope.mPos();
    }

    $scope.key = function($event){
        if($scope.gameOver===true) {return "";}
        
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
        if($scope.gameOver===true) {return "";}
        $scope.stop = $scope.rd(0,9)*50;
        $scope.sleft = $scope.rd(0,9)*50;
    }

    $scope.color = ["#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#16a085","#27ae60","#2980b9","#f1c40f","#e67e22","#ecf0f1","#95a5a6","#d35400","#f39c12","#bdc3c7","#7f8c8d"];
    $("#container").attr("style","background:"+$scope.color[$scope.rd(0,15)]);
    $scope.setBg = function(){
        $("#container").attr("style","background:"+$scope.color[$scope.rd(0,15)]);
    }

    setStarPosition = $interval(function() {
        // if($scope.gameOver===true) {$interval.cancel(setStarPosition);}
        if($scope.gameOver!==true)
        {
            $scope.setSpos();
            if($scope.mtop===$scope.stop && $scope.mleft===$scope.sleft)
                $scope.eatStar();
        }
    }, 2000);

    $scope.hideGift = function()
    {
        if($scope.gameOver===true) {return "";}
        $scope.gtop = -50;
        $scope.gleft = -50;
        $scope.showGift = false;
    }

    $scope.hideBOOM = function()
    {
        if($scope.gameOver===true) {return "";}
        $scope.gtop = -100;
        $scope.gleft = -100;
        $scope.showSuperBoom = false;
    }

    $scope.gift = function()
    {
        if($scope.gameOver===true) {return "";}
        $scope.gtop = $scope.rd(0,9)*50;
        $scope.gleft = $scope.rd(0,9)*50;
        $scope.showGift = true;
        $timeout(function() {$scope.hideGift();}, 1900);
    }
    $scope.BOOM = function()
    {
        if($scope.gameOver===true) {return "";}
        $scope.btop = $scope.rd(0,4)*100;
        $scope.bleft = $scope.rd(0,4)*100;
        $scope.showSuperBoom = true;
        $timeout(function() {$scope.hideBOOM();}, 3000);
    }

    $scope.showBoom = function(num)
    {
        if(num==1)
        {
            $scope.b1top = $scope.rd(0,9)*50;
            $scope.b1left = $scope.rd(0,9)*50;
            $scope.showBoom1 = true;
        }
        if(num==2)
        {
            $scope.b2top = $scope.rd(0,9)*50;
            $scope.b2left = $scope.rd(0,9)*50;
            $scope.showBoom2 = true;
        }
        else if(num==3)
        {
            $scope.b3top = $scope.rd(0,9)*50;
            $scope.b3left = $scope.rd(0,9)*50;
            $scope.showBoom3 = true;
        }
        else if(num==4)
        {
            $scope.b4top = $scope.rd(0,9)*50;
            $scope.b4left = $scope.rd(0,9)*50;
            $scope.showBoom4 = true;
        }
        else
        {
            $scope.b5top = $scope.rd(0,9)*50;
            $scope.b5left = $scope.rd(0,9)*50;
            $scope.showBoom5 = true;
        }
    }

    displayBoom1 = $interval(function() {
        if($scope.gameOver!==true)
        {
            $scope.classBoom1 = $scope.aniClass[$scope.rd(0,8)];
            $scope.showBoom(1);
            if($scope.mtop===$scope.b1top && $scope.mleft===$scope.b1left)
                $scope.eatBoom();
        }
    }, 1000);
    displayBoom2 = $interval(function() {
        if($scope.gameOver!==true)
        {
            $scope.classBoom2 = $scope.aniClass[$scope.rd(0,8)];
            $scope.showBoom(2);
            if($scope.mtop===$scope.b2top && $scope.mleft===$scope.b2left)
                $scope.eatBoom();
        }
    }, 2000);
    displayBoom3 = $interval(function() {
        if($scope.gameOver!==true)
        {
            $scope.classBoom3 = $scope.aniClass[$scope.rd(0,8)];
            $scope.showBoom(3);
            if($scope.mtop===$scope.b3top && $scope.mleft===$scope.b3left)
                $scope.eatBoom();
        }
    }, 3000);
    displayBoom4 = $interval(function() {
        if($scope.gameOver!==true)
        {
            $scope.classBoom4 = $scope.aniClass[$scope.rd(0,8)];
            $scope.showBoom(4);
            if($scope.mtop===$scope.b4top && $scope.mleft===$scope.b4left)
                $scope.eatBoom();
        }
    }, 4000);
    displayBoom5 = $interval(function() {
        if($scope.gameOver!==true)
        {
            $scope.classBoom5 = $scope.aniClass[$scope.rd(0,8)];
            $scope.showBoom(5);
            if($scope.mtop===$scope.b5top && $scope.mleft===$scope.b5left)
                $scope.eatBoom();
        }
    }, 5000);

    displayGift = $interval(function() {
        if($scope.gameOver!==true)
            $scope.gift();
    }, 10000);

    displaySuperBoom = $interval(function() {
        if($scope.gameOver!==true)
        {
            $scope.BOOM();
            if(($scope.mtop===$scope.btop && $scope.mleft===$scope.bleft)||($scope.mtop===$scope.btop && $scope.mleft===$scope.bleft+50)||($scope.mtop===$scope.btop+50 && $scope.mleft===$scope.bleft)||($scope.mtop===$scope.btop+50 && $scope.mleft===$scope.bleft+50))
            $scope.eatSuperBoom();
        }  
    }, 10000);
    

    $scope.$watch('heart', function (n, o) {
        if(n<1) {
            $scope.gameOver = true;
            $("#ketthuc").trigger('play');
            $('#myModal').modal({show: 'true'});
        }
    });
    
    $scope.resetGame = function()
    {
        $scope.time = 0;
        $scope.heart = 3;
        $scope.score = 0; 
        $scope.gameOver = false;
        $('#myModal').modal('hide');
    }
});