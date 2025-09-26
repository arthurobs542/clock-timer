"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Calendar, Clock3 } from "lucide-react";
import { formatTime, formatDate, formatDateTime } from "@/lib/utils";
import { ClockRecord } from "@/types";

interface ClockHistoryProps {
  records: ClockRecord[];
  className?: string;
}

export function ClockHistory({ records, className }: ClockHistoryProps) {
  const groupedRecords = records.reduce((groups, record) => {
    const date = record.timestamp.toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(record);
    return groups;
  }, {} as Record<string, ClockRecord[]>);

  const getRecordIcon = (type: "clock_in" | "clock_out") => {
    return type === "clock_in" ? (
      <div className="w-2 h-2 bg-green-500 rounded-full" />
    ) : (
      <div className="w-2 h-2 bg-red-500 rounded-full" />
    );
  };

  const getRecordLabel = (type: "clock_in" | "clock_out") => {
    return type === "clock_in" ? "Entrada" : "Saída";
  };

  const getRecordVariant = (type: "clock_in" | "clock_out") => {
    return type === "clock_in" ? "default" : "destructive";
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Histórico de Ponto
        </CardTitle>
        <CardDescription>Seus registros de entrada e saída</CardDescription>
      </CardHeader>

      <CardContent>
        {Object.keys(groupedRecords).length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum registro encontrado</p>
            <p className="text-sm">Seus registros de ponto aparecerão aqui</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedRecords)
              .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
              .map(([date, dayRecords]) => (
                <div key={date} className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(new Date(date))}
                  </div>

                  <div className="space-y-2">
                    {dayRecords
                      .sort(
                        (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
                      )
                      .map((record, index) => (
                        <div
                          key={record.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {getRecordIcon(record.type)}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {getRecordLabel(record.type)}
                                </span>
                                <Badge variant={getRecordVariant(record.type)}>
                                  {formatTime(record.timestamp)}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {formatDateTime(record.timestamp)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {record.location && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>GPS</span>
                              </div>
                            )}
                            {record.notes && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs"
                                title={record.notes}
                              >
                                Nota
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
