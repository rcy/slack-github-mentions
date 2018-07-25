import SlackClient from '@slack/client';

const token = process.env.SLACK_TOKEN;
console.log('slack init', { token })
const web = new SlackClient.WebClient(token);

function slack(user, message) {
  web.chat.postMessage({ channel: user, text: message, as_user: true })
     .then(result => {
       console.log("Slack message sent", { user, message })
     })
  console.log('slack', { user, message })
}

slack('@ryan', 'initialized bot')

export default slack;
