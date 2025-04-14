 export const getUserLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });
  };
  

 export const jsonData = [
    { label: 'Accommodation Hotel', value: 'accommodation.hotel' },
    { label: 'Accommodation Hut', value: 'accommodation.hut' },
    { label: 'Accommodation Apartment', value: 'accommodation.apartment' },
    { label: 'Accommodation Chalet', value: 'accommodation.chalet' },
    { label: 'Accommodation Guest House', value: 'accommodation.guest_house' },
    { label: 'Accommodation Hostel', value: 'accommodation.hostel' },
    { label: 'Accommodation Motel', value: 'accommodation.motel' },
    { label: 'Accommodation', value: 'accommodation' },
    { label: 'Activity Community Center', value: 'activity.community_center' },
    { label: 'Activity Sport Club', value: 'activity.sport_club' },
    { label: 'Activity', value: 'activity' },
    { label: 'Adult Nightclub', value: 'adult.nightclub' },
    { label: 'Adult Stripclub', value: 'adult.stripclub' },
    { label: 'Adult Swingerclub', value: 'adult.swingerclub' },
    { label: 'Adult Brothel', value: 'adult.brothel' },
    { label: 'Adult Casino', value: 'adult.casino' },
    { label: 'Adult Adult Gaming Centre', value: 'adult.adult_gaming_centre' },
    { label: 'Adult', value: 'adult' },
    { label: 'Airport Private', value: 'airport.private' },
    { label: 'Airport International', value: 'airport.international' },
    { label: 'Airport Military', value: 'airport.military' },
    { label: 'Airport Gliding', value: 'airport.gliding' },
    { label: 'Airport Airfield', value: 'airport.airfield' },
    { label: 'Airport', value: 'airport' },
    { label: 'Amenity Toilet', value: 'amenity.toilet' },
    { label: 'Amenity Drinking Water', value: 'amenity.drinking_water' },
    { label: 'Amenity Give Box Food', value: 'amenity.give_box.food' },
    { label: 'Amenity Give Box Books', value: 'amenity.give_box.books' },
    { label: 'Amenity Give Box', value: 'amenity.give_box' },
    { label: 'Amenity', value: 'amenity' },
  ]
  

export const fetchLocalServices = async ({
  serviceType,
  bounds
}: {
  serviceType:string
  bounds:string
}) =>{
  try {
    const res = await fetch(`/api/local?type=${serviceType}&bounds=${bounds}`);
    const data = await res.json();
    return data
  } catch (error) {
    console.log("Error", error)
    return []
  }
}