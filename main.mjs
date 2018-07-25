import express from 'express'
const app = express()
import handlers from './handlers.mjs'
import slack from './slack.mjs'
import gh2s from './gh2s.mjs'

app.use(express.json());

app.post('/', (req,res) => {
  const event = req.get("X-Github-Event")
  const action = req.body.action
  const payload = req.body

  if (handlers[event]) {
    const { mentioned, body, url } = handlers[event]({ event, payload })
    console.log({ mentioned, body, url, event, action: payload.action })
    mentioned.forEach(githubUser => {
      const slackUser = gh2s[githubUser]
      console.log(`${payload.sender.login} mentioned ${githubUser} (${slackUser}) in ${event} ${payload.action}: ${url}`)
      if (slackUser) {
        slack(slackUser, `${payload.sender.login} mentioned you in ${url}`)
      } else {
        slack('ryan', `W: no slack user for github user: ${githubUser}`)
        console.error('no slack user for github user', githubUser)
      }
    })
  } else {
    handlers['default']({ event, payload })
  }
  
  res.send('OK')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
