import { SiteHeader } from "@/components/ui/dashboard/site-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { typeClient } from "../profile";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { supabase } from "@/lib/supabaseClient";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toasts } from "@/components/ui/toast";
import { useNavigate } from "react-router";
import { LocationPicker } from "@/components/ui/location-picker";

export const CreatePost = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState("information_basic");
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [dataOperationType, setDataOperationType] = useState([]);
  const [dataPropertyType, setDataPropertyType] = useState([]);
  const [informationPost, setInformationPost] = useState({
    user_id: profile?.id,
    user_type: profile?.user_type_id,
    title: null,
    description: null,
    price: null,
    area_m2: null,
    bedrooms: null,
    bathrooms: null,
    city: null,
    department: null,
    address: null,
    contact_phone: null,
    contact_email: profile[typeClient(profile?.user_type_id)]?.email,
    property_type_id: 2,
    operation_type_id: 2,
    latitude: null,
    longitude: null,
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []) as File[];

    if (files.length > 0) {
      // Limit to 10 images
      if (files.length > 10) {
        toasts("⚠️ Máximo 10 imágenes permitidas");
        setImageFiles(files.slice(0, 10));
      } else {
        setImageFiles(files);
      }
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };
  const getNeedInformatioCreatePost = async () => {
    setLoading(true);
    try {
      const { data: operationType } = await supabase
        .from("operation_type")
        .select("*");
      setDataOperationType(operationType);
      const { data: propertyType } = await supabase
        .from("property_type")
        .select("*");
      setDataPropertyType(propertyType);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const creatPost = async () => {
    setLoading(true);
    try {
      if (imageFiles.length === 0) {
        setLoading(false);
        return toasts("❌ Atencion, Selecciona al menos una imagen");
      }

      // Upload all images
      const uploadPromises = imageFiles.map(async (file) => {
        const fileName = `${Date.now()}_${Math.random()}_${file.name}`;
        const { error } = await supabase.storage
          .from("Post")
          .upload(fileName, file);

        if (error) throw error;

        const { data: publicUrlData } = supabase.storage
          .from("Post")
          .getPublicUrl(fileName);

        return publicUrlData.publicUrl;
      });

      const imageUrls = await Promise.all(uploadPromises);

      // Check if essential fields are filled (latitude and longitude are optional but recommended)
      const requiredFields = { ...informationPost };
      delete requiredFields.latitude;
      delete requiredFields.longitude;

      if (!Object.values(requiredFields).every(Boolean)) {
        setLoading(false);
        return toasts("❌ Atencion, Llenar todos los campos");
      }

      await supabase
        .from("properties")
        .insert([{ ...informationPost, images: imageUrls }])
        .select();

      toasts("✅ Propiedad creada exitosamente");
      setLoading(false);
      navigate("/post");
    } catch (error) {
      console.error(error);
      toasts("❌ Error al crear la propiedad");
      setLoading(false);
    }
  };

  useEffect(() => {
    getNeedInformatioCreatePost();
  }, []);

  return (
    <>
      {loading ? <LoadingScreen /> : null}
      <SiteHeader title="Crear publicacion" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 w-full mx-auto">
            <div className="flex w-full md:max-w-xl max-w-sm flex-col gap-6 mx-auto">
              <Tabs defaultValue={tabs} value={tabs} onValueChange={setTabs}>
                <TabsList>
                  <TabsTrigger value="information_basic">
                    Informacion basica
                  </TabsTrigger>
                  <TabsTrigger value="information_import">
                    Informacion primordial
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="information_basic">
                  <Card>
                    <CardHeader>
                      <CardTitle>Crear publicacion</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-name">Titulo</Label>
                        <Input
                          id="tabs-demo-name"
                          value={informationPost.title}
                          onChange={(e) =>
                            setInformationPost((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-username">Descripcion</Label>
                        <Input
                          id="tabs-demo-username"
                          value={informationPost.description}
                          onChange={(e) =>
                            setInformationPost((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-username">Ciudad</Label>
                        <Input
                          id="tabs-demo-username"
                          value={informationPost.city}
                          onChange={(e) =>
                            setInformationPost((prev) => ({
                              ...prev,
                              city: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-username">Departamento</Label>
                        <Input
                          id="tabs-demo-username"
                          value={informationPost.department}
                          onChange={(e) =>
                            setInformationPost((prev) => ({
                              ...prev,
                              department: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-username">Direccion</Label>
                        <Input
                          id="tabs-demo-username"
                          value={informationPost.address}
                          onChange={(e) =>
                            setInformationPost((prev) => ({
                              ...prev,
                              address: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-username">Telefono</Label>
                        <Input
                          id="tabs-demo-username"
                          value={informationPost.contact_phone}
                          onChange={(e) =>
                            setInformationPost((prev) => ({
                              ...prev,
                              contact_phone: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-username">Correo</Label>
                        <Input
                          id="tabs-demo-username"
                          defaultValue={
                            profile
                              ? profile[typeClient(profile?.user_type_id)]
                                ?.email
                              : ""
                          }
                          value={informationPost.contact_email}
                          onChange={(e) =>
                            setInformationPost((prev) => ({
                              ...prev,
                              contact_email: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => setTabs("information_import")}>
                        Siguente
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="information_import">
                  <Card>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-name">Baños</Label>
                        <Input
                          id="tabs-demo-name"
                          value={informationPost.bathrooms}
                          onChange={(e) =>
                            setInformationPost((prev) => ({
                              ...prev,
                              bathrooms: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-name">Dormitorios</Label>
                        <Input
                          id="tabs-demo-name"
                          value={informationPost.bedrooms}
                          onChange={(e) =>
                            setInformationPost((prev) => ({
                              ...prev,
                              bedrooms: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-name">Area m2</Label>
                        <Input
                          id="tabs-demo-name"
                          value={informationPost.area_m2}
                          onChange={(e) =>
                            setInformationPost((prev) => ({
                              ...prev,
                              area_m2: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-name">Precio</Label>
                        <Input
                          id="tabs-demo-name"
                          value={informationPost.price}
                          onChange={(e) =>
                            setInformationPost((prev) => ({
                              ...prev,
                              price: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-current">
                          Tipo de inmueble
                        </Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona el tipo de inmueble" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Tipo de inmueble</SelectLabel>
                              {dataPropertyType.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-current">
                          Tipo de contracto
                        </Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona el tipo de contracto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Tipo de contracto</SelectLabel>
                              {dataOperationType.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>

                    <div className="grid mx-6 gap-3 mb-6">
                      <Label>Ubicación del Inmueble</Label>
                      <LocationPicker
                        onLocationSelect={(lat, lng) =>
                          setInformationPost(prev => ({ ...prev, latitude: lat, longitude: lng }))
                        }
                      />
                      <p className="text-xs text-muted-foreground">Haz clic en el mapa para seleccionar la ubicación exacta.</p>
                    </div>

                    <div className="grid mx-6 gap-3 mb-6">
                      <Label htmlFor="picture">Imágenes del inmueble (máximo 10)</Label>
                      <Input
                        id="picture"
                        onChange={handleFileChange}
                        type="file"
                        multiple
                        accept="image/*"
                      />
                      <p className="text-xs text-muted-foreground">
                        Selecciona hasta 10 imágenes para mostrar tu propiedad.
                      </p>

                      {/* Image Preview Grid */}
                      {imageFiles.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                          {imageFiles.map((file, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-md border-2 border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                {index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <CardFooter>
                      <Button
                        disabled={loading}
                        loading={loading}
                        onClick={() => creatPost()}
                      >
                        Crear publicacion
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
