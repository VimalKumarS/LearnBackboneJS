/**
 * Created by Vimal Kumar on 5/31/2015.
 */

var Vehicle = Backbone.Model.extend({
    prop1:'1'
},
    {
        summary: function(){
            return "Vehicle are for travelling";
        }
    });

var v = new Vehicle();
var v2= new Vehicle();

v.prop1='one'

console.log(v.prop1);
console.log(v2.prop1);

console.log(Vehicle.summary());

///

var veh= Backbone.Model.extend({
    initialize: function () {
        console.log('vehicle created');
    }
})

/// Model Inheritance
var A = Backbone.Model.extend({
    initialize: function(){
        console.log('initialize A')
    },
    asString:function(){
        return JSON.stringify(this.toJSON());
    }
})

var a = new A({
    one:1,
    two: 2
})

console.log(a.asString())

var B = A.extend({})
var b= new B({
    three:'3'
})

console.log(b.asString())

console.log(b instanceof A) //true
console.log(b instanceof Backbone.ModelSetOptions ) //true

/////////////////

var veh= Backbone.Model.extend({
    dump:function(){
        console.log(JSON.stringify(this.toJSON()))
    }
})

var v =new veh({ type:'car'})
v.dump()
v.set('color','blue')
v.dump()

///Events
//Model raise events when their state change
//to detect a change to a model listen for change event
// ford.on('change',function(){})
// or listen to a change to a property

//it is possible to define trigger and observer custim model events
//events are identified by string identifiers
// Use the 'on' methid to bind to an event

//ford.on('retired',function(){})
//ford.trigger('retired')

var volcano= _.extend({},Backbone.Events);
volcano.on('disaster:eruption',function(options){
    console.log('');
});

volcano.trigger('disaster:eruption',{plan:'run'})

volcano.off('disaster:eruption'
)
volcano.trigger('disaster:eruption',{plan:'run'})

////The id property represent the model's identity.It is undefined until the model has been saved
// the cid property is a temporary identifier userd until a model is assigned its 'id'

var ford = new Backbone.Model({})
ford.isNew()
ford.cid
ford.id

//the 'default property sepcidiees defalut values for attributes that are not set in the constructir
var f= Backbone.Model.extend({
    defaults:{
        one:"1"
    }
})

//expose model validity
// validate -
// isValid
// validate is called by backbone prior to performing 'set or 'save' operation
var v= Backbone.Model.extend({
    validate: function(attrs){
        var validColors=['white','red','blue','yellow']
        var colorIsValid=function(attrs){
            if(!attrs.color) return true;
            return _(validColors).include(attrs.color)
        }
        if(!colorIsValid(attrs)){
            return validColors.join(',')
        }
    }
})

var car = new v()
car.on('error',function(model,error){
    console.log(error)
})

car.set('foo','bar')


//////////view
var RefreshView= Backbone.View.extend({
    initialize: function(){
        this.model.on('change', function () {
            this.render();
        },this)
    },
    render:function(){
        this.$el.html(this.model.get('text'))
    }
})

var m= new Backbone.Model({text:new Date().toString()})
var v =new RefreshView({model:m ,el:'body'})
v.render()


var FormView=Backbone.View.extend({
    events:{
        'click .clickable':'handleClick'

    },
    render:function(){

    }
})