import { APIGatewayEvent } from "aws-lambda";

export default async function (event: APIGatewayEvent): Promise<any> {
  // console.log(event);

  // container_name: interview-mysql
  // ports:
  //   - 3336:3306
  // environment:
  //   MYSQL_DATABASE: employees
  //   MYSQL_USER: "employees"
  //   MYSQL_PASSWORD: "employeespassword"
  //   MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
  console.log(event.body);
  const options = {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "employees",
      port: "3336",
    },
  };

  const knex = require("knex")(options);
  console.log("knex connection starting");
  knex("employees")
    .insert(event.body)
    .then(() => console.log("data inserted in db"))
    .catch((err: Error) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      knex.destroy();
    });
  console.log("knex connection closed");

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
