QUnit.test('hello test', function(assert) {
    assert.ok(1 == '1', 'Passed!');
});

QUnit.test('Testing DataStore Methods', function(assert) {
    var App = window.App;
    var ds = new App.DataStore();

    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');
    assert.deepEqual(ds.getAll(), {
        'james@bond.com': 'eshpressho',
        'm@bond.com': 'tea'
    }, 'got everything');

    ds.remove('james@bond.com');
    assert.deepEqual(ds.getAll(), {
        'm@bond.com': 'tea'
    }, 'removed james@bond');

    assert.equal(ds.get('m@bond.com'), 'tea', 'got the order for m@bond');

    assert.equal(ds.get('james@bond.com'), undefined, 'james@bond order is gone');
});

QUnit.test('Testing Truck Methods', function(assert) {
    var App = window.App;
    var myTruck = App.Truck;

    myTruck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    });
    myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    });
    myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    });

    assert.deepEqual(myTruck.printOrders(), [{
        'coffee': 'double mocha',
        'emailAddress': 'me@goldfinger.com'
    },
    {
        'coffee': 'decaf',
        'emailAddress': 'dr@no.com'
    },
    {
        'coffee': 'earl grey',
        'emailAddress': 'm@bond.com'
    }
    ],
        'created all the 3 orders');

    myTruck.deliverOrder('dr@no.com');
    myTruck.deliverOrder('m@bond.com');

    assert.deepEqual(myTruck.printOrders(), [{
        'coffee': 'double mocha',
        'emailAddress': 'me@goldfinger.com'
    }], 'delievered 2 orders');
});

//The problem with the truck module was that printOrders didn't return anything, so we had to go in and change that
