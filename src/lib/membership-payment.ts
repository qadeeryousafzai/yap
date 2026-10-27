import { z } from "zod";

const optionSchema = z.object({
  enabled: z.boolean(),
  label: z.string().trim().min(2).max(80),
  provider: z.string().trim().max(120),
  accountHolder: z.string().trim().max(120),
  accountNumber: z.string().trim().max(120),
  instructions: z.string().trim().max(500),
});

export const membershipPaymentSettingsSchema = z.object({
  fixedAmount: z.string().trim().regex(/^\d{1,8}(\.\d{1,2})?$/),
  bank: optionSchema,
  wallet: optionSchema,
}).refine((settings) => settings.bank.enabled || settings.wallet.enabled, {
  message: "Enable at least one payment method.",
}).refine((settings) => [settings.bank, settings.wallet].every((option) => !option.enabled || (option.provider.length >= 2 && option.accountHolder.length >= 2 && option.accountNumber.length >= 4)), {
  message: "Complete the provider, account holder, and account number for each enabled method.",
});

export type MembershipPaymentSettings = z.infer<typeof membershipPaymentSettingsSchema>;

export const emptyMembershipPaymentSettings: MembershipPaymentSettings = {
  fixedAmount: "0",
  bank: { enabled: false, label: "Bank transfer", provider: "", accountHolder: "", accountNumber: "", instructions: "" },
  wallet: { enabled: false, label: "Other wallet", provider: "", accountHolder: "", accountNumber: "", instructions: "" },
};

export function parseMembershipPaymentSettings(value: unknown): MembershipPaymentSettings | null {
  const parsed = membershipPaymentSettingsSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}
