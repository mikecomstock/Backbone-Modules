MC.Views.PlaceSearchInput = Backbone.View.extend({
    initialize: function () {

        this.geocoder = new google.maps.Geocoder();

        var self = this;
        this.source = function (request, response) {
            self.geocoder.geocode({ 'address': request.term }, function (results, status) {

                results.forEach(function (r) {
                    r.label = r.formatted_address;
                });

                response(results);
            });
        };

        this.autocomplete = this.$el.autocomplete({ source: this.source, autoFocus: true });
    },
    events: {
        'autocompleteselect': 'autocompleteselect'
    },
    autocompleteselect: function (event, ui) {
        this.trigger('select', ui.item);
    }
});