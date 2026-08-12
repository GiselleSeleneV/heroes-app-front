import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomLoading } from "@/components/custom/CustomLoading";
import { getHeroAction } from "@/heroes/actions/get-hero";
import { useQuery } from "@tanstack/react-query";
import { Shield, Zap, Brain, Gauge, Users, Star, Award } from "lucide-react";
import { Navigate, useParams } from "react-router";

export const HeroPage = () => {
  const { idSlug = "" } = useParams();

  const { data: superheroData, isError } = useQuery({
    queryKey: ["heroes", idSlug],
    queryFn: () => getHeroAction(idSlug),
    retry: false,
  });

  if (isError) {
    return <Navigate to="/" />;
  }

  if (!superheroData) {
    return <CustomLoading fullPage label="Cargando héroe" />;
  }

  const totalPower =
    superheroData.strength +
    superheroData.intelligence +
    superheroData.speed +
    superheroData.durability;
  const averagePower = Math.round((totalPower / 4) * 10);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "activo":
        return "bg-green-500";
      case "inactivo":
        return "bg-gray-500";
      case "retirado":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "héroe":
        return "bg-blue-500";
      case "villano":
        return "bg-red-500";
      case "antihéroe":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <img
                src={superheroData.image || "/placeholder.svg"}
                alt={superheroData.alias}
                width={200}
                height={200}
                className="rounded-full border-4 border-white/20 shadow-2xl"
              />
              <div className="absolute -top-2 -right-2">
                <div className="bg-yellow-400 text-black rounded-full p-2">
                  <Star className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                <Badge
                  className={`${getCategoryColor(
                    superheroData.category,
                  )} text-white`}
                >
                  {superheroData.category}
                </Badge>
                <Badge
                  className={`${getStatusColor(
                    superheroData.status,
                  )} text-white`}
                >
                  {superheroData.status}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  {superheroData.universe}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-2 flex flex-wrap justify-center md:justify-start">
                {superheroData.alias.split("").map((char, index) => (
                  <span
                    key={`${superheroData.alias}-${index}`}
                    className="inline-block title-drop-letter text-white"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>
              <p className="text-xl text-blue-200 mb-4">{superheroData.name}</p>
              <p className="text-lg text-gray-300 max-w-2xl">
                {superheroData.description}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-400">
                  {averagePower}%
                </div>
                <div className="text-sm text-gray-300">Nivel de Poder</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(averagePower / 20)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8 h-auto sm:h-9 gap-1 sm:gap-0 bg-card border border-slate-200 text-[#0F172A] p-1">
            <TabsTrigger
              value="stats"
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 py-2.5 sm:py-1 text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap text-center text-[#0F172A]/70 data-[state=active]:bg-[#0F172A] data-[state=active]:text-white"
            >
              <Gauge className="w-4 h-4 shrink-0" />
              <span>Estadísticas</span>
            </TabsTrigger>
            <TabsTrigger
              value="powers"
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 py-2.5 sm:py-1 text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap text-center text-[#0F172A]/70 data-[state=active]:bg-[#0F172A] data-[state=active]:text-white"
            >
              <Zap className="w-4 h-4 shrink-0" />
              <span>Poderes</span>
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 py-2.5 sm:py-1 text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap text-center text-[#0F172A]/70 data-[state=active]:bg-[#0F172A] data-[state=active]:text-white"
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>Equipo</span>
            </TabsTrigger>
            <TabsTrigger
              value="info"
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 py-2.5 sm:py-1 text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap text-center text-[#0F172A]/70 data-[state=active]:bg-[#0F172A] data-[state=active]:text-white"
            >
              <Award className="w-4 h-4 shrink-0" />
              <span>Información</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Strength */}
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <Zap className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-[#0F172A]">
                    Fuerza
                  </h3>
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {superheroData.strength}
                  </div>
                  <Progress
                    value={superheroData.strength * 10}
                    className="h-2"
                  />
                </CardContent>
              </Card>

              {/* Intelligence */}
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Brain className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-[#0F172A]">
                    Inteligencia
                  </h3>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {superheroData.intelligence}
                  </div>
                  <Progress
                    value={superheroData.intelligence * 10}
                    className="h-2"
                  />
                </CardContent>
              </Card>

              {/* Speed */}
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Gauge className="w-8 h-8 text-yellow-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-[#0F172A]">
                    Velocidad
                  </h3>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {superheroData.speed}
                  </div>
                  <Progress value={superheroData.speed * 10} className="h-2" />
                </CardContent>
              </Card>

              {/* Durability */}
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Shield className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-[#0F172A]">
                    Resistencia
                  </h3>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {superheroData.durability}
                  </div>
                  <Progress
                    value={superheroData.durability * 10}
                    className="h-2"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Power Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#0F172A]">
                  Comparación de Habilidades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium text-[#0F172A]">
                      Fuerza
                    </div>
                    <div className="flex-1">
                      <Progress
                        value={superheroData.strength * 10}
                        className="h-4"
                      />
                    </div>
                    <div className="w-12 text-right font-bold">
                      {superheroData.strength}/10
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium text-[#0F172A]">
                      Inteligencia
                    </div>
                    <div className="flex-1">
                      <Progress
                        value={superheroData.intelligence * 10}
                        className="h-4"
                      />
                    </div>
                    <div className="w-12 text-right font-bold">
                      {superheroData.intelligence}/10
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium text-[#0F172A]">
                      Velocidad
                    </div>
                    <div className="flex-1">
                      <Progress
                        value={superheroData.speed * 10}
                        className="h-4"
                      />
                    </div>
                    <div className="w-12 text-right font-bold">
                      {superheroData.speed}/10
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium text-[#0F172A]">
                      Resistencia
                    </div>
                    <div className="flex-1">
                      <Progress
                        value={superheroData.durability * 10}
                        className="h-4"
                      />
                    </div>
                    <div className="w-12 text-right font-bold">
                      {superheroData.durability}/10
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="powers">
            <Card className="text-[#0F172A]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#0F172A]">
                  <Zap className="w-6 h-6 text-[#f97316]" />
                  Superpoderes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {superheroData.powers.map((power, index) => {
                    const accents = [
                      {
                        bg: "from-orange-50 to-orange-100/80",
                        border: "border-orange-200",
                        icon: "bg-[#f97316]",
                      },
                      {
                        bg: "from-blue-50 to-blue-100/80",
                        border: "border-blue-200",
                        icon: "bg-[#3b82f6]",
                      },
                      {
                        bg: "from-green-50 to-green-100/80",
                        border: "border-green-200",
                        icon: "bg-[#22c55e]",
                      },
                      {
                        bg: "from-purple-50 to-purple-100/80",
                        border: "border-purple-200",
                        icon: "bg-[#a855f7]",
                      },
                    ];
                    const accent = accents[index % accents.length];

                    return (
                      <div
                        key={index}
                        className={`bg-gradient-to-r ${accent.bg} p-4 rounded-xl border ${accent.border} shadow-sm`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`${accent.icon} p-2 rounded-full shrink-0`}
                          >
                            <Zap className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-[#0F172A]">
                            {power}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#0F172A]">
                  <Users className="w-6 h-6 text-green-500" />
                  Afiliación de Equipo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="bg-green-100 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">
                    {superheroData.team}
                  </h3>
                  <p className="text-[#0F172A]/70">
                    Miembro activo del equipo de superhéroes más poderoso
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#0F172A]">
                    Detalles Personales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-[#0F172A]/70">Nombre Real:</span>
                    <span className="font-semibold text-[#0F172A]">
                      {superheroData.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-[#0F172A]/70">Alias:</span>
                    <span className="font-semibold text-[#0F172A]">
                      {superheroData.alias}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-[#0F172A]/70">Categoría:</span>
                    <Badge
                      className={`${getCategoryColor(
                        superheroData.category,
                      )} text-white`}
                    >
                      {superheroData.category}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#0F172A]/70">Estado:</span>
                    <Badge
                      className={`${getStatusColor(
                        superheroData.status,
                      )} text-white`}
                    >
                      {superheroData.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[#0F172A]">
                    Información del Universo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-[#0F172A]/70">Universo:</span>
                    <span className="font-semibold text-[#0F172A]">
                      {superheroData.universe}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-[#0F172A]/70">
                      Primera Aparición:
                    </span>
                    <span className="font-semibold text-[#0F172A]">
                      {superheroData.firstAppearance}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#0F172A]/70">Años Activo:</span>
                    <span className="font-semibold text-[#0F172A]">
                      {new Date().getFullYear() -
                        Number.parseInt(superheroData.firstAppearance)}{" "}
                      años
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
