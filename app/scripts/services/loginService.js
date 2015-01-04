/**
 * Created by Kumar Gaurav(kumar.gaurav@synerzip.com) on 2/1/15.
 */


'use strict';
/* jshint unused:false */
angular.module('socialscouttWebApp')
  .factory('loginService', function( $log, $q, $http, $state ){
    var api = 'http://localhost:9000/login';
    var userDetail = {};
    var tempCookie = '"userInfo="{"username": "testUser","LinkedIn": {"loggedInWith": true,"configured": true},' +
                     '"Twitter": {"loggedInWith":false,"configured": true}}';
    var self = this;

    /***
     *
     * @param name
     * @returns {*}
     */
    function readCookie(name) {
      var nameEQ = name + "=";
      //TODO change code when actual cookie as json
      // string will be provided from server

      //var ca = document.cookie.split(';');
      var ca = tempCookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 1)
          return c.substring(nameEQ.length+2,c.length);
      }
      return null;
    }

    /***
     * Internal Method to set User Detail
     * @returns {{}}
     */
    function setUserDetail(detail){
      userDetail = detail;

    }

    /***
     * Internal Method to return User Detail
     * @returns User details
     */
    function getSetUserDetail(){
      return userDetail;
    }


    /***
     * Read and parse cookie to get and return User detail
     * @returns {*}
     */
    function getUserDetail(){
      var detail = JSON.parse(readCookie('userInfo'));
      setUserDetail(detail);
      return detail;
    }


    return {


      /***
       *
       * @param loginServerName
       * @returns {jQuery.promise|promise.promise|promise|d.promise|.ready.promise|jQuery.ready.promise}
       */
      login : function(loginServerName){
        var deferred = $q.defer();

        $http.get(api , setUserDetail)
          .success(function(data, status, headers, config){
            // this callback will be called asynchronously when the response is available
            deferred.resolve({
               userDetail : getUserDetail()
            });
          }).
          error(function(msg, code) {
            // called asynchronously if an error occurs or server returns response with an error status.
            deferred.reject(msg);
            $log.error(msg,code);
          });
        return deferred.promise;
      },

      /***
       * checks whether user is logged in
       * @returns {boolean}
       */
      isUserLoggedIn : function() {
        if (!getSetUserDetail()) {
          return false;
        } else {
            if(getSetUserDetail().LinkedIn.loggedInWith || getSetUserDetail().Twitter.loggedInWith)
              return true;
          return false;
        }
      },

      /**
       * Change state to the give state
       * @param stateName
       */
      changeState : function(stateName){
        $state.go(stateName);
      },

      /***
       * Method to get and set user detail
       * @returns {User}
       */
      userDetail : function(){
        return getSetUserDetail();
      }
    };
  });
