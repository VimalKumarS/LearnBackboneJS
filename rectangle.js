/**
 * Created by Vimal Kumar on 5/31/2015.
 */
//IIFE
(function(){
    var Rectangle= Backbone.Model.extend({});

    var RectangleView= Backbone.View.extend({

        tagname:'div',
        className: 'rectangle',

        events:{
          'click':'move'
        },

        render: function(){
            this.setDimensions();
            this.setposition();
            return this;
        },
        setDimensions: function () {
            this.$el.css({
                width: this.model.get('width') + 'px',
                height: this.model.get('height') +'px'
            });
        },
        setposition:function(){
          var position = this.model.get('position')
          this.$el.css({
              left:position.x,
              top: position.y
          })
        },
        move:function(){
            this.$el.css('left',this.$el.position().left + 10)
        }

    });

    var myRectangle= new Rectangle({
        width:100,
        height: 60,
        position:{
            x:300,
            y:150
        }

    })

    var myView= new RectangleView({
        model:myRectangle
    })

    $('div#canvas').append(myView.render().el);
})();