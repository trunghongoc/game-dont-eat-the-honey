<html ng-app="myApp">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="lib/css/bootstrap.min.css">
    <link rel="stylesheet" href="lib/css/font-awesome.min.css">
    <link rel="stylesheet" href="lib/css/style.css">
    <script src="lib/js/jquery.min.js"></script>
    <script src="lib/js/bootstrap.min.js"></script>
    <script src="lib/js/angular.min.js"></script>
</head>
<body ng-controller="myCtrl"  ng-keydown="key($event)">
    <div class="container">
        <div class="row">
            <div class="col-md-3 reset">
                <div class="score">
                    <span class="fa fa-star-o fa-2x"></span>&nbsp;&nbsp;<span class="font20">{{score}}</span>
                </div>
                <div class="clearfix"></div>
                <div class="score">
                    <span class="fa fa-user-circle-o fa-2x"></span>&nbsp;&nbsp;<span class="font20">[{{mtop}},{{mleft}}]</span>
                </div>
                <div class="clearfix"></div>
                <div class="score">
                    <span class="fa fa-gift fa-2x"></span>&nbsp;&nbsp;<span class="font20">[{{stop}},{{sleft}}]</span>
                </div>
            </div>
            <div class="col-md-8 reset">
                <div id ="container" class="left">
                    <div id="gold" style="top:{{stop}}px;left:{{sleft}}px;"><img src="lib/img/star.gif" alt=""></div>
                    <div id="gift" ng-show="showGift" style="top:{{gtop}}px;left:{{gleft}}px;"></div>
                    <div class="boom" ng-show="showBoom1" style="top:{{b1top}}px;left:{{b1left}}px;"></div>
                    <div class="boom" ng-show="showBoom2"  style="top:{{b2top}}px;left:{{b2left}}px;"></div>
                    <div class="boom" ng-show="showBoom3"  style="top:{{b3top}}px;left:{{b3left}}px;"></div>

                    <div id ="animate"></div>
                </div>
                <div class="left">
                    <div class="nut">
                        <div class="time">
                            <span class="fa fa-clock-o fa-2x"></span>&nbsp;&nbsp;<span class="font20">{{time}}</span>
                        </div>
                    </div>
                    
                    <div class="nut">
                        <div class="time">
                            <span ng-show="heart<1" class="fa fa-frown-o fa-2x"></span>
                            <span ng-show="heart===3||heart===2||heart===1" class="fa fa-heart fa-2x"></span>
                            <span ng-show="heart===3||heart===2" class="fa fa-heart fa-2x"></span>
                            <span ng-show="heart===3" class="fa fa-heart fa-2x"></span>
                        </div>
                    </div>
                    <div class="nut" ng-show="heart<1" style="background: #f39c12;text-align: left;cursor: pointer;">
                        <div class="time">
                            <span class="fa fa-refresh fa-2x"></span>
                            <span ng-click="resetGame()">Chơi lại phát nữa</span>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
                
            </div>
            <div class="col-md-3"></div>
        </div>

        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="mgt2"></div>
                <div class="center">
                    <button class="btn btn-info btn-t btn-arrow" ng-click="setMpos('t')"><span class="fa fa-chevron-up fa-2x"></span></button><br>
                    <button class="btn btn-info btn-l btn-arrow" ng-click="setMpos('l')"><span class="fa fa-chevron-left fa-2x"></span></button>
                    <button class="btn btn-info btn-r btn-arrow" ng-click="setMpos('r')"><span class="fa fa-chevron-right fa-2x"></span></button><br>
                    <button class="btn btn-info btn-b btn-arrow" ng-click="setMpos('b')"><span class="fa fa-chevron-down fa-2x"></span></button>
                </div>
            </div>
        </div>
    </div>
    <audio controls  id="ting">
      <source src="lib/mp3/cash2.wav" type="audio/wav">
      Your browser does not support the audio tag.
    </audio>

    <audio controls  id="ringring">
      <source src="lib/mp3/ringring.wav" type="audio/wav">
      Your browser does not support the audio tag.
    </audio>
    <audio controls  id="warningring">
      <source src="lib/mp3/warning.wav" type="audio/wav">
      Your browser does not support the audio tag.
    </audio>
    
    <!-- Modal -->
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">{{modalHeader}}</h4>
            </div>
            <div class="modal-body">
              <p>Bạn đã ăn cục c*t quá nhiều lần ))</p>
              <button class='btn btn-warning' ng-click="resetGame()"><span></span>&nbsp;Chơi lại phát nữa</button>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    <script src="lib/js/app.js"></script>
</body>

</html>