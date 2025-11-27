import { useAuth } from "@/context/AuthContext";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { SiteHeader } from "@/components/ui/dashboard/site-header";
import { SectionCards } from "@/components/ui/dashboard/section-cards";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { IconBell } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useNavigate } from "react-router";
import { toasts } from "@/components/ui/toast";
import { Filters } from "@/components/ui/dashboard/filters";
import { useGeolocated } from "react-geolocated";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { loading, profile } = useAuth();
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [post, setPost] = useState([]);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  const userLocation = coords ? { lat: coords.latitude, lng: coords.longitude } : null;

  const [filters, setFilters] = useState({
    propertyType: "all",
    operationType: "all",
    minPrice: "",
    maxPrice: "",
    city: "",
    nearMe: false,
  });
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [operationTypes, setOperationTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const { data: pt } = await supabase.from("property_type").select("*");
      const { data: ot } = await supabase.from("operation_type").select("*");
      if (pt) setPropertyTypes(pt);
      if (ot) setOperationTypes(ot);
    };
    fetchTypes();
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const getPosts = async () => {
    setLoadingPost(true);
    try {
      let query = supabase.from("properties").select(`*,
          user_type (*),
          property_type_id (*),
          operation_type_id (*)`);

      if (filters.propertyType !== "all") {
        query = query.eq("property_type_id", filters.propertyType);
      }
      if (filters.operationType !== "all") {
        query = query.eq("operation_type_id", filters.operationType);
      }
      if (filters.minPrice && filters.minPrice !== "") {
        query = query.gte("price", Number(filters.minPrice));
      }
      if (filters.maxPrice && filters.maxPrice !== "") {
        query = query.lte("price", Number(filters.maxPrice));
      }
      if (filters.city) {
        const text = `%${filters.city}%`;
        query = query.or(
          `city.ilike.${text},neighborhood.ilike.${text},address.ilike.${text},title.ilike.${text}`
        );
      }

      const { data: postData, error } = await query;

      if (error) throw error;

      let processedPosts = postData.map(p => {
        let distance = null;
        if (userLocation && p.latitude && p.longitude) {
          distance = calculateDistance(userLocation.lat, userLocation.lng, p.latitude, p.longitude);
        }
        return { ...p, distance };
      });

      if (filters.nearMe && userLocation) {
        processedPosts = processedPosts.filter(p => p.distance !== null && p.distance <= 50); // Filter within 50km (large perimeter)
        processedPosts.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      }

      setPost(processedPosts);
      setLoadingPost(false);
    } catch (error) {
      console.error(error);
      setLoadingPost(false);
    }
  };


  // Re-fetch when location changes if nearMe is active, or just to update distances
  useEffect(() => {
    if (userLocation) {
      getPosts();
    }
  }, [userLocation?.lat, userLocation?.lng]);

  // Trigger search when 'Near Me' filter changes
  useEffect(() => {
    if (filters.nearMe) {
      if (!isGeolocationAvailable) {
        toasts("Tu navegador no soporta geolocalización.");
        setFilters(prev => ({ ...prev, nearMe: false }));
      } else if (!isGeolocationEnabled) {
        toasts("Por favor habilita la ubicación para usar esta función.");
        setFilters(prev => ({ ...prev, nearMe: false }));
      } else if (!userLocation) {
        // Waiting for location...
        // The userLocation useEffect will trigger getPosts when it arrives
      } else {
        getPosts();
      }
    } else {
      // If turned off, re-fetch to show all
      getPosts();
    }
  }, [filters.nearMe, isGeolocationAvailable, isGeolocationEnabled]);


  const addFavorites = async (property) => {
    try {
      setLoadingFavorites(true);
      const { error } = await supabase
        .from("favorites")
        .insert([{ user_id: profile?.id, property_id: property?.id }]);
      setLoadingFavorites(false);
      if (error?.code === "23505") {
        return toasts("Ya esta agregada a favoritos");
      }
      toasts("Agregado con exito a favoritos");
      navigate("/favorites");
    } catch (error) {
      setLoadingFavorites(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (loading || loadingPost) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SiteHeader title="Descubrir" />
      <div className="flex flex-1 flex-col bg-gray-50/50 min-h-screen">
        <div className="@container/main flex flex-1 flex-col gap-2 p-4 lg:p-6">

          <Filters
            filters={filters}
            setFilters={setFilters}
            propertyTypes={propertyTypes}
            operationTypes={operationTypes}
            onSearch={getPosts}
          />

          <div className="flex flex-col gap-4">
            {post.length === 0 ? (
              <Empty className="from-muted/50 to-background h-[400px] bg-gradient-to-b from-30% rounded-xl border-dashed border-2">
                <EmptyHeader>
                  <EmptyMedia variant="icon" className="bg-[#7168D3]">
                    <IconBell color="white" />
                  </EmptyMedia>
                  <EmptyTitle>No hay publicaciones encontradas</EmptyTitle>
                  <EmptyDescription>
                    Intenta ajustar los filtros para encontrar lo que buscas.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button onClick={() => {
                    setFilters({
                      propertyType: "all",
                      operationType: "all",
                      minPrice: "",
                      maxPrice: "",
                      city: "",
                      nearMe: false,
                    });
                    getPosts();
                  }}>Limpiar Filtros</Button>
                </EmptyContent>
              </Empty>
            ) : (
              <SectionCards
                post={post}
                favorites={{
                  actionFavorite: addFavorites,
                  loading: loadingFavorites,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
