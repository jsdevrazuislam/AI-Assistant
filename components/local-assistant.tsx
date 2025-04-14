"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Star, Phone, Clock, Loader2, Navigation } from "lucide-react"
import { fetchLocalServices, getUserLocation, jsonData } from "@/lib/api"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function LocalAssistant() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [activeTab, setActiveTab] = useState("search")
  const [userLocation, setUserLocation] = useState("Dhaka, Bangladesh")

  const handleSearch = async (search?:string) => {

    const position = await getUserLocation();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const bounds = `90.3654,23.7964,90.4083,23.7621`; 
    // const bounds = `${lon - 0.02},${lat + 0.02},${lon + 0.02},${lat - 0.02}`; 


    setIsSearching(true)
    const results = await fetchLocalServices({
      serviceType: search ?? searchQuery,
      bounds,
      apiKey: process.env.NEXT_PUBLIC_MAP_API_KEY!
    });
    
    setSearchResults(results);
    setIsSearching(false)
  }

  const handleVoiceSearch = () => {
    setIsVoiceActive(true)
    setTimeout(() => {
      setSearchQuery("আমার কাছে সস্তায় ল্যাপটপ রিপেয়ার করে কে?")
      setIsVoiceActive(false)

      // Automatically search after voice input
      setTimeout(() => {
        handleSearch()
      }, 500)
    }, 2000)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Local Assistant</h1>
        <p className="text-slate-500 dark:text-slate-400">Find services and businesses near you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Find Local Services</CardTitle>
              <CardDescription>Search for businesses and services in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="search">Search</TabsTrigger>
                </TabsList>
                <TabsContent value="search">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                      <Select onValueChange={(value) => setSearchQuery(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select for services" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select for services</SelectLabel>
                            {
                              jsonData?.map((item) => (
                                <SelectItem value={item.value}>{item.label}</SelectItem>
                              ))
                            }
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      </div>
                      <Button onClick={() => handleSearch()} disabled={isSearching || !searchQuery.trim()}>
                        {isSearching ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <Search className="mr-2 h-4 w-4" />
                            Search
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center text-sm text-slate-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>Current location: {userLocation}</span>
                      <Button variant="link" size="sm" className="h-auto p-0 ml-2">
                        Change
                      </Button>
                    </div>

                    {isSearching ? (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 text-slate-300 animate-spin mb-4" />
                        <p className="text-slate-500">Searching for services near you...</p>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="space-y-4">
                        {searchResults.map((result) => (
                          <Card key={result.id}>
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                                <div className="space-y-2">
                                  <div className="flex items-center">
                                    <h3 className="font-bold text-lg">{result.name}</h3>
                                    <Badge variant="outline" className="ml-2">
                                      {result.price}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-slate-500">{result.category}</p>
                                  <div className="flex items-center">
                                    <div className="flex items-center mr-2">
                                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                      <span className="ml-1 font-medium">{result.rating}</span>
                                    </div>
                                    <span className="text-sm text-slate-500">({result.reviews} reviews)</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {result.services.map((service: string, index: number) => (
                                      <Badge key={index} variant="secondary">
                                        {service}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="mt-4 md:mt-0 md:ml-4 md:text-right space-y-2">
                                  <div className="flex items-center md:justify-end text-sm">
                                    <MapPin className="h-4 w-4 text-slate-500 mr-1" />
                                    <span>
                                      {result.distance} • {result.address}
                                    </span>
                                  </div>
                                  <div className="flex items-center md:justify-end text-sm">
                                    <Phone className="h-4 w-4 text-slate-500 mr-1" />
                                    <span>{result.phone}</span>
                                  </div>
                                  <div className="flex items-center md:justify-end text-sm">
                                    <Clock className="h-4 w-4 text-slate-500 mr-1" />
                                    <span>{result.hours}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 mt-2 md:justify-end">
                                    <Button variant="outline" size="sm">
                                      <Phone className="h-4 w-4 mr-1" />
                                      Call
                                    </Button>
                                    <Button size="sm">
                                      <Navigation className="h-4 w-4 mr-1" />
                                      Directions
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : searchQuery ? (
                      <div className="flex flex-col items-center justify-center py-12">
                        <p className="text-slate-500">No results found. Try a different search term.</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <MapPin className="h-12 w-12 text-slate-300 mb-4" />
                        <p className="text-slate-500 text-center">
                          Search for local services like "laptop repair" or "doctor near me"
                        </p>
                        <p className="text-slate-500 text-center mt-2">
                          You can also use voice search by clicking the microphone icon
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Popular Categories</CardTitle>
              <CardDescription>Frequently searched services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start" onClick={() => handleSearch("healthcare.hospital")}>
                  <MapPin className="h-4 w-4 mr-2 text-rose-500" />
                  ডাক্তার
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleSearch("rental.car")}>
                  <MapPin className="h-4 w-4 mr-2 text-amber-500" />
                  ইলেকট্রিশিয়ান
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleSearch("service.financial")}>
                  <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                  প্লাম্বার
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleSearch("emergency.phone")}>
                  <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
                  ফোন রিপেয়ার
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleSearch("catering.restaurant.asian")}>
                  <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                  রেস্টুরেন্ট
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleSearch("commercial.supermarket")}>
                  <MapPin className="h-4 w-4 mr-2 text-green-500" />
                  গ্রোসারি
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Searches</CardTitle>
              <CardDescription>Your recent local searches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Search className="h-4 w-4 text-slate-500 mr-2" />
                    <span>ল্যাপটপ রিপেয়ার</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Search className="h-4 w-4 text-slate-500 mr-2" />
                    <span>নিকটতম ডাক্তার</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Search className="h-4 w-4 text-slate-500 mr-2" />
                    <span>ইলেকট্রিশিয়ান</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Rated Near You</CardTitle>
              <CardDescription>Highly rated services in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-md bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-rose-500" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">City Dental Care</h3>
                      <div className="flex items-center ml-2">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                        <span className="text-xs ml-1">4.9</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500">0.8 km away</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-md bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">Express Tech Repairs</h3>
                      <div className="flex items-center ml-2">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                        <span className="text-xs ml-1">4.8</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500">1.2 km away</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">Master Electricians</h3>
                      <div className="flex items-center ml-2">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                        <span className="text-xs ml-1">4.7</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500">1.5 km away</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
