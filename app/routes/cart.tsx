import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import fetchCategory from "~/use-cases/crystallize/fetchCategory";
import Cart from "~/ui/pages/Cart";
import { useLocalCart } from "~/ui/hooks/useLocalCart";

export default () => {
  const { cart } = useLocalCart();
  return <Cart cart={cart} />;
};