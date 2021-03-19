module.exports = {
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
                key: 'X-Powered-By',
                value: 'DotHQ Magic',
            },
            {
                key: 'Access-Control-Allow-Origin',
                value: '*'
            }
          ],
        },
      ]
    },
  }