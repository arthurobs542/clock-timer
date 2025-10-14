"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatTime, getCurrentLocation } from "@/lib/utils";

interface ClockInOutButtonProps {
  isClockedIn: boolean;
  currentSession?: {
    startTime: Date;
    totalMinutes: number;
  };
  onClockIn: (location?: {
    latitude: number;
    longitude: number;
  }) => Promise<void>;
  onClockOut: (location?: {
    latitude: number;
    longitude: number;
  }) => Promise<void>;
  className?: string;
}

export function ClockInOutButton({
  isClockedIn,
  currentSession,
  onClockIn,
  onClockOut,
  className,
}: ClockInOutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string>("");

  const handleLocationRequest = async () => {
    try {
      setLocationError("");
      const coords = await getCurrentLocation();
      setLocation(coords);
      return coords;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao obter localização";
      setLocationError(errorMessage);
      return null;
    }
  };

  const handleClockIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      const coords = await handleLocationRequest();
      await onClockIn(coords || undefined);
    } catch (err) {
      setError("Erro ao registrar entrada. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClockOut = async () => {
    setIsLoading(true);
    setError("");

    try {
      const coords = await handleLocationRequest();
      await onClockOut(coords || undefined);
    } catch (err) {
      setError("Erro ao registrar saída. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const getSessionDuration = () => {
    if (!currentSession) return "0h 0min";

    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - currentSession.startTime.getTime()) / (1000 * 60)
    );
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    if (hours === 0) return `${minutes}min`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}min`;
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Controle de Ponto
        </CardTitle>
        <CardDescription>
          {isClockedIn ? "Você está trabalhando" : "Você não está trabalhando"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status atual */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            {isClockedIn ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            <span className="font-medium">
              {isClockedIn ? "Trabalhando" : "Fora do trabalho"}
            </span>
          </div>
          <Badge variant={isClockedIn ? "default" : "secondary"}>
            {isClockedIn ? "Ativo" : "Inativo"}
          </Badge>
        </div>

        {/* Sessão atual */}
        {isClockedIn && currentSession && (
          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Entrada: {formatTime(currentSession.startTime)}
                </p>
                <p className="text-lg font-semibold text-green-800 dark:text-green-200">
                  {getSessionDuration()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-green-600 dark:text-green-400">
                  Tempo trabalhado
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Localização */}
        {location && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-700 dark:text-blue-300">
              Localização registrada
            </span>
          </div>
        )}

        {/* Erros */}
        {(error || locationError) && (
          <Alert variant="destructive">
            <AlertDescription>{error || locationError}</AlertDescription>
          </Alert>
        )}

        {/* Botão principal */}
        <Button
          onClick={isClockedIn ? handleClockOut : handleClockIn}
          disabled={isLoading}
          className={cn(
            "w-full h-16 text-lg font-semibold",
            isClockedIn
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          )}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              {isClockedIn ? "Registrando saída..." : "Registrando entrada..."}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {isClockedIn ? (
                <>
                  <XCircle className="h-5 w-5" />
                  Registrar Saída
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Registrar Entrada
                </>
              )}
            </div>
          )}
        </Button>

        {/* Informações adicionais */}
        <div className="text-center text-sm text-muted-foreground">
          {isClockedIn ? (
            <p>Clique para registrar sua saída</p>
          ) : (
            <p>Clique para registrar sua entrada</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
