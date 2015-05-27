Meteor.setInterval(function() {
  try {
    HTTP.get('https://slack.com/api/rtm.start', {params: {
      token: Meteor.settings.slackToken
    }}, function(err, res) {
      if (!err && res.data && res.data.users) {
        var users = res.data.users;
        var total = users.length;
        var active = _.filter(users, function(user) {
          return 'active' == user.presence;
        }).length;

        var data = {
          _id: 'slack',
          online: active,
          registered: total
        };
        // Extend data with team info.
        _.extend(data, _.pick(res.data.team, 'name', 'domain'));

        // Upsert data in Mongo.
        Slack.upsert({_id: 'slack'}, data);
      }
    });
  } catch(e) {
    console.log(e);
  }
}, 30000);

Meteor.publish('slack', function() {
  return Slack.find({_id:'slack'});
});
