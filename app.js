(function(angular){
    var module = angular.module('CalMakerApp',[]);

    module.controller('RootCtrl',function($scope){
        $scope.months = [];
        $scope.style = {
            cl:'default'
        };
    });

    module.controller('MonthCtrl',function($scope,$element){
        $scope.isCurrentMonth = function(d,m){
            if(d && d.date && d.getMonth && m && m.from && m.from.getMonth){
                return (d.date.getMonth() == m.from.getMonth());
            }
            return false;
        }
        $scope.headers = [
            {label:'Domingo'},
            {label:'Lunes'},
            {label:'Martes'},
            {label:'Miércoles'},
            {label:'Jueves'},
            {label:'Viernes'},
            {label:'Sábado'}
            
        ];
        $scope.show_img = false;
        $scope.todrop = false;
        $scope.handleDragEvent = function() {
            $scope.todrop = true;
        };
        $scope.handleDroppedFile = function(files) {
            if(files && files.length && files.length>0){
                var reader = new FileReader();
                reader.onload = function(e){
                    $scope.show_img = true;
                    var x = $element.find('img')[0];
                    console.log(x);
                    $element.find('img')[0].src = e.target.result;
                }
                reader.readAsDataURL(files[0]);
            }
        };
    });

    module.controller('ToolsCtrl',function($scope){
        $scope.from = new Date();
        $scope.qty = 12;
        $scope.makeCal = function(){
            $scope.months.splice($scope.qty);
            for(var i=$scope.months.length;i<$scope.qty;i++){
                var d = new Date($scope.from.getFullYear(),$scope.from.getMonth()+i,1);
                var month = makeMonth(d);
                $scope.months.push(month);
            }
        }
        var mn = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        function makeMonth(d){
            var from1 = new Date(d.getFullYear(),
                        d.getMonth(),
                        1);
            var from0 = new Date(from1.getFullYear(),
                        from1.getMonth(),
                        from1.getDate() - from1.getDay());
            var month = {
                'label':mn[d.getMonth()],
                'from':from0,
                'year':from0.getFullYear()
            };
            month.days = [];
            var daydate = from0;
            while(true){
                var day = {
                    'date':daydate,
                    'label':daydate.getDate()
                }
                month.days.push(day);
                daydate = new Date(daydate.getFullYear(),daydate.getMonth(),daydate.getDate()+1);
                if((daydate.getMonth() > from1.getMonth() && daydate.getDay() <= 0) || (month.days.length >= 35)){
                    break;
                }
            }
            return month;
        }
    })
})(window.angular);