export enum UserRole {
  ADMIN = "ADMIN",
  GUIDE = "GUIDE",
  TOURIST = "TOURIST",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}

export enum TourCategory {
  HISTORY = "HISTORY",
  FOOD = "FOOD",
  NIGHTLIFE = "NIGHTLIFE",
  SHOPPING = "SHOPPING",
  ADVENTURE = "ADVENTURE",
  CULTURE = "CULTURE",
  ART = "ART",
  NATURE = "NATURE",
}

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
}

export enum PaymentStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
  FAILED = "FAILED",
}
