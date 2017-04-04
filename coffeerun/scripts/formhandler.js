(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;


    function FormHandler(selector) {

        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);

        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }

    }

    FormHandler.prototype.addEmailOrderCheck = function(fn) {
        console.log('Checking email address in database');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var emailAddress = $('[name="emailAddress"]').val();

            console.log(emailAddress);
            console.log('yo');

            if (fn(emailAddress)) {
                $('[name="emailAddress"]').get(0).setCustomValidity('');
                console.log('everything aight');
            } else {
                $('[name="emailAddress"]').get(0).setCustomValidity('That order already exists in the database');
                console.log('everything aint aight');
            }
        });
    };

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });

            console.log(data);
            fn(data)
                .then(function() {
                    this.reset();
                    this.elements[0].focus();
                }.bind(this));
            this.reset();
            this.elements[0].focus();
            document.getElementById('strengthValue').innerText = 30;
            document.getElementById('strengthValue').style.color = 'green';
        });
    };


    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;

            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
    };

    FormHandler.prototype.addCaffeineHandler = function(fn) {

        this.$formElement.on('input', '[name="coffee"]', function() {
            if (fn($('[name="coffee"]').val(), $('[id="strengthLevel"]').val())) {
                $('[name="coffee"]').get(0).setCustomValidity('');
            } else {
                $('[name="coffee"]').get(0).setCustomValidity('Order cannot be decaf and be higher than 20 in caffeine intensity');
            }
        });

        this.$formElement.on('change', '[name="strength"]', function() {
            if (fn($('[name="coffee"]').val(), $('[name="strength"]').val())) {
                $('[name="coffee"]').get(0).setCustomValidity('');
            } else {
                $('[name="coffee"]').get(0).setCustomValidity('Order cannot be decaf and be higher than 20 in caffeine intensity');
            }
        });
    };

    FormHandler.prototype.resetHandler = function() {
        this.$formElement.on('reset', function() {
            document.getElementById('strengthValue').innerText = 30;
            document.getElementById('strengthValue').style.color = 'green';
            $('#powerUpForm').hide();
        });
    };

    FormHandler.prototype.showSliderValueHandler = function() {
        $(document).ready(function() {
            document.addEventListener('input', function() {
                var sliderValue = document.getElementById('strengthLevel').value;
                if (sliderValue < 35) {
                    document.getElementById('strengthValue').style.color = 'green';
                } else if (sliderValue < 75) {
                    document.getElementById('strengthValue').style.color = 'gold';
                } else {
                    document.getElementById('strengthValue').style.color = 'red';
                }
                document.getElementById('strengthValue').innerText = sliderValue;
            });
        });
    };



    App.FormHandler = FormHandler;
    window.App = App;
})(window);
