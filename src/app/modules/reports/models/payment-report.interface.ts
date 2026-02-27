export interface Person {
  fullName: string;
  identificationNumber: number;
  email: string;
  phone: string;
}

export interface BookingInfo extends Person {
  birthDate: string;
}

export interface Course {
  classId: string;
  className: string;
  genre: string;
  day: string;
  time: string;
  startDate: string | null;
  level: string;
  mainPerson: Person;
  companions: Companion[];
  discounts: DiscountsFacture[]
}

export interface Companion {
  fullName: string;
  identificationNumber: string;
  phone: string;
  email: string;
}

export interface DiscountsFacture {
  description: string;
  percentage: number;
  value: number;
}

export interface DiscountsCourse {
  description: string;
  percentage: number;
  value: number;
}

export interface ReportInterface {
  paymentId: string;
  cashPayment: boolean;
  bookingInfo: BookingInfo;
  coursesCount: number;
  amount: number;
  paymentDate: string;
  location: string;
  discounts: DiscountsCourse[];
  courses: Course[];
}
