"use server";

import { checkOutSchematype } from "@/schema/checkout.schema";
import getMyToken from "@/utilities/getMyToken";

export default async function onlinePayment(
  cartId: string,
  url=process.env.NEXT_URL,
  formValues: checkOutSchematype
) {

    const token = await getMyToken()
    if(!token) throw new Error("login frist")

        const res = await fetch(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http:${url}`,
            {
                method:"POST",
                headers:{
                    token,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({shippingAddress:formValues})
            }
        )

        const payload = await res.json()
        return payload

}