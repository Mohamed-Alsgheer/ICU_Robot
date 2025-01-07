export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface IMapContainerStyle {
  width: string;
  height: string;
}

export interface Location {
  location: ICoordinates;
  visible?: boolean;
  title?: string;
  description?: string;
  icon?: string;
}

export interface IUserLocation {
  location: ICoordinates;
  icon?: string;
}

