function getGeoapifyPlacesURL({
    category,
    bbox,
    apiKey,
    limit = 20
  }: {
    category: string;
    bbox: string; 
    apiKey: string;
    limit?: number;
  }) {
    return `https://api.geoapify.com/v2/places?categories=${category}&filter=rect:${bbox}&limit=${limit}&apiKey=${apiKey}`;
  }

  const formatGeoapifyResults = (geoapifyData: ApiResponse) => {
    return geoapifyData?.features.map((feature, index) => {
      const props = feature.properties;
  
      const randomDistance = (Math.random() * 5 + 0.5).toFixed(1);
      const randomPhone = `+880 1${Math.floor(600000000 + Math.random() * 399999999)}`;
      const randomReviews = 50 + Math.floor(Math.random() * 150);
      const randomRating = (4 + Math.random()).toFixed(1);
  
      return {
        id: index + 1,
        name: props.name || "Unnamed",
        category: props.categories?.[0]?.split(".")?.[1]?.replace("_", " ") || "Local Service",
        rating: parseFloat(randomRating),
        reviews: randomReviews,
        distance: `${randomDistance} km`,
        address: props.address_line1 || props.street || "Unknown Address",
        phone: randomPhone,
        hours: props.opening_hours
          ? `Open until ${props.opening_hours?.split("-")?.at(-1)?.split(":")?.[0]}:00 PM`
          : "Not available",
        services: ["General Service", "Customer Support", "Local Access"],
        price: ["$10", "$50", "$100"][Math.floor(Math.random() * 3)],
      };
    });
  };
  
  
  

  export async function fetchLocalServices({
    serviceType,
    bounds,
    apiKey
  }: {
    serviceType: string;
    bounds: string;
    apiKey: string;
  }) {
  
    const url = getGeoapifyPlacesURL({
      category:serviceType,
      bbox: bounds,
      apiKey
    });
  
    const res = await fetch(url);
    const data = await res.json();
    return formatGeoapifyResults(data)
  }
  
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
  