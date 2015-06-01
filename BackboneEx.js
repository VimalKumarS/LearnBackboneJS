/**
 * Created by Vimal Kumar on 6/1/2015.
 */
var Animal = Backbone.Model.extend({
    defaults: {
        name: 'Fido',
        color: 'black',
        sound: 'woof'
    },
    validate: function(attrs, options){
        if (!attrs.name){
            alert('Your animal must have a name!');
        }
        if (attrs.name.length < 2){
            alert('Your animal\'s name must have more than one letter!');
        }
    },
    sleep: function(){
        alert(this.get('name') + ' is sleeping.');
    }
});


var AnimalView = Backbone.View.extend({
    tagName: 'li', // defaults to div if not specified
    className: 'animal', // optional, can also set multiple like 'animal dog'
    id: 'dogs', // also optional
    events: {
        'click':         'alertTest',
        'click .edit':   'editAnimal',
        'click .delete': 'deleteAnimal'
    },
    //newTemplate: _.template('<%= name %> is <%= color %> and says <%= sound %>'), // inline template
    newTemplate: _.template($('#dogTemplate').html()), // inline template
    initialize: function() {
        this.render(); // render is an optional function that defines the logic for rendering a template
        this.model.on('change', this.render, this);
       // this.model.on('destroy', this.remove, this);
    },

    alertTest: function(){
        alert('Backbone click event works');
    },
    editAnimal: function(){
        var newAnimal = prompt("New animal name:", this.model.get('name')); // prompts for new name
        if (!newAnimal)return;  // no change if user hits cancel
        this.model.set('name', newAnimal); // sets new name to model
    },
    deleteAnimal: function(){
        this.model.destroy(); // deletes the model when delete button clicked
        this.$el.remove();
    }, remove: function(){
        this.$el.remove(); // removes the HTML element from view when delete button clicked/model deleted
    }, render: function() {
        // the below line represents the code prior to adding the template
        // this.$el.html(this.model.get('name') + ' is ' + this.model.get('color') + ' and says ' + this.model.get('sound'));
        this.$el.html(this.newTemplate(this.model.toJSON())); // calls the template
    }
});

var AnimalCollection = Backbone.Collection.extend({
    model: Animal
});
var chihuahua = new Animal({name: 'Sugar', color: 'black', sound: 'woof'});
var chihuahuaView = new AnimalView({model: chihuahua});
var animalCollection = new AnimalCollection(); // only need to create the collection once
animalCollection.add(chihuahua);

var pug = new Animal({name: 'Gizmo', color: 'tan', sound: 'woof'});
var pugView = new AnimalView({model: pug});
animalCollection.add(pug);


var animalCollection = new AnimalCollection([
    {
        name: 'Sugar',
        color: 'black',
        sound: 'woof'
    },
    {
        name: 'Gizmo',
        color: 'tan',
        sound: 'woof'
    },
    {
        name: 'Biscuit',
        color: 'brown',
        sound: 'arf'
    }
]);


var AnimalsView = Backbone.View.extend({ // calling this AnimalsView to distinguish as the view for the collection
    tagName: 'ul',
    initialize: function(){
        this.collection;
    },
    render: function(){
        this.collection.each(function(Animal){
            var animalView = new AnimalView({model: Animal});
            $(document.body).append(animalView.el);
        });
    }
});

// creates view for collection and renders collection
var animalsView = new AnimalsView({collection: animalCollection});
animalsView.render();