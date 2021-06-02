// apollo.config.js
module.exports = {
    client: {
      service: {
        name: 'Album',
        // URL to the GraphQL API
        url: 'https://album-backend-python.herokuapp.com/graphql',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }