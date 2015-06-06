/**
 * Created by Vimal Kumar on 6/5/2015.
 */

var app = app || {}

app.Todo = Backbone.Model.extend({
    defaults:{
        title: '',
        completed:false
    },
    toggle:function(){
        this.save({
            completed: !this.get('completed')
        })
    }
})