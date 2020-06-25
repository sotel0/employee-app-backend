import { APIGatewayEvent } from "aws-lambda";

export default async function (event: APIGatewayEvent): Promise<any> {
  console.log(event.body);

  return {
    status: 200,
    body: JSON.stringify({
      message: "employee status activated",
    }),
  };
}
