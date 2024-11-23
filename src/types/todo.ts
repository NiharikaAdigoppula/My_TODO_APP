export type ClothingType = 
  | 'dresses' | 'tops' | 'bottoms' | 'sleepwear' 
  | 'swimwear' | 'outerwear' | 'undergarments' 
  | 'accessories' | 'formal' | 'casual';

export type AccommodationType = 
  | 'hotel' | 'hostel' | 'resort' 
  | 'apartment' | 'homestay' | 'camping';

export type TransportType = 
  | 'flight' | 'train' | 'bus' 
  | 'car-rental' | 'taxi' | 'ferry';

export type ActivityType = 
  | 'sightseeing' | 'adventure' | 'cultural' 
  | 'food-tasting' | 'shopping' | 'relaxation';

export type PlaceType = 
  | 'landmarks' | 'museums' | 'parks' 
  | 'beaches' | 'restaurants' | 'markets';

export type EssentialType = 
  | 'footwear' | 'electronics' | 'toiletries' 
  | 'documents' | 'medicines' | 'accessories';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  destination: string;
  category: 'accommodation' | 'transport' | 'activities' | 'essentials' | 'clothing' | 'places';
  subCategory: ClothingType | AccommodationType | TransportType | ActivityType | PlaceType | EssentialType;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
}