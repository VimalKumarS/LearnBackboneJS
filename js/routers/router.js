/**
 * Created by Vimal Kumar on 6/5/2015.
 */
var Workspace= Backbone.Router.extend({
    routes:{
        '*filter' : 'setFilter'
    },
    setFilter:function(){
        window.app.Todos.trigger('filter')
    }
})

app.TodoRouter = new Workspace()
Backbone.history.start()