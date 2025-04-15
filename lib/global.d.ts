interface Meal {
    type: "Breakfast" | "Lunch" | "Dinner";
    name: string;
    time: string;
    vegetarian: boolean;
  }
  
  interface DailyMealPlan {
    day: string;
    meals: Meal[];
  }
  interface DailyMealPlanResponse {
    days: DailyMealPlan[];
    groceryList: string[];
  }
  
  interface MealPlan {
    days: DailyMealPlan[];
  }

  interface Suggestions{
    title: string,
    description:string
  }


   interface ApiResponse {
    type: string;
    features: FeaturesEntity[];
  }
   interface FeaturesEntity {
    type: string;
    properties: Properties;
    geometry: Geometry;
  }
   interface Properties {
    name: string;
    country: string;
    country_code: string;
    state: string;
    county: string;
    city: string;
    postcode: string;
    suburb?: string | null;
    street: string;
    housenumber?: string | null;
    iso3166_2: string;
    lon: number;
    lat: number;
    state_code: string;
    formatted: string;
    address_line1: string;
    address_line2: string;
    categories?: (string)[] | null;
    details?: (string)[] | null;
    datasource: Datasource;
    website?: string | null;
    opening_hours: string;
    brand?: string | null;
    brand_details?: BrandDetails | null;
    contact?: Contact | null;
    facilities: Facilities;
    payment_options?: PaymentOptions | null;
    building?: Building | null;
    commercial: Commercial;
    place_id: string;
    operator?: string | null;
    old_name?: string | null;
    name_other?: NameOther | null;
  }
   interface Datasource {
    sourcename: string;
    attribution: string;
    license: string;
    url: string;
    raw: Raw;
  }
   interface Raw {
    name: string;
    shop: string;
    brand?: string | null;
    phone?: string | null;
    osm_id: number;
    organic?: string | null;
    website?: string | null;
    building?: string | null;
    osm_type: string;
    stroller?: string | null;
    'addr:city'?: string | null;
    check_date?: string | null;
    wheelchair: string;
    'addr:street'?: string | null;
    second_hand?: string | null;
    'currency:EUR'?: string | null;
    'payment:cash'?: string | null;
    'payment:visa'?: string | null;
   ' addr:postcode'?: number | null;
    'opening_hours': string;
    'payment:coins'?: string | null;
    'payment:notes'?: string | null;
    'brand:wikidata'?: string | null;
    'brand:wikipedia'?: string | null;
    'building:levels'?: number | null;
    internet_access?: string | null;
    'addr:housenumber'?: number | null;
    'air_conditioning'?: string | null;
    'payment:girocard'?: string | null;
    'payment:contactless'?: string | null;
    'payment:credit_cards'?: string | null;
   ' addr:country'?: string | null;
    level?: number | null;
    indoor?: string | null;
    operator?: string | null;
    start_date?: string | null;
    'payment:mastercard'?: string | null;
    old_name?: string | null;
  }
   interface BrandDetails {
    wikidata: string;
    wikipedia?: string | null;
  }
   interface Contact {
    phone: string;
  }
   interface Facilities {
    internet_access?: boolean | null;
    wheelchair: boolean;
    air_conditioning?: boolean | null;
  }
   interface PaymentOptions {
    cash: boolean;
    visa: boolean;
    coins?: boolean | null;
    notes?: boolean | null;
    girocard?: boolean | null;
    contactless?: boolean | null;
    credit_cards?: boolean | null;
    mastercard?: boolean | null;
  }
   interface Building {
    levels?: number | null;
    type: string;
  }
   interface Commercial {
    type: string;
    organic?: boolean | null;
    level?: number | null;
    indoor?: boolean | null;
  }
   interface NameOther {
    old_name: string;
  }
   interface Geometry {
    type: string;
    coordinates?: (number)[] | null;
  }
  

  type Message = {
    id: string
    content: string
    role: "user" | "assistant"
  }
  
  type Chat = {
    id: string
    title: string
    messages: Message[]
    createdAt: Date
  }
  

type AIModel = {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
}
