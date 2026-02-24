export interface CourseInterface {
  _id: string ;
  name: string;
  instructor: string;
  duration: string
  price: number
  color: string
  day: string
  time: string
  location: string
  genre: string
  level: string
  promotion: boolean
  capacity: number;
  availableSlots: number
  startDate: string
  isActive: boolean
}
