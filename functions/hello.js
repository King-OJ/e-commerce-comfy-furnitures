// domain/.netlify/functions/hello

const items = [
    {
        id: 1,
        name: 'john'
    },
    {
        id: 2,
        name: 'jane'
    },
]

exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify(items)
    }
}