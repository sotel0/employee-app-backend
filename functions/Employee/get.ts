import { APIGatewayEvent } from "aws-lambda";

export default async function (event: APIGatewayEvent): Promise<any> {
  interface Employee {
    first_name: string,
    address: string,
    last_name: string,
    city: string,
    email: string,
    state: string,
    phone: string,
    zip_code: string,
    status : boolean,
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
  const knex = require('knex')(options);

  return knex.select('*').from("employees")

      .then((rows : Employee[]) => {
    
           return {
            status: 200,
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(rows),
            };
        })
      .catch((err: Error) => { console.log(err); throw err })
      .finally(() => {
          knex.destroy();
        
      });

      // return {
      //   status: 200,
      //   headers: {
      //   "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify( employeeTable),
      //   };

    // console.log("employee table", employeeTable);

}
