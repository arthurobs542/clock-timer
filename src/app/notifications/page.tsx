"use client";

import { useState, useEffect } from "react";
import { Layout, Container, PageHeader } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Settings,
  Filter,
  RefreshCw,
  Clock,
  AlertTriangle,
  Info,
  CheckCircle,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<string, number>;
  byPriority: Record<string, number>;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [stats, setStats] = useState<NotificationStats>({
    total: 0,
    unread: 0,
    byType: {},
    byPriority: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchNotifications();
    fetchStats();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        "http:
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.data.notifications);
      }
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
      toast({
        title: "Erro",
        description: "Falha ao carregar notificações",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        "http:
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        `http:
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notificationId
              ? { ...n, isRead: true, readAt: new Date().toISOString() }
              : n
          )
        );
        setStats((prev) => ({ ...prev, unread: Math.max(0, prev.unread - 1) }));
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao marcar notificação como lida",
        variant: "destructive",
      });
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      setIsSaving(true);
      const response = await fetch(
        "http:
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((n) => ({
            ...n,
            isRead: true,
            readAt: new Date().toISOString(),
          }))
        );
        setStats((prev) => ({ ...prev, unread: 0 }));
        toast({
          title: "Sucesso",
          description: "Todas as notificações foram marcadas como lidas",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao marcar notificações como lidas",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        `http:
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const notification = notifications.find((n) => n.id === notificationId);
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
        if (notification && !notification.isRead) {
          setStats((prev) => ({
            ...prev,
            unread: Math.max(0, prev.unread - 1),
            total: Math.max(0, prev.total - 1),
          }));
        } else {
          setStats((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
        }
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao deletar notificação",
        variant: "destructive",
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return "bg-red-100 text-red-800 border-red-200";
      case "HIGH":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "LOW":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "CLOCK_REMINDER":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "CLOCK_IN":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "CLOCK_OUT":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "REPORT_GENERATED":
        return <Bell className="h-4 w-4 text-purple-500" />;
      case "SECURITY_ALERT":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "SYSTEM_UPDATE":
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "CLOCK_REMINDER":
        return "Lembrete de Ponto";
      case "CLOCK_IN":
        return "Entrada";
      case "CLOCK_OUT":
        return "Saída";
      case "REPORT_GENERATED":
        return "Relatório";
      case "SECURITY_ALERT":
        return "Alerta de Segurança";
      case "SYSTEM_UPDATE":
        return "Atualização do Sistema";
      default:
        return "Geral";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Agora mesmo";
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`;
    } else {
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    switch (activeTab) {
      case "unread":
        return !notification.isRead;
      case "read":
        return notification.isRead;
      default:
        return true;
    }
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5 py-8">
        <Container>
          <PageHeader
            title="Notificações"
            description="Gerencie suas notificações e alertas do sistema"
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Resumo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total</span>
                    <Badge variant="secondary">{stats.total}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Não lidas</span>
                    <Badge variant="destructive">{stats.unread}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lidas</span>
                    <Badge variant="outline">
                      {stats.total - stats.unread}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Por Prioridade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(stats.byPriority).map(([priority, count]) => (
                    <div
                      key={priority}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm capitalize">
                        {priority.toLowerCase()}
                      </span>
                      <Badge className={getPriorityColor(priority)}>
                        {count}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Notificações</CardTitle>
                    <div className="flex items-center space-x-2">
                      {stats.unread > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={markAllAsRead}
                          disabled={isSaving}
                        >
                          <CheckCheck className="h-4 w-4 mr-2" />
                          Marcar todas como lidas
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          fetchNotifications();
                          fetchStats();
                        }}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="all">
                        Todas ({stats.total})
                      </TabsTrigger>
                      <TabsTrigger value="unread">
                        Não lidas ({stats.unread})
                      </TabsTrigger>
                      <TabsTrigger value="read">
                        Lidas ({stats.total - stats.unread})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-6">
                      <ScrollArea className="h-96">
                        {filteredNotifications.length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Nenhuma notificação encontrada</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {filteredNotifications.map((notification) => (
                              <div
                                key={notification.id}
                                className={`p-4 border rounded-lg transition-colors ${
                                  !notification.isRead
                                    ? "bg-blue-50 border-blue-200"
                                    : "bg-white border-gray-200 hover:bg-gray-50"
                                }`}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="flex-shrink-0 mt-1">
                                    {getTypeIcon(notification.type)}
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center space-x-2">
                                        <h4 className="text-sm font-medium text-gray-900">
                                          {notification.title}
                                        </h4>
                                        <Badge
                                          variant="outline"
                                          className={`text-xs ${getPriorityColor(
                                            notification.priority
                                          )}`}
                                        >
                                          {notification.priority}
                                        </Badge>
                                        <Badge
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          {getTypeLabel(notification.type)}
                                        </Badge>
                                      </div>

                                      <div className="flex items-center space-x-1">
                                        {!notification.isRead && (
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                              markAsRead(notification.id)
                                            }
                                          >
                                            <Check className="h-3 w-3" />
                                          </Button>
                                        )}
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                            deleteNotification(notification.id)
                                          }
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-2">
                                      {notification.message}
                                    </p>

                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-gray-500">
                                        {formatDate(notification.createdAt)}
                                      </span>

                                      {notification.actionUrl && (
                                        <Button
                                          variant="link"
                                          size="sm"
                                          onClick={() =>
                                            (window.location.href =
                                              notification.actionUrl!)
                                          }
                                        >
                                          Ver detalhes
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
}
