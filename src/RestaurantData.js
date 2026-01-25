import { ChefHat, Star, Users } from 'lucide-react';

import background from "./assets/Background.jpg";

// Mock Data for the restaurant

const RestaurantData = {
  image: background,
  name: " Addis Place",
  tagline: "Where Culinary Artistry Meets Timeless Elegance.",
  description: "Nestled in the heart of the city, The Golden Spoon offers a farm-to-table dining experience, blending classic French techniques with fresh, local ingredients. Our commitment to excellence ensures every dish is a masterpiece and every visit is a celebration.",
  signatureDishes: [
    {
      id: 1,
      name: "Truffle Ribeye",
      description: "Aged USDA Prime ribeye, seared to perfection, served with black truffle mash.",
      price: "£45",
      icon: ChefHat,
    },
    {
      id: 2,
      name: "Seared Scallops",
      description: "Day-boat scallops with saffron risotto and brown butter foam.",
      price: "£32",
      icon: Star,
    },
    {
      id: 3,
      name: "Chocolate Lava Cake",
      description: "Molten dark chocolate cake, fresh raspberries, and vanilla bean ice cream.",
      price: "£14",
      icon: Users,
    },
  ],
  hours: [
    { day: 'Mon - Thu', time: '5:00 PM - 10:00 PM' },
    { day: 'Fri - Sat', time: '5:00 PM - 11:30 PM' },
    { day: 'Sunday', time: 'Closed' },
  ],
  address: "123 Elegance Lane, Metropolis, ME 56789",
  phone: "+44 20 1234 5678",
};
export default RestaurantData;