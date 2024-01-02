import { ClientOnly } from "@crystallize/reactjs-hooks";
import { useState } from "react";
import { CheckoutCart } from "../components/checkout-forms/cart";
import { AddressForm } from "../components/checkout-forms/address";
import { Payments } from "../components/payment";

export default () => {
  // const { isAuthenticated } = useAuth();
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  return (
    <div className="min-h-[100vh] container py-3 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex gap-20 lg:flex-row flex-col">
        <CheckoutCart />
        <div className="rounded pt-5 lg:px-10 lg:w-3/5 w-full px-3 lg:pr-0">
          <ClientOnly>
            <>
              <AddressForm
                title="Guest Checkout"
                onValidSubmit={() => setShowPayments(true)}
              />
              {showPayments && <Payments />}
            </>
          </ClientOnly>
        </div>
      </div>
    </div>
  );
};