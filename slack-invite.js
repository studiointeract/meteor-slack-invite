Slack = new Mongo.Collection('slack');

if (Meteor.isClient) {
  Template.slackInvite.onCreated(function() {
    var instance = this;
    instance.invite = new ReactiveVar(false);
    instance.error = new ReactiveVar("");
    instance.subscribe('slack');
  });

  Template.slackInvite.helpers({
    invite: function() {
      var instance = Template.instance();
      return instance.invite.get();
    },

    slack: function() {
      return Slack.findOne();
    },

    error: function() {
      var instance = Template.instance();
      return instance.error.get();
    }
  });

  Template.slackInvite.events({
    'submit form': function(e, instance) {
      e.preventDefault();
      var email = instance.find('input').value;
      Meteor.call('invite', email, function(err, res) {
        if (!err && res.ok) {
          instance.error.set("");
          instance.invite.set(true);
        }
        else if (!err){
          instance.error.set(res.error);
        }
        else {
          instance.error.set('Someting is broken here.');
        }
      });
    }
  });
}
