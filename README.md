# Slack Invite for Meteor

Inspired by [Slackin](https://github.com/rauchg/slackin) but built for Meteor using Meteor sub projects.

## Installation

```
meteor add studiointeract:slack-invite
```

## Usage

First [create a token for your Slack team here.](https://api.slack.com/web)

Add that token together with your teamname i your settings.json file. (Don't forget to start Meteor using it, if you're testing it locally, i.e. meteor --settings settings.json).

**Example settings.json**
```js
{
  "slackToken": "___REAPLACE_WITH_TOKEN___",
}
```

Add to your template like this:

```html
  {{> slackInvite}}
```

