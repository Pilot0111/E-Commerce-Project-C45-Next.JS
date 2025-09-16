import * as z from "zod";

export const AddressFormSchema = z.object({
  cartId: z.string().nonempty({ message: "Cart id is required." }),
  details: z
    .string()
    .nonempty({ message: "Address is required." })
    .min(3, { message: "Address must be at least 3 characters." }),
  city: z
    .string()
    .nonempty({ message: "City is required." })
    .min(3, { message: "City must be at least 3 characters." }),
  phone: z
    .string()
    .nonempty({ message: "Phone number is required." })
    .regex(/^(?:002|\+2)?01[0-5][0-9]{8}$/, {
      message: "Invalid Egyptian phone number.",
    }),
  paymentMethod: z.enum(["cash", "card"], {
    message: "Payment method is required.",
  }),
});

export type AddressFormSchemaType = z.infer<typeof AddressFormSchema>;

export const addressState = {
  success: false,
  errors: {
    cartId: [] as string[],
    details: [] as string[],
    city: [] as string[],
    phone: [] as string[],
    paymentMethod: [] as string[],
  },
  message: null,
  callbackURL: null,
  paymentMethod: "",
};

export type AddressStateType = {
  success: boolean;
  errors: {
    cartId?: string[];
    details?: string[];
    city?: string[];
    phone?: string[];
    paymentMethod?: string[];
  };
  message: string | null;
  callbackURL?: string | null;
  paymentMethod: string;
};
