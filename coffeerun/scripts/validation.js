(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    var Validation = {
        isCompanyEmail: function(email) {
            return /.+@bignerdranch\.com$/.test(email);
        },
        decafCheck: function(order, caffeine) {
            return !(caffeine > 20 && /.?decaf.?/.test(order));
        },
        databaseHasEmail: function(email) {
            $.get('http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders' + '/' + email, function(serverResponse) {

                while(serverResponse != null) {
                    console.log('im finally in here');
                    if (email == serverResponse.emailAddress) {
                        console.log('ayy i found the email');
                        return false;
                    } else {
                        console.log('i didnt find anything');
                        return true;
                    }
                }
            });
        }
    };

    App.Validation = Validation;
    window.App = App;
})(window);
