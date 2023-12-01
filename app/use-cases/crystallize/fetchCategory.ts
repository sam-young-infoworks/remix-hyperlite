import { createClient } from "@crystallize/js-api-client";

export default async (path: string) => {
  const CrystallizeClient = createClient({
    tenantIdentifier: 'infoworks',
  });

  const data = await CrystallizeClient.catalogueApi(`
    query ($language: String!, $path: String!) {
      category: catalogue(language: $language, path: $path) {
        name
        products: children {
          name
          ... on Product {
            path
            defaultVariant {
              name
              price
              firstImage {
                url
                variants {
                  url
                  width
                  height
                }
              }
              usdPrice: priceVariant(identifier: "american-dollar") {
                currency
                price
              }
            }
          }
        }
      }
    }
  `, {
    "language": "en",
    "path": path
  });

  return data.category;
}