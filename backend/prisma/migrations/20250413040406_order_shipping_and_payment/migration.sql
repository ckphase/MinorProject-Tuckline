-- AlterTable
ALTER TABLE `Order` ADD COLUMN `paymentMethod` VARCHAR(191) NULL,
    ADD COLUMN `shippingAddress` VARCHAR(191) NULL;
