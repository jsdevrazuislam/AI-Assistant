type GeoapifyParams = {
  category: string;
  bbox: string;
  limit?: number;
};

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
}: {
  serviceType: string;
  bounds: string;
}) {


  const url = getGeoapifyPlacesURL({
    category: serviceType,
    bbox: bounds,
  });

  const res = await fetch(url);
  const data = await res.json();
  return formatGeoapifyResults(data)
}


function getGeoapifyPlacesURL({
  category,
  bbox,
  limit = 20,
}: GeoapifyParams): string {
  return `https://api.geoapify.com/v2/places?categories=${category}&filter=rect:${bbox}&limit=${limit}&apiKey=${process.env.MAP_API_KEY}`;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const serviceType = searchParams.get("type") || "commercial.supermarket";
  const bounds = searchParams.get("bounds") || "";

  if (!bounds) {
    return Response.json({ error: "Missing bounds or API key" });
  }

  const results = await fetchLocalServices({
    serviceType,
    bounds,
  });

  return Response.json(results);
}