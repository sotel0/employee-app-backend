import { APIGatewayEvent } from "aws-lambda";

export default async function (event: APIGatewayEvent): Promise<any> {

  let body = event.body !== null ? JSON.parse(event.body) : {};

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
  knex("employees")
    .insert(body)
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
      message: "employee posted",
    }),
  };
}
