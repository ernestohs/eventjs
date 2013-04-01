var UnitTests = {};

UnitTests.test = function () {

    var self = this;

    module('eventsCache');

    test('add', function () {
      try {
      var node = document.createElement('a');
      eventsCache.add(node, 'click', function(){  });
        ok( true, 'You can add elements to the cache' );
      }
      catch(e){
        ok( false );
      }
    });

    test('has', function () {
      var node = document.createElement('a');
      eventsCache.add(node, 'click', function(){  });
      ok( eventsCache.has(node), 'The "has" method does works' );
    });

    test('get', function () {
      var node = document.createElement('a');
      eventsCache.add(node, 'click', function(){  });
      ok( eventsCache.get(node) && eventsCache.has(node), 'The "get" method does works');
    });

    test('remove', function (){
      var node = document.createElement('a');
      eventsCache.add(node, 'click', function(){  });
      ok( eventsCache.has(node), 'The item is in the cache' );
      ok( eventsCache.get(node), 'We can get the data form the cache' );
      ok( eventsCache.remove(node), 'Remove the item' );
      ok( !eventsCache.has(node), 'The item was removed form the cache' );
    });

    module('eventHandler');
    
    test('Add Event', function() {
      var clickEvent;
      var result = false;
      var fixture = document.getElementById('qunit-fixture');
      
      eventHandler.addEvent(fixture, 'click', function () { result = true; });
      
       if (document.createEvent) {     // all browsers except IE before version 9
         clickEvent = document.createEvent ("MouseEvent");
         clickEvent.initMouseEvent ("click", true, true, window, 0, 
                                    0, 0, 0, 0, 
                                    0, 0, 0, 0, 
                                    0, null);
         fixture.dispatchEvent (clickEvent);
       } else {
         if (document.createEventObject) {   // IE before version 9
           clickEvent = document.createEventObject ();
           clickEvent.button = 1;  // left click
           fixture.fireEvent ("onclick", clickEvent);
         }
       }
      
      ok( result, 'Add Event method works' );
      ok( eventsCache.has(fixture), 'The event is in the cache' );
    });
  
    test('Remove Event', function() {
      var clickEvent;
      var result = true;
      var fixture = document.getElementById('qunit-fixture-2');
      
      eventHandler.addEvent(fixture, 'click', function () { result = false; });
      ok( eventsCache.has(fixture), 'The event is in the cache' );
      
      eventHandler.removeEvent(fixture, 'click');
      
       if (document.createEvent) {     // all browsers except IE before version 9
         clickEvent = document.createEvent ("MouseEvent");
         clickEvent.initMouseEvent ("click", true, true, window, 0, 
                                    0, 0, 0, 0, 
                                    0, 0, 0, 0, 
                                    0, null);
         fixture.dispatchEvent (clickEvent);
       } else {
         if (document.createEventObject) {   // IE before version 9
           clickEvent = document.createEventObject ();
           clickEvent.button = 1;  // left click
           fixture.fireEvent ("onclick", clickEvent);
         }
       }
      
      ok( result, 'Remove Event method works' );
      ok( !eventsCache.has(fixture), 'The event isn\'t in the cache' );
    });
};

UnitTests.test ();