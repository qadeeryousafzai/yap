-- CreateTable
CREATE TABLE `AdminUser` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `role` ENUM('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'MEMBERSHIP', 'FINANCE', 'HR') NOT NULL DEFAULT 'EDITOR',
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AdminUser_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdminSession` (
    `id` VARCHAR(191) NOT NULL,
    `tokenHash` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `AdminSession_tokenHash_key`(`tokenHash`),
    INDEX `AdminSession_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Page` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `metaTitle` VARCHAR(180) NULL,
    `metaDescription` VARCHAR(320) NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Page_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HomepageSection` (
    `id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` TEXT NULL,
    `content` JSON NULL,
    `imageUrl` VARCHAR(2048) NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `HomepageSection_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteSetting` (
    `key` VARCHAR(191) NOT NULL,
    `value` JSON NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamMember` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NULL,
    `biography` LONGTEXT NOT NULL,
    `imageUrl` VARCHAR(2048) NULL,
    `category` VARCHAR(191) NOT NULL DEFAULT 'Leadership',
    `socialLinks` JSON NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `TeamMember_slug_key`(`slug`),
    INDEX `TeamMember_active_sortOrder_idx`(`active`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Career` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `employmentType` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `requirements` LONGTEXT NOT NULL,
    `responsibilities` LONGTEXT NOT NULL,
    `deadline` DATETIME(3) NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Career_slug_key`(`slug`),
    INDEX `Career_status_deadline_idx`(`status`, `deadline`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobApplication` (
    `id` VARCHAR(191) NOT NULL,
    `careerId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `cvUrl` VARCHAR(2048) NULL,
    `message` LONGTEXT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'REVIEWING') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `JobApplication_email_status_idx`(`email`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MembershipApplication` (
    `id` VARCHAR(191) NOT NULL,
    `applicationNo` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `education` VARCHAR(191) NULL,
    `profession` VARCHAR(191) NULL,
    `interests` JSON NULL,
    `skills` TEXT NULL,
    `category` VARCHAR(191) NOT NULL,
    `motivation` TEXT NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'REVIEWING') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `MembershipApplication_applicationNo_key`(`applicationNo`),
    INDEX `MembershipApplication_email_status_createdAt_idx`(`email`, `status`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Member` (
    `id` VARCHAR(191) NOT NULL,
    `memberNo` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Member_memberNo_key`(`memberNo`),
    UNIQUE INDEX `Member_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(2048) NULL,
    `startsAt` DATETIME(3) NOT NULL,
    `endsAt` DATETIME(3) NULL,
    `venue` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `registrationDeadline` DATETIME(3) NULL,
    `capacity` INTEGER NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Event_slug_key`(`slug`),
    INDEX `Event_status_startsAt_idx`(`status`, `startsAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventRegistration` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `EventRegistration_createdAt_idx`(`createdAt`),
    UNIQUE INDEX `EventRegistration_eventId_email_key`(`eventId`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectCategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ProjectCategory_name_key`(`name`),
    UNIQUE INDEX `ProjectCategory_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `objectives` LONGTEXT NULL,
    `beneficiaries` TEXT NULL,
    `location` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(2048) NULL,
    `status` ENUM('PLANNED', 'ONGOING', 'COMPLETED', 'ARCHIVED') NOT NULL DEFAULT 'PLANNED',
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `categoryId` VARCHAR(191) NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Project_slug_key`(`slug`),
    INDEX `Project_status_featured_idx`(`status`, `featured`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DonationAppeal` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `targetAmount` DECIMAL(14, 2) NOT NULL,
    `currency` CHAR(3) NOT NULL DEFAULT 'PKR',
    `startsAt` DATETIME(3) NULL,
    `endsAt` DATETIME(3) NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `imageUrl` VARCHAR(2048) NULL,
    `projectId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `DonationAppeal_slug_key`(`slug`),
    INDEX `DonationAppeal_status_endsAt_idx`(`status`, `endsAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Donation` (
    `id` VARCHAR(191) NOT NULL,
    `appealId` VARCHAR(191) NOT NULL,
    `donorName` VARCHAR(191) NULL,
    `donorEmail` VARCHAR(191) NULL,
    `amount` DECIMAL(14, 2) NOT NULL,
    `currency` CHAR(3) NOT NULL DEFAULT 'PKR',
    `status` ENUM('PENDING', 'VERIFIED', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    `publicName` BOOLEAN NOT NULL DEFAULT false,
    `verifiedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Donation_appealId_status_createdAt_idx`(`appealId`, `status`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentTransaction` (
    `id` VARCHAR(191) NOT NULL,
    `donationId` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerRef` VARCHAR(191) NULL,
    `idempotencyKey` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `rawEventId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PaymentTransaction_donationId_key`(`donationId`),
    UNIQUE INDEX `PaymentTransaction_providerRef_key`(`providerRef`),
    UNIQUE INDEX `PaymentTransaction_idempotencyKey_key`(`idempotencyKey`),
    UNIQUE INDEX `PaymentTransaction_rawEventId_key`(`rawEventId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DonationReceipt` (
    `id` VARCHAR(191) NOT NULL,
    `donationId` VARCHAR(191) NOT NULL,
    `receiptNo` VARCHAR(191) NOT NULL,
    `issuedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `DonationReceipt_donationId_key`(`donationId`),
    UNIQUE INDEX `DonationReceipt_receiptNo_key`(`receiptNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GalleryAlbum` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `GalleryAlbum_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GalleryItem` (
    `id` VARCHAR(191) NOT NULL,
    `albumId` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'IMAGE',
    `url` VARCHAR(2048) NOT NULL,
    `caption` VARCHAR(191) NULL,
    `altText` VARCHAR(191) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `published` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogCategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BlogCategory_name_key`(`name`),
    UNIQUE INDEX `BlogCategory_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogTag` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BlogTag_name_key`(`name`),
    UNIQUE INDEX `BlogTag_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogPost` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `excerpt` TEXT NOT NULL,
    `content` LONGTEXT NOT NULL,
    `imageUrl` VARCHAR(2048) NULL,
    `author` VARCHAR(191) NOT NULL,
    `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `publishedAt` DATETIME(3) NULL,
    `metaTitle` VARCHAR(180) NULL,
    `metaDescription` VARCHAR(320) NULL,
    `categoryId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `BlogPost_slug_key`(`slug`),
    INDEX `BlogPost_status_publishedAt_idx`(`status`, `publishedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogPostTag` (
    `postId` VARCHAR(191) NOT NULL,
    `tagId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`postId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MediaAsset` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(2048) NOT NULL,
    `publicId` VARCHAR(191) NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `mimeType` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `altText` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `MediaAsset_publicId_key`(`publicId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactMessage` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,
    `readAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ContactMessage_readAt_createdAt_idx`(`readAt`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NewsletterSubscriber` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `confirmedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `NewsletterSubscriber_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Partner` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `logoUrl` VARCHAR(2048) NULL,
    `websiteUrl` VARCHAR(2048) NULL,
    `description` TEXT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testimonial` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NULL,
    `quote` TEXT NOT NULL,
    `imageUrl` VARCHAR(2048) NULL,
    `approved` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivityLog` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `action` VARCHAR(191) NOT NULL,
    `entity` VARCHAR(191) NOT NULL,
    `entityId` VARCHAR(191) NULL,
    `metadata` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ActivityLog_createdAt_entity_idx`(`createdAt`, `entity`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AdminSession` ADD CONSTRAINT `AdminSession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `AdminUser`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobApplication` ADD CONSTRAINT `JobApplication_careerId_fkey` FOREIGN KEY (`careerId`) REFERENCES `Career`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventRegistration` ADD CONSTRAINT `EventRegistration_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ProjectCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DonationAppeal` ADD CONSTRAINT `DonationAppeal_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_appealId_fkey` FOREIGN KEY (`appealId`) REFERENCES `DonationAppeal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentTransaction` ADD CONSTRAINT `PaymentTransaction_donationId_fkey` FOREIGN KEY (`donationId`) REFERENCES `Donation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DonationReceipt` ADD CONSTRAINT `DonationReceipt_donationId_fkey` FOREIGN KEY (`donationId`) REFERENCES `Donation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GalleryItem` ADD CONSTRAINT `GalleryItem_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `GalleryAlbum`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BlogPost` ADD CONSTRAINT `BlogPost_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `BlogCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BlogPostTag` ADD CONSTRAINT `BlogPostTag_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `BlogPost`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BlogPostTag` ADD CONSTRAINT `BlogPostTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `BlogTag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `AdminUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

