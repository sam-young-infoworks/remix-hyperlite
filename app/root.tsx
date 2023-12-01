import { json, type LinksFunction, type LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { createClient, createNavigationFetcher } from "@crystallize/js-api-client";
import { Header } from "~/ui/components/layout/header";
import { Footer } from "~/ui/components/layout/footer";
import sylesheet from "~/styles/index.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: sylesheet,
    },
  ];
};

export const loader: LoaderFunction = async () => {
  const CrystallizeClient = createClient({
    tenantIdentifier: 'infoworks',
  });

  const fetch = createNavigationFetcher(CrystallizeClient).byFolders;
  const navigation = await fetch('/', 'en', 3);
  return json({ navigation: navigation.tree.children });
};

const Document: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="root flow">
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { navigation }: any = useLoaderData();

  return (
    <>
      <Header navigation={navigation[0].children} />
      <div>{children}</div>
      <Footer navigation={navigation} />
    </>
  );
};

export default () => {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
};
