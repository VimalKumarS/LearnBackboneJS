/**
 * Created by Vimal Kumar on 6/5/2015.
 */
var Todo= Backbone.Model.extend({
    defaults:{
        title:'',
        completed:false
    }
});

var myTodo=new Todo({
    title:"Check attribute property of the logged models in the console"
})

var TodoView= Backbone.View.extend({
    tagName:'li',
    todoTpl: _.template($('#item-template').html()),
    events:{
        'dblclick lable':'edit',
        'keypress .edit':'updateOnEnter',
        'blur .edit':'close'
    },

    initialize: function(){
        this.$el=$('#todo')
    },

    render:function(){
        this.$el.html(this.todoTpl(this.model.toJSON()));
        this.input=this.$('.edit')
        return this;
    },
    edit: function () {

    },
    close:function(){

    },
    updateOnEnter:function(e){

    }
})

var todoView = new TodoView({model:myTodo});
//todoView.render()


var v= Backbone.View.extend({
    el:"#todo",
    events:{
        'click [type="checkbox"]' :'clicked'
    },
    initialize: function () {
        this.$el.click(this.jqueryClicked);
        this.on('apiEvent',this.callback)
    },
    clicked: function(event){
        console.log("clicked"+this.el.outerHTML)
        this.trigger('apiEvent',event.type)
    },
    jqueryClicked: function (event) {
        console.log("jqueryclicked"+this.outerHTML)
    },
    callback:function(eventType){
        console.log("callback"+eventType)
    }
})

var view=new v();
view.render();

var TodoRouter=Backbone.Router.extend({
    routes:{
        "about":"showAbout",
        "todo/:id":"getTodo",
        "search/:query":"searchTodos",
        "search/:query/p:page":"searchTodos",
        "todos/:id/download/*documentPath":"downloadDocument",
        "*other":"defaultRoute",
        "optional(/:item)":"optionalItem",
        "named/optional/(y:z)":"namedOptionalItem"
    },
    showAbout: function () {

    },
    getTodo: function(id){
        console.log(id)
    },
    searchTodos:function(query,page){

    },
    downloadDocument:function(id,path){
        console.log(id)
    },
    defaultRoute: function (other) {
        console.log(other)
    }
})

var myTodoRouter=new TodoRouter()
Backbone.history.start()