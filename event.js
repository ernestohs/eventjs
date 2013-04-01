(function (window, undefined) {

    window.eventHandler = (function () {

        window.eventsCache = (function () {
            var self = this;
            self.events = {};

            return {

                add: function (node, eventName, handler) {
                    self.events[node] = {
                        type: eventName,
                        handler: handler
                    };
                },

                has: function (item) {
                    return !!self.events[item];
                },

                get: function (item) {
                    return self.events[item];
                },

                remove: function (item) {
                    var result = false;

                    if (self.events[item]) {
                        self.events[item] = undefined;
                        result = true;
                    }

                    return result;
                }
            };

        })();

        var result = {
            addEvent: function (elem, type, handler) {
                var keyEvent = type + handler;
                var idEvent = 'e' + keyEvent;

                elem['on' + type] = elem[idEvent];
                eventsCache.add(elem, type, handler);
            },

            removeEvent: function (elem, type) {
                if (!eventsCache.has(elem)) return;
                var idEvent = 'e' + keyEvent;

                elem[idEvent] = undefined;
                elem['on' + type] = undefined;
                eventsCache.remove(elem);
            }
        };

        if (document.addEventListener) {
            result = {
                addEvent: function (elem, type, handler) {
                    elem.addEventListener(type, handler, false);
                    eventsCache.add(elem, type, handler);
                },

                removeEvent: function (elem, type) {
                    if (!eventsCache.has(elem)) return;
                    var cached = eventsCache.get(elem);

                    elem.removeEventListener(type, cached.handler);
                    eventsCache.remove(elem);
                }
            };
        } else if (document.attachEvent) {
            result = {
                addEvent: function (elem, type, handler) {
                    var keyEvent = type + handler;

                    elem[keyEvent] = function () {
                        var event = window.event
                        event['target'] = event['srcElement'];
                        handler(event);
                    };

                    elem.attachEvent('on' + type, elem[keyEvent]);
                    eventsCache.add(elem, type, elem[keyEvent]);
                },

                removeEvent: function (elem, type) {
                    if (!eventsCache.has(elem)) return;
                    var cached = eventsCache.get(elem);
                    var keyEvent = type + cached.handler;
                    var idEvent = 'e' + keyEvent;

                    elem[idEvent] = undefined;

                    elem[keyEvent] = undefined;

                    elem.detachEvent('on' + type, cached.handler);
                    eventsCache.remove(elem);
                }
            };
        }

        return result;

    })();

})(window);
