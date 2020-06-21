import { APIGatewayEvent } from "aws-lambda";

export default async function (event: APIGatewayEvent): Promise<any> {
  console.log(event);

  const options = {
    client: "mysql2",
    connection: {
      host: "localhost",
      user: "employees",
      password: "employeespassword",
      database: "employees",
    },
  };

  const knex = require("knex")(options);

  // knex.from('cars').select("*")
  // .then(result => console.log(result))
  //   .then((rows : string[]) => {
  //       for (let row of rows) {
  //           console.log(`${row['id']} ${row['name']} ${row['price']}`);
  //       }
  //   }).catch((err) => { console.log( err); throw err })
  //   .finally(() => {
  //       knex.destroy();
  //   });

  return {
    status: 200,
    body: JSON.stringify({
      message: "hello world",
    }),
  };
}
