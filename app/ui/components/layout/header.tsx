'use client';

import Link from "~/bridge/ui/Link";
import { ShoppingBag, User } from "react-feather";
import Logo from "~/assets/HMG-logo-hor-black.svg";
import { useLocalCart } from "~/ui/hooks/useLocalCart";

export const Header: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const { cart } = useLocalCart();

  return (
    <header className="container py-3 mx-auto flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link className="font-bold text-2xl" to="/">
          <img src={Logo} alt="logo" width="170" height="50" />
        </Link>
        <nav className="flex gap-6">
          {navigation.map((navItem: any) => {
            return (
              <Link key={navItem.path} to={navItem.path} className="font-bold hover:text-orange-600">{navItem.name}</Link>
            )
          })}
        </nav>
      </div>
      <div className="flex gap-2">
        <span className="hover:text-orange-600"><User size={20} /></span>
        <span className="hover:text-orange-600">
          <span>{Object.keys(cart.items).reduce((memo: number, key: string) => {
            return memo + cart.items[key].quantity;
          }, 0)}</span>
          <ShoppingBag size={20} />
        </span>
      </div>
    </header>
  )
}