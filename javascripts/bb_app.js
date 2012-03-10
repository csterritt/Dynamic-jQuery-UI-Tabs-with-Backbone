/*
 Contains the Backbone.js application logic.
 */

(function($) {

  // The TabExTab object
  window.TabExTab = Backbone.Model.extend({
    initialize: function() {
    },

    defaults: {
      name: "Name",
      contents: "Contents of Name"
    }
  });

  window.buildTabExUI = function() {

    // --------------------------------------------------------------------------
    // The view for a single TabExBlock object
    window.TabExTabView = Backbone.View.extend({

      initialize: function() {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
      },

      render: function() {
        // add the actual content
        $("#tab_wrapper").append('<div id="tab_' + this.model.cid + '">'
            + this.model.get('contents')
            + '<br /><br /><br />'
            + '<a href="#" class="deleter" id="' + this.model.cid
            + '">Delete this tab</a></div>');

        // ask jQueryUI to add the tab to the bar
        $("#tab_wrapper").tabs("add", "#tab_" + this.model.cid, this.model.get('name'));

        return this;
      }
    });

    // --------------------------------------------------------------------------
    // The router
    window.TabExRouter = Backbone.Router.extend({
      routes: {
        '': 'home'
      },

      initialize: function() {
      },

      home: function() {
        $('#tab_ul').empty();
        $('#tab_wrapper').empty();
        $('#tab_wrapper').append('<ul id="tab_ul"></ul>');

        // Set up the tab holder
        $("#tab_wrapper").tabs();

        // Preexisting tabs (from the server, presumably)
        var t1 = [new window.TabExTab({name: "First", contents: "First tab's contents"}),
                  new window.TabExTab({name: "Second", contents: "Second tab's contents"}),
                  new window.TabExTab({name: "Third", contents: "Third tab's contents"})];
        _.each(t1, function(tab) {
          var btv = new window.TabExTabView({ model: tab });
          btv.render();
        });
      },

      addTab: function(new_name, new_contents) {
        var nt = new window.TabExTab({ name: new_name, contents: new_contents });
        var btv = new window.TabExTabView({ model: nt });
        btv.render();
      }
    });

    // --------------------------------------------------------------------------
    // Kick off the application
    window.App = new TabExRouter();
    Backbone.history.start();

  }

})(jQuery);
