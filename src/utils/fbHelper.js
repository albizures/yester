import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk'

export const getCurrentProfile = () =>
  new Promise((resolve, reject) => {
    const req = new GraphRequest(
      '/me',
      {
        parameters: {
          fields: {
            string: 'email,name,first_name,last_name',
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
