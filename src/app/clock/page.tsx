"use client";

import { useState, useEffect } from "react";
import { Layout, Container, PageHeader } from "@/components/layout";
import { ClockInOutButton, ClockHistory, ClockStats } from "@/components/clock";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Clock, RefreshCw, AlertCircle } from "lucide-react";
import { ClockRecord, WorkSession } from "@/types";
import { formatTime, calculateWorkDuration } from "@/lib/utils";

// Mock data para demonstração
const mockUser = {
  name: "João Silva",
  email: "joao.silva@empresa.com",
  role: "employee" as const,
};

const mockClockRecords: ClockRecord[] = [
  {
    id: "1",
    employeeId: "emp1",
    type: "clock_in",
    timestamp: new Date(2025, 0, 27, 8, 0),
    location: { latitude: -23.5505, longitude: -46.6333 },
    createdAt: new Date(2025, 0, 27, 8, 0),
  },
  {
    id: "2",
    employeeId: "emp1",
    type: "clock_out",
    timestamp: new Date(2025, 0, 27, 17, 30),
    location: { latitude: -23.5505, longitude: -46.6333 },
    createdAt: new Date(2025, 0, 27, 17, 30),
  },
  {
    id: "3",
    employeeId: "emp1",
    type: "clock_in",
    timestamp: new Date(2025, 0, 26, 8, 15),
    location: { latitude: -23.5505, longitude: -46.6333 },
    createdAt: new Date(2025, 0, 26, 8, 15),
  },
  {
    id: "4",
    employeeId: "emp1",
    type: "clock_out",
    timestamp: new Date(2025, 0, 26, 17, 45),
    location: { latitude: -23.5505, longitude: -46.6333 },
    createdAt: new Date(2025, 0, 26, 17, 45),
  },
];

export default function ClockPage() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [currentSession, setCurrentSession] = useState<WorkSession | null>(
    null
  );
  const [clockRecords, setClockRecords] =
    useState<ClockRecord[]>(mockClockRecords);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Simular estado inicial baseado nos registros
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRecords = clockRecords.filter((record) => {
      const recordDate = new Date(record.timestamp);
      recordDate.setHours(0, 0, 0, 0);
      return recordDate.getTime() === today.getTime();
    });

    const lastRecord = todayRecords.sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    )[0];

    if (lastRecord && lastRecord.type === "clock_in") {
      setIsClockedIn(true);
      setCurrentSession({
        id: "current",
        employeeId: "emp1",
        clockInId: lastRecord.id,
        startTime: lastRecord.timestamp,
        breakMinutes: 0,
        status: "active",
        createdAt: lastRecord.timestamp,
        updatedAt: lastRecord.timestamp,
      });
    }
  }, [clockRecords]);

  const handleClockIn = async (location?: {
    latitude: number;
    longitude: number;
  }) => {
    setIsLoading(true);
    setError("");

    try {
      // Simular chamada da API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const now = new Date();
      const newRecord: ClockRecord = {
        id: `clock_${Date.now()}`,
        employeeId: "emp1",
        type: "clock_in",
        timestamp: now,
        location,
        createdAt: now,
      };

      const newSession: WorkSession = {
        id: `session_${Date.now()}`,
        employeeId: "emp1",
        clockInId: newRecord.id,
        startTime: now,
        breakMinutes: 0,
        status: "active",
        createdAt: now,
        updatedAt: now,
      };

      setClockRecords((prev) => [newRecord, ...prev]);
      setCurrentSession(newSession);
      setIsClockedIn(true);
    } catch (err) {
      setError("Erro ao registrar entrada. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClockOut = async (location?: {
    latitude: number;
    longitude: number;
  }) => {
    setIsLoading(true);
    setError("");

    try {
      // Simular chamada da API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const now = new Date();
      const newRecord: ClockRecord = {
        id: `clock_${Date.now()}`,
        employeeId: "emp1",
        type: "clock_out",
        timestamp: now,
        location,
        createdAt: now,
      };

      if (currentSession) {
        const totalMinutes = calculateWorkDuration(
          currentSession.startTime,
          now,
          currentSession.breakMinutes
        );

        const updatedSession: WorkSession = {
          ...currentSession,
          clockOutId: newRecord.id,
          endTime: now,
          totalMinutes,
          status: "completed",
          updatedAt: now,
        };

        setCurrentSession(null);
      }

      setClockRecords((prev) => [newRecord, ...prev]);
      setIsClockedIn(false);
    } catch (err) {
      setError("Erro ao registrar saída. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    // Simular refresh dos dados
    console.log("Refreshing data...");
  };

  // Calcular estatísticas
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayRecords = clockRecords.filter((record) => {
    const recordDate = new Date(record.timestamp);
    recordDate.setHours(0, 0, 0, 0);
    return recordDate.getTime() === today.getTime();
  });

  const todayStats = {
    totalMinutes: currentSession
      ? calculateWorkDuration(
          currentSession.startTime,
          new Date(),
          currentSession.breakMinutes
        )
      : 0,
    breakMinutes: currentSession?.breakMinutes || 0,
    isClockedIn,
    clockInTime: currentSession?.startTime,
  };

  const weekStats = {
    totalMinutes: 2550, // Mock data
    averageHours: 8.5,
    workingDays: 5,
  };

  const monthStats = {
    totalMinutes: 10200, // Mock data
    averageHours: 8.0,
    workingDays: 20,
  };

  return (
    <Layout user={mockUser}>
      <PageHeader
        title="Controle de Ponto"
        description="Registre sua entrada e saída, acompanhe suas horas trabalhadas"
      />

      <Container className="py-8">
        <div className="space-y-8">
          {/* Alertas */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Estatísticas */}
          <ClockStats
            todayStats={todayStats}
            weekStats={weekStats}
            monthStats={monthStats}
          />

          {/* Controle de Ponto */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ClockInOutButton
              isClockedIn={isClockedIn}
              currentSession={currentSession}
              onClockIn={handleClockIn}
              onClockOut={handleClockOut}
            />

            {/* Informações adicionais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Informações
                </CardTitle>
                <CardDescription>
                  Dicas e informações sobre o controle de ponto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Horário de Trabalho</h4>
                  <p className="text-sm text-muted-foreground">
                    Segunda a Sexta: 08:00 - 17:00
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pausa para almoço: 12:00 - 13:00
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Localização</h4>
                  <p className="text-sm text-muted-foreground">
                    Sua localização será registrada automaticamente para maior
                    segurança.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Lembrete</h4>
                  <p className="text-sm text-muted-foreground">
                    Lembre-se de registrar sua entrada e saída todos os dias.
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={refreshData}
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Atualizar Dados
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Histórico */}
          <ClockHistory records={clockRecords} />
        </div>
      </Container>
    </Layout>
  );
}
