
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

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}
