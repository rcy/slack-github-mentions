function mentioned(str) {
  return str.match(/@\w+/g) || []
}

const handlers = {
  'default':  ({ event, payload }) => {
    console.log("DEFAULT HANDLER ================================================")
    console.log({ event, payload })
    console.log("----------------------------------------------------------------")
  },
  issue_comment: ({ event, payload }) => {
    switch (payload.action) {
      case 'created':
        return {
          mentioned: mentioned(payload.comment.body),
          body: payload.comment.body,
          url: payload.comment.html_url,
        }
      default:
        console.log('*** unhandled issue_comment action', payload.action)
    }
  },
  issues: ({ event, payload }) => {
    switch (payload.action) {
      case 'opened':
        return {
          mentioned: mentioned(payload.issue.body),
          body: payload.issue.body,
          url: payload.issue.html_url
        }
      default:
        console.log('*** unhandled issues action', payload.action)
    }
  },
}

export default handlers
