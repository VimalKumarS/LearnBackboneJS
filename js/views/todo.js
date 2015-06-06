/**
 * Created by Vimal Kumar on 6/5/2015.
 */

var app = app  || {}

app.TodoView=  Backbone.View.extend({
    tagName: 'li',
    template : _.template($('#item-template').html()),
    events:{
        'click .toggle': 'togglecompleted',
        'dblclick label':'edit',
        'click .destroy': 'clear',
        'keypress .edit': 'updateOnEnter',
        'blur .edit' :'close'

    },

    initialize : function(){
        this.listenTo(this.model,'change',this.render);
        this.listenTo(this.model, 'destroy', this.remove);        // NEW
        this.listenTo(this.model, 'visible', this.toggleVisible);
    },

    render: function(){
        this.$el.html( this.template( this.model.attributes ) );

        this.$el.toggleClass( 'completed', this.model.get('completed') ); // NEW
        this.toggleVisible();                                             // NEW

        this.$input = this.$('.edit');
        return this;
    },
    // NEW - Toggles visibility of item
    toggleVisible : function () {
        this.$el.toggleClass( 'hidden',  this.isHidden());
    },

    // NEW - Determines if item should be hidden
    isHidden : function () {
        var isCompleted = this.model.get('completed');
        return ( // hidden cases only
            (!isCompleted && app.TodoFilter === 'completed')
            || (isCompleted && app.TodoFilter === 'active')
            );
    },

    // NEW - Toggle the `"completed"` state of the model.
    togglecompleted: function() {
        this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
        this.$el.addClass('editing');
        this.$input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
        var value = this.$input.val().trim();

        if ( value ) {
            this.model.save({ title: value });
        } else {
            this.clear(); // NEW
        }

        this.$el.removeClass('editing');
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function( e ) {
        if ( e.which === ENTER_KEY ) {
            this.close();
        }
    },

    // NEW - Remove the item, destroy the model from *localStorage* and delete its view.
    clear: function() {
        this.model.destroy();
    }
})


