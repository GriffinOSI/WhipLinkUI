const fetch = require('node-fetch')
exports.handler = async function(event, context) {

    const destinationUrl = event.queryStringParameters.destinationUrl || ""
    console.log("desty" + destinationUrl)

    try {
        const response = await fetch("http://www.whi.pw/create", {
                headers: {
                  "content-type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ destinationUrl: destinationUrl })
              })

        if (!response.ok) {
          return { statusCode: response.status, body: response.statusText }
        }
        const data = await response.json()
        console.log("data" + JSON.stringify(data))
        return {
          statusCode: 200,
          body: JSON.stringify({ data })
        }
      } catch (err) {
        console.log(err) // output to netlify function log
        return {
          statusCode: 500,
          body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
        }
      }
    }

//   return fetch("http://www.whi.pw/create", {
//     headers: {
//       "content-type": "application/json"
//     },
//     method: "POST",
//     body: JSON.stringify({ destinationUrl: destinationUrl })
//   })
//   .then(response => response.json())
//   .then(data => ({
//     statusCode: 200,
//     body: JSON.stringify({data})
//   }))
//   .catch(error => ({ statusCode: 409, body: "null" }));
//   }