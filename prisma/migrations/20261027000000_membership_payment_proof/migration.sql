ALTER TABLE `MembershipApplication`
  ADD COLUMN `bankName` VARCHAR(120) NULL,
  ADD COLUMN `senderAccountName` VARCHAR(120) NULL,
  ADD COLUMN `transactionReference` VARCHAR(120) NULL,
  ADD COLUMN `amountPaid` DECIMAL(10, 2) NULL,
  ADD COLUMN `paymentScreenshot` LONGBLOB NULL,
  ADD COLUMN `paymentScreenshotMime` VARCHAR(40) NULL,
  ADD COLUMN `paymentMethod` VARCHAR(20) NULL;
