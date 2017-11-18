(function (interact) {

    'use strict';

    var transformProp;
    var size = 40;

    interact.maxInteractions(Infinity);

    // setup draggable elements.
    interact('.js-drag')
        .draggable({ max: Infinity })
        .on('dragstart', function (event) {
            event.interaction.x = parseInt(event.target.getAttribute('data-x'), 10) || 0;
            event.interaction.y = parseInt(event.target.getAttribute('data-y'), 10) || 0;
        })
        .on('dragmove', function (event) {
            event.interaction.x += event.dx;
            event.interaction.y += event.dy;

            if (transformProp) {
                event.target.style[transformProp] =
                    'translate(' + event.interaction.x + 'px, ' + event.interaction.y + 'px)';
            }
            else {
                event.target.style.left = event.interaction.x + 'px';
                event.target.style.top  = event.interaction.y + 'px';
            }
        })
        .on('dragend', function (event) {
            event.target.setAttribute('data-x', event.interaction.x);
            event.target.setAttribute('data-y', event.interaction.y);
        });

    // setup drop areas.
    setupDropzone('.number', '.function');

    /**
     * Setup a given element as a dropzone.
     *
     * @param {HTMLElement|String} el
     * @param {String} accept
     */
    function setupDropzone(el, accept) {
        interact(el)
            .dropzone({
                accept: accept,
                ondropactivate: function (event) {
                    addClass(event.relatedTarget, '-drop-possible');
                },
                ondropdeactivate: function (event) {
                    removeClass(event.relatedTarget, '-drop-possible');
                }
            })
            .on('dropactivate', function (event) {
                var active = event.target.getAttribute('active')|0;

                // change style if it was previously not active
                if (active === 0) {
                    addClass(event.target, '-drop-active');
                    removeClass(event.target, '-drop-correct');
                }

                event.target.setAttribute('active', active + 1);
            })
            .on('dropdeactivate', function (event) {
                var active = event.target.getAttribute('active')|0;

                // change style if it was previously active
                // but will no longer be active
                if (active === 1) {
                    removeClass(event.target, '-drop-active');
                }

                event.target.setAttribute('active', active - 1);
            })
            .on('dragenter', function (event) {
                addClass(event.target, '-drop-correct');
                removeClass(event.target, '-drop-over');
                // Set on the correct drop area
            })
            .on('dragleave', function (event) {
                removeClass(event.target, '-drop-over');
                removeClass(event.target, '-drop-correct');
            })
            .on('drop', function (event) {
                removeClass(event.target, '-drop-over');
            });
    }

    function addClass (element, className) {
        if (element.classList) {
            return element.classList.add(className);
        }
        else {
            element.className += ' ' + className;
        }
    }

    function removeClass (element, className) {
        if (element.classList) {
            return element.classList.remove(className);
        }
        else {
            element.className = element.className.replace(new RegExp(className + ' *', 'g'), '');
        }
    }

    document.getElementById("addDrag").addEventListener("click", function() {
      var wrapper = document.createElement("div");

      wrapper.innerHTML = '<div class="js-drag math-item function" style="left: ' + size * 2 + 'px; top: ' + size + 'px;" data-x="' + size * 2 + '" data-y="' + size + '"></div>';
      var div = wrapper.firstChild;
      document.getElementById("container").appendChild(div);
    });

    document.getElementById("addDrop").addEventListener("click", function() {
      var wrapper = document.createElement("div");

      wrapper.innerHTML = '<div class="js-drag js-drop math-item number" style="left: ' + size * 2 + 'px; top: ' + size + 'px;" data-x="' + size * 2 + '" data-y="' + size + '"></div>';
      var div = wrapper.firstChild;
      document.getElementById("container").appendChild(div);
    });

    interact(document).on('ready', function () {
        transformProp = 'transform' in document.body.style
            ? 'transform': 'webkitTransform' in document.body.style
            ? 'webkitTransform': 'mozTransform' in document.body.style
            ? 'mozTransform': 'oTransform' in document.body.style
            ? 'oTransform': 'msTransform' in document.body.style
            ? 'msTransform': null;
    });

}(window.interact));
