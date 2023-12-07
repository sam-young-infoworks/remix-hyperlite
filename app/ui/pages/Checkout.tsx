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
    <div className="2xl lg:container lg:px-6 px-2 mx-auto min-h-[100vh]">
      <div className="flex gap-20 lg:flex-row flex-col">
        <CheckoutCart />
        <div className="rounded pt-5 lg:px-10 lg:w-3/5 w-full px-3">
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