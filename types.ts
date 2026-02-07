
export interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  avatar?: string;
  joinedAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  type: string;
  beds: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon?: string;
  image: string;
}

export interface NavLink {
  label: string;
  href: string;
}
