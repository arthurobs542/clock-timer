"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Calendar,
  TrendingUp,
  User,
  Target,
  AlertCircle,
} from "lucide-react";
import { formatTime, minutesToHours } from "@/lib/utils";

interface ClockStatsProps {
  todayStats: {
    totalMinutes: number;
    breakMinutes: number;
    isClockedIn: boolean;
    clockInTime?: Date;
  };
  weekStats: {
    totalMinutes: number;
    averageHours: number;
    workingDays: number;
  };
  monthStats: {
    totalMinutes: number;
    averageHours: number;
    workingDays: number;
  };
  className?: string;
}

export function ClockStats({
  todayStats,
  weekStats,
  monthStats,
  className,
}: ClockStatsProps) {
  const getStatusColor = (isClockedIn: boolean) => {
    return isClockedIn ? "text-green-600" : "text-red-600";
  };

  const getStatusText = (isClockedIn: boolean) => {
    return isClockedIn ? "Trabalhando" : "Fora do trabalho";
  };

  const getStatusIcon = (isClockedIn: boolean) => {
    return isClockedIn ? (
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
    ) : (
      <div className="w-2 h-2 bg-red-500 rounded-full" />
    );
  };

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}
    >
      {/* Status Atual */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Status Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {getStatusIcon(todayStats.isClockedIn)}
              <span
                className={`text-sm font-medium ${getStatusColor(
                  todayStats.isClockedIn
                )}`}
              >
                {getStatusText(todayStats.isClockedIn)}
              </span>
            </div>
            {todayStats.clockInTime && (
              <p className="text-xs text-muted-foreground">
                Entrada: {formatTime(todayStats.clockInTime)}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Hoje */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="text-2xl font-bold">
              {minutesToHours(todayStats.totalMinutes)}
            </div>
            <p className="text-xs text-muted-foreground">
              {todayStats.breakMinutes > 0 && (
                <span>Pausas: {minutesToHours(todayStats.breakMinutes)}</span>
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Esta Semana */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Esta Semana
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="text-2xl font-bold">
              {minutesToHours(weekStats.totalMinutes)}
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">
                Média: {weekStats.averageHours.toFixed(1)}h/dia
              </p>
              <Badge variant="secondary" className="text-xs">
                {weekStats.workingDays} dias
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Este Mês */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <User className="h-4 w-4" />
            Este Mês
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="text-2xl font-bold">
              {minutesToHours(monthStats.totalMinutes)}
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">
                Média: {monthStats.averageHours.toFixed(1)}h/dia
              </p>
              <Badge variant="secondary" className="text-xs">
                {monthStats.workingDays} dias
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
