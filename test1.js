Colors = new Meteor.Collection("colors")
if (Meteor.isClient) {

  Template.color_list.colors = function () {
    return Colors.find({}, {sort: {likes: -1, name: 1}});
  };

  Template.color_info.maybe_selected = function () {
    return Session.equals('session_color', this._id) ? "selected" : "";
  };

  Template.color_list.events = {
    'click button': function () {
      Colors.update(Session.get('session_color'), {$inc: {likes: 1}});
    }
  };

  Template.color_info.how_many = function () {
    if (!this.likes) return "no";
    if (this.likes < 100) return "a few";
    if (this.likes < 200) return "many";
    return "alot of";
  }

  Template.color_info.events = {
    'click': function () {
      Session.set('session_color', this._id);
    }
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
