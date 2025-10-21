import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiteHeader } from "@/components/ui/dashboard/site-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { BadgeCheckIcon } from "lucide-react";

export const typeClient = (number: number) => {
  switch (number) {
    case 1:
      return "user_profiles";

    case 2:
      return "owner_profiles";

    case 3:
      return "agency_profiles";

    default:
      return "user_profiles";
  }
};

export const Profile = () => {
  const { profile } = useAuth();

  return (
    <>
      <SiteHeader title="Cuenta" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 w-full mx-auto">
            <div className="flex w-full max-w-sm flex-col gap-6 mx-auto">
              <Tabs defaultValue="account">
                <TabsList>
                  <TabsTrigger value="account">
                    {profile?.user_type?.name}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mi cuenta</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-name">Correo</Label>
                        <Input
                          id="tabs-demo-name"
                          defaultValue={
                            profile
                              ? profile[typeClient(profile?.user_type_id)]
                                  ?.email
                              : ""
                          }
                          disabled
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-username">Nombre</Label>
                        <Input
                          id="tabs-demo-username"
                          defaultValue={
                            profile
                              ? profile[typeClient(profile?.user_type_id)]
                                  ?.full_name
                              : ""
                          }
                          disabled
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Badge
                        variant="secondary"
                        className={`bg-[#7168D3] text-white mt-1 rounded-3xl`}
                      >
                        <BadgeCheckIcon />
                        {"Activa"}
                      </Badge>
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
