import { handleCartRequestPayload, CartPayload, cartPayload } from "@crystallize/node-service-api-request-handlers";
import { ActionFunction, json } from "@remix-run/node";

export function validatePayload<T>(payload: unknown, scema: any | null): T {
  if (!scema) {
    return payload as T;
  }
  return scema.parse(payload);
}

export const action: ActionFunction = async ({ request }) => {
  const body = await request.json();

  const data = await handleCartRequestPayload(validatePayload<CartPayload>(body, cartPayload), {
    currency: 'USD',
    perVariant: () => {
      return {
        firstImage: {
          url: true,
        },
      };
    },
  })

  return json({ hydratedCart: data });
}