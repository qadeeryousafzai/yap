import test from "node:test";
import assert from "node:assert/strict";
import { contactSchema, membershipSchema, newsletterSchema } from "@/lib/validation";

test("contact validation accepts a complete message", () => {
  assert.equal(contactSchema.safeParse({ name: "Sam Example", email: "sam@example.org", subject: "Community question", message: "I would like to learn about volunteering." }).success, true);
});

test("contact validation rejects malformed email and short message", () => {
  assert.equal(contactSchema.safeParse({ name: "Sam", email: "invalid", subject: "Hi", message: "No" }).success, false);
});

test("newsletter validation rejects non-email input", () => {
  assert.equal(newsletterSchema.safeParse({ email: "not-an-email" }).success, false);
});

test("membership applications require consent and basic location details", () => {
  const base = { name: "Sam Example", email: "sam@example.org", phone: "+923001234567", city: "Lahore", province: "Punjab", category: "Youth member", motivation: "I want to contribute my time to community work.", consent: "on", paymentMethod: "bank", senderAccountName: "Sam Example", transactionReference: "TXN-123456" };
  assert.equal(membershipSchema.safeParse(base).success, true);
  assert.equal(membershipSchema.safeParse({ ...base, consent: undefined }).success, false);
});
