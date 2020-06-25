import { APIGatewayEvent } from "aws-lambda";

export default async function (event: APIGatewayEvent): Promise<any> {
  
  let path_id : string = "";
  if (event.pathParameters !== null){
    path_id = event.pathParameters['id'];
  }

  const options = {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      user: "employees",
      password: "employeespassword",
      database: "employees",
      port: "3336",
    },
  };

  const knex = require("knex")(options);
  knex("employees").where({user_id: path_id}).first()
    .update({
      status : '0'
    })
    .catch((err: Error) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      knex.destroy();
    });

  return {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "employee deactivated",
    }),
  };
}
