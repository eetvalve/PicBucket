angular.module('uploadmodalctrl', [])
        .controller('UploadModalCtrl', ['$scope', '$http', 'Upload', '$window', 'imageService', function ($scope, $http, Upload, $window, imageService) {

                var vm = this;
                vm.submit = function () { //function to call on form submit
                    if (vm.upload_form.file.$valid && vm.files) { //check if from is valid
                        vm.upload(vm.files); //call upload function
                        
                    }
                };
                vm.upload = function (file) {               
                    for (var i = 0; i < file.length; i++) {                
                        Upload.upload({
                            url: '/api/upload', //webAPI exposed to upload the file
                            data: {file: file[i]} //pass file as data, should be user ng-model
                        }).then(function (resp) { //upload function returns a promise
                            imageService.getPics();
                        }, function (resp) { //catch error
                            console.log('Error status: ' + resp.status);
                            $window.alert('Error status: ' + resp.status);
                        }, function (evt) {
                            console.log(evt);
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
                        });
                    }
                    ;
                };



            }]);