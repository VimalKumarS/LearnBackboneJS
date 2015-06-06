/**
 * Created by Vimal Kumar on 6/6/2015.
 */
var app = app || {}

app.LibraryView= Backbone.View.extend({
    el:'#books',
    initialize:function(inittialBooks){
        this.collection = new app.library(inittialBooks);
        this.listenTo(this.collection,'add',this.renderBook)
        this.render();
    },
    events:{
      'click #add':'addBook',
        'click .delete':'deleteBook'
    },
    render:function(){
        this.collection.each(function(item){
            this.renderBook(item)
        },this)
    },
    renderBook:function(item){
        var bookView = new app.BookView({model:item})
        this.$el.append(bookView.render().el)
    },

    addBook:function(e) {
        e.preventDefault();
        var fromData={};

        $('#addBook div').children('input').each(function(i,el){
            if($(el).val()!=''){
                fromData[el.id]=$(el).val()
            }
        });
        this.collection.add(new app.Book(fromData))
    },
    deleteBook:function(){
        this.model.destroy();
        this.remove()
    }
})