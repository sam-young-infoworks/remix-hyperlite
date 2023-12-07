import { createOrderFetcher } from "@crystallize/js-api-client";
import { CartWrapper, handleOrderRequestPayload } from "@crystallize/node-service-api-request-handlers";
import { LoaderFunction } from "@remix-run/node";
import { privateJson } from "~/core/bridge/privateJson.server";
import { getContext } from "~/use-cases/http/utils";
import { cartWrapperRepository } from "~/use-cases/services.server";
import { getStoreFront } from "~/use-cases/storefront.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const requestContext = getContext(request);
  const { secret: storefront } = await getStoreFront(requestContext.host);
  const auth: any = undefined;
  const cartId = requestContext.url.searchParams.get('cartId');

  let cartWrapper: CartWrapper | null | undefined = cartId ? await cartWrapperRepository.find(cartId) : null;

  try {
    const order = await handleOrderRequestPayload(null, {
      fetcherById: createOrderFetcher(storefront.apiClient).byId,
      user: auth?.email,
      orderId: params.id!,
      checkIfOrderBelongsToUser: () => {
        return !(cartWrapper && cartWrapper?.extra?.orderId === params.id);
      },
    });

    return privateJson(order);
  } catch (exception: any) {
    if (exception?.status === 403) {
      throw new Response(exception.message, {
        status: 403,
        statusText: exception.message,
      });
    }
    console.log('exception', exception);
  }

  throw new Response('Order Not Found', {
    status: 404,
    statusText: 'Order Not Found',
  });
}