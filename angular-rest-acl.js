
angular.module('angular-rest-acl', ['angular-storage','ui.router'])

    .constant('MODULE_VERSION', '0.0.1')

    .value('config', {
        acl: [],
        rol: [],
        isRole: false,
        permission: 'opt',
        mode: 'disabled'
    })

    .factory('RestAcl', function(store, config, $state, $timeout) {
        var func = {
                setAcl : function(roles){
                    store.set("ngrest-acl", roles);
                },
                getAcl : function(){
                    return store.get("ngrest-acl");
                },
                checkAcl : function(rol, acl, permission, mode){
                      return res;
                },
                isOk : function(rol, permission, mode){
                    var acl = angular.copy(config);
                    acl.acl = func.getAcl();
                    var counter = 0;

                    if(!(permission == undefined || permission == null || permission == '')){
                      acl.permission = permission;
                    }

                    if(!(mode == undefined || mode == null || mode == '')){
                      acl.mode = mode;
                    }

                    if(angular.isArray(rol)){
                      console.log("checking if its your own role");
                      for(var x = 0; x < rol.length; x++ ){
                        var rg = rol[x].split('-');
                        try{
                            if(acl.acl[rg[0]].indexOf(rol[x]) >= 0){
                              if(acl.permission=='opt'){
                                acl.isRole = true;
                                break;
                              }else{
                                counter++;
                                if(counter==rol.length){
                                  acl.isRole = true;
                                  break;
                                }
                              }
                            }
                        }catch(e){
                          //do nothing
                        }
                      }
                    }else{
                        var rg = rol.split('-');
                        try{
                            if(acl.acl[rg[0]].indexOf(rol) >= 0){
                              acl.isRole = true;
                            }
                        }catch(e){
                          //do nothing
                        }
                    }

                    return {
                      "result": acl.isRole,
                      "mode": acl.mode
                    };
                },
                resolveRoles: function(rol, permission){
                  var isRole = func.isOk(rol, permission, 'hide');
                    if(!isRole.result){
                        $timeout(function(){
                            $state.go('dashboard');
                        })
                    }
                }
            }   
            return func;   
    })

    .directive('ngRestAcl', function(RestAcl, $compile) {

      return {
        restrict: "A",
        scope: {
          aclmode: "@",
          aclpermission: "@"
        },
        link: function(scope, element, attrs) {
          element.removeAttr("ng-rest-acl");

          var rol = scope.$eval(attrs.ngRestAcl);

          var isRole = RestAcl.isOk(rol, scope.aclpermission, scope.aclmode);

          if(!isRole.result){
            element.remove();
            // element.attr('ng-' + isRole.mode,true);
          }
          // $compile(element)(scope);
        }
      };
    })
;