import { createClient } from "@crystallize/js-api-client";

export default async (path: string) => {
  const CrystallizeClient = createClient({
    tenantIdentifier: 'infoworks',
  });

  const data = await CrystallizeClient.catalogueApi(`
    query ($language: String!, $path: String!) {
      product: catalogue(language: $language, path: $path) {
        name
        path
        summary: component(id: "summary") {
          content {
            ...on RichTextContent {
              json
            }
          }
        }
          
        ... on Product {
          variants {
            name
            sku
            isDefault
            attributes {
              attribute
              value
            }
            stockLocations {
              identifier
              stock
              name
            }
            images {
              url
              variants {
                url
                height
                width
              }
            }
            priceVariants {
              identifier
              price
              currency
            }
            usdPrice: priceVariant(identifier: "american-dollar") {
              currency
              price
            }
          }
        }
      }
    }
  `, {
    "language": "en",
    "path": path
  });

  return data.product;
}