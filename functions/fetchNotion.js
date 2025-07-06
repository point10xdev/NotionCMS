const {Notion_Key, Notion_DB} = process.env;

const { Client } = require("@notionhq/client")

// Initializing a client
const notion = new Client({
  auth: Notion_Key,
});

exports.handler = async function (event, context) {
try{    
  const response = await notion.databases.query({
    database_id: Notion_DB,
        filter: {
          property: 'Status',
          status : {
            equals: 'Done',
          },
        },
  });

  return {
    statusCode: 200,
    body : JSON.stringify(response),
  };
}
catch(e){
    return{
          statusCode: 500,
          body : e.toString(),
    }
}
}
