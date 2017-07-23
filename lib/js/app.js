var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $interval, $log, $timeout) {
    $("#chaomung").trigger('play');
    $('#myModal2').modal({show: 'true'});
    var fworks = new Fireworks();
    $scope.version = "2.1 release";
    $scope.author = "Hồ Ngọc Trung";
    $scope.time = 0;
    $scope.heart = 3;
    $scope.score = 0;
    $scope.scoreTMP = 100;
    $scope.mtop = 0;
    $scope.mleft = 0;   
    $scope.gtop = -50;
    $scope.gleft = -50;
    $scope.showGift = false;
    $scope.htop = -50;
    $scope.hleft = -50;
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
    $scope.showHeart = false;
    $scope.showSuperBoom = false;
    $scope.showBoom1 = false;
    $scope.showBoom2 = false;
    $scope.showBoom3 = false;
    $scope.showBoom4 = false;
    $scope.showBoom5 = false;
    $scope.nhieuBoom1top = -50;
    $scope.nhieuBoom1left = -250;
    $scope.nhieuBoom1Show = false;
    $scope.nhieuBoom2top = -50;
    $scope.nhieuBoom2left = -250;
    $scope.nhieuBoom2Show = false;
    $scope.nhieuBoom3top = -50;
    $scope.nhieuBoom3left = -250;
    $scope.nhieuBoom3Show = false;
    $scope.timeSleep = 0;
    $scope.mPosArrs = [];

    $scope.showSpos = false;
    $scope.modalHeader = "Game Over";
    $scope.modalBody = "";

    $scope.aniClass = ["wow bounce", "wow flash", "wow pulse", "wow rubberBand","wow shake","wow swing","wow tada","wow wobble","wow jello"];
    $scope.classSuperBoom = "";
    $scope.classBOOM = "";
    $scope.classBoom1 = "";
    $scope.classBoom2 = "";
    $scope.classBoom3 = "";
    $scope.classBoom4 = "";
    $scope.classBoom5 = "";
    $scope.currentAvartar = "ahi.png";
    $scope.alert = ["Welcom bạn :v","","","","",""];
    $scope.changeAlert = function(mess)
    {   
        $scope.alert.unshift(mess);
        $scope.alert.splice(6,$scope.alert.length - 6);
    }

    $scope.firstAlert = function(so0)
    {
        if(so0 == 0)
            return "fff";
    }

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

    //sao:
    do
    {
        $scope.stop = $scope.rd(0,9)*50;
        $scope.sleft = $scope.rd(0,9)*50;
    }
    while($scope.mtop === $scope.stop || $scope.mleft === $scope.sleft);

    $scope.eatStar = function()
    {
        $scope.score = $scope.score + 5;
        $("#ting").trigger('play');
        $scope.setSpos();
        $scope.changeAlert("Ăn sao +5");
        //$scope.setBg();
    }

    $scope.eatHeart = function()
    {
        $scope.heart = $scope.heart + 1;
        if($scope.heart > 3)
            $scope.heart = 3;
        $scope.htop = -50;
        $scope.hleft = -50;
        $scope.showHeart = false;
        if($scope.heart > 3)
            $scope.changeAlert("Số mạng đã đạt tối đa");
        else
            $scope.changeAlert("Mạng +1");
        $("#eatHeart").trigger('play');

    }

    $scope.eatGift = function()
    {
        $scope.score = $scope.score + 25;
        $("#ringring").trigger('play');
        $scope.changeAlert("Ăn thịt chuột: score +25");
        $scope.hideGift();
        //$scope.setBg();
    }

    $scope.eatBoom = function()
    {
        $scope.score = $scope.score - 10;
        $scope.heart = $scope.heart - 1;
        $scope.changeAlert("Ăn cức: sao -10, mạng -1");
        $("#warningring").trigger('play');
        //$scope.setBg();
    }
    $scope.eatSuperBoom = function()
    {
        $scope.score = $scope.score - 50;
        $scope.heart = $scope.heart - 2;
        $scope.changeAlert("Ăn SUPER cức: sao -50, mạng -2");
        $("#lahet").trigger('play');
        //$scope.setBg();
    }

    $scope.eatChuoiBoom = function()
    {
        $scope.score = $scope.score - 40;
        $scope.heart = $scope.heart - 1;
        $scope.changeAlert("Ăn chuỗi cức: sao -40, mạng -1");
        $("#lahet").trigger('play');
        //$scope.setBg();
    }
    $scope.toLongSleep = function()
    {
        $scope.score = $scope.score - 5;
        $scope.heart = $scope.heart - 1;
        $scope.changeAlert("Đứng im: sao -5, mạng -1");
        //$scope.setBg();
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

        if($scope.mtop===$scope.htop && $scope.mleft===$scope.hleft)
            $scope.eatHeart();

        if(
            ($scope.mtop === $scope.nhieuBoom1top && $scope.mleft >= $scope.nhieuBoom1left && $scope.mleft <= $scope.nhieuBoom1left+200)
            || ($scope.mtop === $scope.nhieuBoom2top && $scope.mleft >= $scope.nhieuBoom2left && $scope.mleft <= $scope.nhieuBoom2left+200)
            || ($scope.mtop === $scope.nhieuBoom3top && $scope.mleft >= $scope.nhieuBoom3left && $scope.mleft <= $scope.nhieuBoom3left+200)
        )
            $scope.eatChuoiBoom();
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
        do
        {
            $scope.stop = $scope.rd(0,9)*50;
            $scope.sleft = $scope.rd(0,9)*50;
        }
        while($scope.mtop === $scope.stop || $scope.mleft === $scope.sleft);
    }

    $scope.color = ["#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#16a085","#27ae60","#2980b9","#f1c40f","#e67e22","#ecf0f1","#95a5a6","#d35400","#f39c12","#bdc3c7","#7f8c8d"];
    // $("#container").attr("style","background:"+$scope.color[$scope.rd(0,15)]);
    $scope.setBg = function(){
        $("#container").attr("style","background:"+$scope.color[$scope.rd(0,15)]);
    }

    $interval(function() {
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
        $scope.gtop = -50;
        $scope.gleft = -50;
        $scope.showGift = false;
    }

    $scope.hideBOOM = function()
    {
        $scope.btop = -100;
        $scope.bleft = -100;
        $scope.showSuperBoom = false;
    }

    $scope.hideHEART = function()
    {
        $scope.htop = -50;
        $scope.hleft = -50;
        $scope.showHeart = false;
    }

    $scope.gift = function()
    {
        do
        {
            $scope.gtop = $scope.rd(0,9)*50;
            $scope.gleft = $scope.rd(0,9)*50;
            $scope.showGift = true;
            $timeout(function() {$scope.hideGift();}, 1900);
        }
        while($scope.mtop === $scope.gtop || $scope.mleft === $scope.gleft);
    }
    $scope.BOOM = function()
    {
        do
        {
            $scope.classBOOM = $scope.aniClass[$scope.rd(0,8)];
            $scope.btop = $scope.rd(0,4)*100;
            $scope.bleft = $scope.rd(0,4)*100;
            $scope.showSuperBoom = true;
            $timeout(function() {$scope.hideBOOM();}, 3000);
        }
        while(($scope.mtop===$scope.btop && $scope.mleft===$scope.bleft)||($scope.mtop===$scope.btop && $scope.mleft===$scope.bleft+50)||($scope.mtop===$scope.btop+50 && $scope.mleft===$scope.bleft)||($scope.mtop===$scope.btop+50 && $scope.mleft===$scope.bleft+50));
    }

    $scope.displayHeart = function()
    {
        do
        {
            $("#xuatHienHeart").trigger('play');
            $scope.htop = $scope.rd(0,9)*50;
            $scope.hleft = $scope.rd(0,9)*50;
            $scope.showHeart = true;
            $timeout(function() {$scope.hideHEART();}, 3000);
        }
        while($scope.mtop === $scope.htop && $scope.mleft === $scope.hleft);
    }

    $scope.showBoom = function(num)
    {
        if(num==1)
        {
            do
            {
                $scope.b1top = $scope.rd(0,9)*50;
                $scope.b1left = $scope.rd(0,9)*50;
                $scope.showBoom1 = true;
            }
            while($scope.mtop === $scope.b1top || $scope.mleft === $scope.b1left);
        }
        if(num==2)
        {
            do
            {
                $scope.b2top = $scope.rd(0,9)*50;
                $scope.b2left = $scope.rd(0,9)*50;
                $scope.showBoom2 = true;
            }
            while($scope.mtop === $scope.b2top || $scope.mleft === $scope.b2left);
        }
        else if(num==3)
        {
            do
            {
                $scope.b3top = $scope.rd(0,9)*50;
                $scope.b3left = $scope.rd(0,9)*50;
                $scope.showBoom3 = true;
            }
            while($scope.mtop === $scope.b3top || $scope.mleft === $scope.b3left);
        }
        else if(num==4)
        {
            do
            {
                $scope.b4top = $scope.rd(0,9)*50;
                $scope.b4left = $scope.rd(0,9)*50;
                $scope.showBoom4 = true;
            }
            while($scope.mtop === $scope.b4top || $scope.mleft === $scope.b4left);
        }
        else
        {
            do
            {
                $scope.b5top = $scope.rd(0,9)*50;
                $scope.b5left = $scope.rd(0,9)*50;
                $scope.showBoom5 = true;
            }
            while($scope.mtop === $scope.b5top || $scope.mleft === $scope.b5left);
        }
    }

    $scope.displayNhieuBoom = function(num)
    {
        if(num == 1)
        {
            do
            {
                $scope.nhieuBoom1top = $scope.rd(0,9)*50;
                $scope.nhieuBoom1left = $scope.rd(0,5)*50;
                $scope.nhieuBoom1Show = true;
                $timeout(function() {$scope.hideNhieuBoom(1);}, 3500);
            }
            while($scope.mtop === $scope.nhieuBoom1top && $scope.mleft >= $scope.nhieuBoom1left && $scope.mleft <= $scope.nhieuBoom1left+200);
        }
        else if(num == 2)
        {
            do
            {
                $scope.nhieuBoom2top = $scope.rd(0,9)*50;
                $scope.nhieuBoom2left = $scope.rd(0,5)*50;
                $scope.nhieuBoom2Show = true;
                $timeout(function() {$scope.hideNhieuBoom(2);}, 3500);
            }
            while($scope.mtop === $scope.nhieuBoom2top && $scope.mleft >= $scope.nhieuBoom2left && $scope.mleft <= $scope.nhieuBoom2left+200);
        }
        else
        {
            do
            {
                $scope.nhieuBoom3top = $scope.rd(0,9)*50;
                $scope.nhieuBoom3left = $scope.rd(0,5)*50;
                $scope.nhieuBoom3Show = true;
                $timeout(function() {$scope.hideNhieuBoom(3);}, 3500);
            }
            while($scope.mtop === $scope.nhieuBoom3top && $scope.mleft >= $scope.nhieuBoom3left && $scope.mleft <= $scope.nhieuBoom3left+200);
        }
    }

    $scope.hideNhieuBoom = function(num)
    {
        if(num == 1)
        {
            $scope.nhieuBoom1top = -50;
            $scope.nhieuBoom1left = -250;
            $scope.nhieuBoom1Show = false;
        }
        else if(num == 2)
        {
            $scope.nhieuBoom2top = -50;
            $scope.nhieuBoom2left = -250;
            $scope.nhieuBoom2Show = false;
        }
        else
        {
            $scope.nhieuBoom3top = -50;
            $scope.nhieuBoom3left = -250;
            $scope.nhieuBoom3Show = false;
        }
    }

    $interval(function() {
        if($scope.gameOver!==true)
        {
            $scope.classBoom1 = $scope.aniClass[$scope.rd(0,8)];
            $scope.showBoom(1);
            if($scope.mtop===$scope.b1top && $scope.mleft===$scope.b1left)
                $scope.eatBoom();
            //check di chuyển:
            $scope.timeSleep = $scope.timeSleep + 1;
            $scope.mPosArrs.unshift([$scope.mtop,$scope.mleft]);
            if($scope.mPosArrs.length>3 && $scope.timeSleep > 4)
            {
                $scope.mPosArrs.splice(4,$scope.mPosArrs.length - 4);
                if(
                    $scope.mPosArrs[0][0] === $scope.mPosArrs[1][0] && $scope.mPosArrs[0][0] === $scope.mPosArrs[2][0] && $scope.mPosArrs[0][0] === $scope.mPosArrs[3][0] &&
                    $scope.mPosArrs[0][1] === $scope.mPosArrs[1][1] && $scope.mPosArrs[0][1] === $scope.mPosArrs[2][1] && $scope.mPosArrs[0][1] === $scope.mPosArrs[3][1]
                )
                    $scope.toLongSleep();
                $scope.timeSleep = 0;
            }
            
        }
    }, 1000);
    $interval(function() {
        if($scope.gameOver!==true)
        {
            $scope.classBoom2 = $scope.aniClass[$scope.rd(0,8)];
            $scope.showBoom(2);
            if($scope.mtop===$scope.b2top && $scope.mleft===$scope.b2left)
                $scope.eatBoom();
        }
    }, 2000);
    $interval(function() {
        if($scope.gameOver!==true)
        {
            $scope.classBoom3 = $scope.aniClass[$scope.rd(0,8)];
            $scope.showBoom(3);
            if($scope.mtop===$scope.b3top && $scope.mleft===$scope.b3left)
                $scope.eatBoom();
        }
    }, 3000);
    $interval(function() {
        if($scope.gameOver!==true)
        {
            $scope.classBoom4 = $scope.aniClass[$scope.rd(0,8)];
            $scope.showBoom(4);
            if($scope.mtop===$scope.b4top && $scope.mleft===$scope.b4left)
                $scope.eatBoom();
        }
    }, 4000);
    $interval(function() {
        if($scope.gameOver!==true)
        {
            $scope.classBoom5 = $scope.aniClass[$scope.rd(0,8)];
            $scope.showBoom(5);
            if($scope.mtop===$scope.b5top && $scope.mleft===$scope.b5left)
                $scope.eatBoom();
        }
    }, 5000);

    $interval(function() {
        if($scope.gameOver!==true)
        {
            $scope.gift();
            $scope.BOOM();
            if(($scope.mtop===$scope.btop && $scope.mleft===$scope.bleft)||($scope.mtop===$scope.btop && $scope.mleft===$scope.bleft+50)||($scope.mtop===$scope.btop+50 && $scope.mleft===$scope.bleft)||($scope.mtop===$scope.btop+50 && $scope.mleft===$scope.bleft+50))
                $scope.eatSuperBoom();
        }  
    }, 10000);

    $interval(function() {
        if($scope.gameOver!==true)
            $scope.displayNhieuBoom(1);
    }, 7000);

    $interval(function() {
        if($scope.gameOver!==true)
            $scope.displayNhieuBoom(2);
    }, 12000);

    $interval(function() {
        if($scope.gameOver!==true)
            $scope.displayNhieuBoom(3);
    }, 15000);


    $interval(function() {
        if($scope.gameOver!==true && $scope.heart < 4)
        {
            $scope.displayHeart();
            if($scope.mtop===$scope.htop && $scope.mleft===$scope.hleft)
                $scope.eatHeart();
        }  
    }, 20000);
    

    $scope.$watch('heart', function (n, o) {
        if(n<1) {
            $scope.gameOver = true;
            $scope.changeAlert("Bạn đã tèo ))");
            $("#ketthuc").trigger('play');
            $('#myModal').modal({show: 'true'});
        }
    });

    $scope.$watch('score', function (n, o) {
        if(n>=100 && n >= $scope.scoreTMP)
        {
            var fworks = new Fireworks();
            $("#chaomung").trigger('play');
            if($scope.scoreTMP%100 == 0)
                $scope.scoreTMP = $scope.scoreTMP + 100;
            else
                $scope.scoreTMP = $scope.scoreTMP + 100 - $scope.scoreTMP%100;
        }
        
    });

    
    $scope.resetGame = function()
    {
        $scope.time = 0;
        $scope.heart = 3;
        $scope.score = 0; 
        $scope.gameOver = false;
        $scope.scoreTMP = 100;
        $scope.timeSleep = 0;
        $scope.mPosArrs = [];
        if($scope.btop >= 0)
            $scope.showSuperBoom = true;
        $scope.alert = ["Welcom back!","","","","",""];
        $('#myModal').modal('hide');
        $("#chaomung").trigger('play');
        var fworks = new Fireworks();
    }
});