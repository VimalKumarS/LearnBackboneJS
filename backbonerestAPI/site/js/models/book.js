/**
 * Created by Vimal Kumar on 6/6/2015.
 */

var  app= app || {}

app.Book= Backbone.Model.extend({
    defaults:{
        coverImage: 'img/cover.png',
        title:'No title',
        author:'UnKnown',
        releaseDate:'UnKnown',
        keywords:'None'
    }

})