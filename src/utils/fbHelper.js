import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk'

export const getCurrentProfile = () =>
  new Promise((resolve, reject) => {
    const req = new GraphRequest(
      '/me',
      {
        httpMethod: 'GET',
        version: 'v2.5',
        parameters: {
          fields: {
            string: 'email,name,cover,first_name,last_name,locale',
          },
        },
      },
      (err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res)
      }
    )
    new GraphRequestManager().addRequest(req).start()
  })
