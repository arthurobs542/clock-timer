"use client";

import { useState, useEffect } from "react";
import { Layout, Container, PageHeader } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Settings,
  Bell,
  Shield,
  Database,
  Globe,
  Palette,
  Clock,
  Users,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    clockReminder: boolean;
    reportGenerated: boolean;
  };
  preferences: {
    theme: "light" | "dark" | "system";
    language: string;
    timezone: string;
    dateFormat: string;
    timeFormat: "12h" | "24h";
  };
  privacy: {
    showOnlineStatus: boolean;
    allowDataExport: boolean;
    profileVisibility: "public" | "private" | "limited";
  };
}

interface SystemSettings {
  general: {
    companyName: string;
    companyEmail: string;
    companyPhone: string;
    workingHours: {
      start: string;
      end: string;
    };
    breakDuration: number;
    maxHoursPerDay: number;
  };
  security: {
    sessionTimeout: number;
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireNumbers: boolean;
      requireSymbols: boolean;
    };
    twoFactorAuth: boolean;
    ipWhitelist: string[];
  };
  integrations: {
    emailProvider: string;
    smsProvider: string;
    backupEnabled: boolean;
    backupFrequency: string;
  };
}

export default function SettingsPage() {
  const [userSettings, setUserSettings] = useState<UserSettings>({
    notifications: {
      email: true,
      push: true,
      clockReminder: true,
      reportGenerated: false,
    },
    preferences: {
      theme: "system",
      language: "pt-BR",
      timezone: "America/Sao_Paulo",
      dateFormat: "DD/MM/YYYY",
      timeFormat: "24h",
    },
    privacy: {
      showOnlineStatus: true,
      allowDataExport: true,
      profileVisibility: "limited",
    },
  });

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    general: {
      companyName: "Clock Timer System",
      companyEmail: "admin@clocktimer.com",
      companyPhone: "+55 11 99999-9999",
      workingHours: {
        start: "08:00",
        end: "18:00",
      },
      breakDuration: 60,
      maxHoursPerDay: 12,
    },
    security: {
      sessionTimeout: 480,
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireNumbers: true,
        requireSymbols: true,
      },
      twoFactorAuth: false,
      ipWhitelist: [],
    },
    integrations: {
      emailProvider: "smtp",
      smsProvider: "none",
      backupEnabled: true,
      backupFrequency: "daily",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userRole, setUserRole] = useState<string>("USER");
  const { toast } = useToast();

  useEffect(() => {
    fetchUserRole();
    fetchSettings();
  }, []);

  const fetchUserRole = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:3001/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserRole(data.user.role);
      }
    } catch (error) {
      console.error("Erro ao buscar role do usuário:", error);
    }
  };

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      // Aqui você implementaria a busca das configurações salvas
      // Por enquanto, usando os valores padrão
      console.log("Carregando configurações...");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao carregar configurações",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserSettings = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Aqui você implementaria o salvamento das configurações
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simular API call

      toast({
        title: "Sucesso",
        description: "Configurações salvas com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao salvar configurações",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const saveSystemSettings = async () => {
    if (userRole !== "ADMIN") {
      toast({
        title: "Erro",
        description:
          "Apenas administradores podem alterar configurações do sistema",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      // Aqui você implementaria o salvamento das configurações do sistema
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simular API call

      toast({
        title: "Sucesso",
        description: "Configurações do sistema salvas com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao salvar configurações do sistema",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resetToDefaults = () => {
    setUserSettings({
      notifications: {
        email: true,
        push: true,
        clockReminder: true,
        reportGenerated: false,
      },
      preferences: {
        theme: "system",
        language: "pt-BR",
        timezone: "America/Sao_Paulo",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "24h",
      },
      privacy: {
        showOnlineStatus: true,
        allowDataExport: true,
        profileVisibility: "limited",
      },
    });

    toast({
      title: "Configurações Resetadas",
      description: "Configurações foram restauradas para os valores padrão",
    });
  };

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
            title="Configurações"
            description="Gerencie suas preferências e configurações do sistema"
          />

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="personal"
                className="flex items-center space-x-2"
              >
                <Settings className="h-4 w-4" />
                <span>Pessoais</span>
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center space-x-2"
              >
                <Bell className="h-4 w-4" />
                <span>Notificações</span>
              </TabsTrigger>
              {userRole === "ADMIN" && (
                <TabsTrigger
                  value="system"
                  className="flex items-center space-x-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>Sistema</span>
                </TabsTrigger>
              )}
            </TabsList>

            {/* Configurações Pessoais */}
            <TabsContent value="personal" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Preferências */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Palette className="h-5 w-5" />
                      <span>Preferências</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Tema</Label>
                      <Select
                        value={userSettings.preferences.theme}
                        onValueChange={(value: "light" | "dark" | "system") =>
                          setUserSettings({
                            ...userSettings,
                            preferences: {
                              ...userSettings.preferences,
                              theme: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Claro</SelectItem>
                          <SelectItem value="dark">Escuro</SelectItem>
                          <SelectItem value="system">Sistema</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma</Label>
                      <Select
                        value={userSettings.preferences.language}
                        onValueChange={(value) =>
                          setUserSettings({
                            ...userSettings,
                            preferences: {
                              ...userSettings.preferences,
                              language: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt-BR">Português (BR)</SelectItem>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="es-ES">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Fuso Horário</Label>
                      <Select
                        value={userSettings.preferences.timezone}
                        onValueChange={(value) =>
                          setUserSettings({
                            ...userSettings,
                            preferences: {
                              ...userSettings.preferences,
                              timezone: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/Sao_Paulo">
                            São Paulo (GMT-3)
                          </SelectItem>
                          <SelectItem value="America/New_York">
                            Nova York (GMT-5)
                          </SelectItem>
                          <SelectItem value="Europe/London">
                            Londres (GMT+0)
                          </SelectItem>
                          <SelectItem value="Asia/Tokyo">
                            Tóquio (GMT+9)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeFormat">Formato de Hora</Label>
                      <Select
                        value={userSettings.preferences.timeFormat}
                        onValueChange={(value: "12h" | "24h") =>
                          setUserSettings({
                            ...userSettings,
                            preferences: {
                              ...userSettings.preferences,
                              timeFormat: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24h">24 horas</SelectItem>
                          <SelectItem value="12h">12 horas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Privacidade */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Privacidade</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="onlineStatus">
                          Mostrar Status Online
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Permitir que outros vejam quando você está online
                        </p>
                      </div>
                      <Switch
                        id="onlineStatus"
                        checked={userSettings.privacy.showOnlineStatus}
                        onCheckedChange={(checked) =>
                          setUserSettings({
                            ...userSettings,
                            privacy: {
                              ...userSettings.privacy,
                              showOnlineStatus: checked,
                            },
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="dataExport">
                          Permitir Exportação de Dados
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Permitir download dos seus dados pessoais
                        </p>
                      </div>
                      <Switch
                        id="dataExport"
                        checked={userSettings.privacy.allowDataExport}
                        onCheckedChange={(checked) =>
                          setUserSettings({
                            ...userSettings,
                            privacy: {
                              ...userSettings.privacy,
                              allowDataExport: checked,
                            },
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="profileVisibility">
                        Visibilidade do Perfil
                      </Label>
                      <Select
                        value={userSettings.privacy.profileVisibility}
                        onValueChange={(
                          value: "public" | "private" | "limited"
                        ) =>
                          setUserSettings({
                            ...userSettings,
                            privacy: {
                              ...userSettings.privacy,
                              profileVisibility: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Público</SelectItem>
                          <SelectItem value="limited">Limitado</SelectItem>
                          <SelectItem value="private">Privado</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        Controla quem pode ver suas informações
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={resetToDefaults}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Restaurar Padrões
                </Button>
                <Button onClick={saveUserSettings} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Salvando..." : "Salvar Configurações"}
                </Button>
              </div>
            </TabsContent>

            {/* Configurações de Notificações */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notificações</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="emailNotifications">
                        Notificações por Email
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações importantes por email
                      </p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={userSettings.notifications.email}
                      onCheckedChange={(checked) =>
                        setUserSettings({
                          ...userSettings,
                          notifications: {
                            ...userSettings.notifications,
                            email: checked,
                          },
                        })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="pushNotifications">
                        Notificações Push
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações no navegador
                      </p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={userSettings.notifications.push}
                      onCheckedChange={(checked) =>
                        setUserSettings({
                          ...userSettings,
                          notifications: {
                            ...userSettings.notifications,
                            push: checked,
                          },
                        })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="clockReminder">Lembrete de Ponto</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber lembretes para bater o ponto
                      </p>
                    </div>
                    <Switch
                      id="clockReminder"
                      checked={userSettings.notifications.clockReminder}
                      onCheckedChange={(checked) =>
                        setUserSettings({
                          ...userSettings,
                          notifications: {
                            ...userSettings.notifications,
                            clockReminder: checked,
                          },
                        })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="reportGenerated">
                        Relatórios Gerados
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Notificar quando relatórios são gerados
                      </p>
                    </div>
                    <Switch
                      id="reportGenerated"
                      checked={userSettings.notifications.reportGenerated}
                      onCheckedChange={(checked) =>
                        setUserSettings({
                          ...userSettings,
                          notifications: {
                            ...userSettings.notifications,
                            reportGenerated: checked,
                          },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={saveUserSettings} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Salvando..." : "Salvar Notificações"}
                </Button>
              </div>
            </TabsContent>

            {/* Configurações do Sistema (Apenas para Admins) */}
            {userRole === "ADMIN" && (
              <TabsContent value="system" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Configurações Gerais */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Globe className="h-5 w-5" />
                        <span>Configurações Gerais</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Nome da Empresa</Label>
                        <Input
                          id="companyName"
                          value={systemSettings.general.companyName}
                          onChange={(e) =>
                            setSystemSettings({
                              ...systemSettings,
                              general: {
                                ...systemSettings.general,
                                companyName: e.target.value,
                              },
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyEmail">Email da Empresa</Label>
                        <Input
                          id="companyEmail"
                          type="email"
                          value={systemSettings.general.companyEmail}
                          onChange={(e) =>
                            setSystemSettings({
                              ...systemSettings,
                              general: {
                                ...systemSettings.general,
                                companyEmail: e.target.value,
                              },
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyPhone">
                          Telefone da Empresa
                        </Label>
                        <Input
                          id="companyPhone"
                          value={systemSettings.general.companyPhone}
                          onChange={(e) =>
                            setSystemSettings({
                              ...systemSettings,
                              general: {
                                ...systemSettings.general,
                                companyPhone: e.target.value,
                              },
                            })
                          }
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="workStart">Horário de Início</Label>
                          <Input
                            id="workStart"
                            type="time"
                            value={systemSettings.general.workingHours.start}
                            onChange={(e) =>
                              setSystemSettings({
                                ...systemSettings,
                                general: {
                                  ...systemSettings.general,
                                  workingHours: {
                                    ...systemSettings.general.workingHours,
                                    start: e.target.value,
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="workEnd">Horário de Fim</Label>
                          <Input
                            id="workEnd"
                            type="time"
                            value={systemSettings.general.workingHours.end}
                            onChange={(e) =>
                              setSystemSettings({
                                ...systemSettings,
                                general: {
                                  ...systemSettings.general,
                                  workingHours: {
                                    ...systemSettings.general.workingHours,
                                    end: e.target.value,
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="maxHours">
                          Máximo de Horas por Dia
                        </Label>
                        <Input
                          id="maxHours"
                          type="number"
                          value={systemSettings.general.maxHoursPerDay}
                          onChange={(e) =>
                            setSystemSettings({
                              ...systemSettings,
                              general: {
                                ...systemSettings.general,
                                maxHoursPerDay: parseInt(e.target.value),
                              },
                            })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Configurações de Segurança */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="h-5 w-5" />
                        <span>Segurança</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">
                          Timeout da Sessão (minutos)
                        </Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          value={systemSettings.security.sessionTimeout}
                          onChange={(e) =>
                            setSystemSettings({
                              ...systemSettings,
                              security: {
                                ...systemSettings.security,
                                sessionTimeout: parseInt(e.target.value),
                              },
                            })
                          }
                        />
                      </div>

                      <div className="space-y-4">
                        <Label>Política de Senhas</Label>
                        <div className="space-y-2">
                          <Label htmlFor="minLength">Comprimento Mínimo</Label>
                          <Input
                            id="minLength"
                            type="number"
                            value={
                              systemSettings.security.passwordPolicy.minLength
                            }
                            onChange={(e) =>
                              setSystemSettings({
                                ...systemSettings,
                                security: {
                                  ...systemSettings.security,
                                  passwordPolicy: {
                                    ...systemSettings.security.passwordPolicy,
                                    minLength: parseInt(e.target.value),
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="twoFactor">
                            Autenticação de Dois Fatores
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Exigir 2FA para todos os usuários
                          </p>
                        </div>
                        <Switch
                          id="twoFactor"
                          checked={systemSettings.security.twoFactorAuth}
                          onCheckedChange={(checked) =>
                            setSystemSettings({
                              ...systemSettings,
                              security: {
                                ...systemSettings.security,
                                twoFactorAuth: checked,
                              },
                            })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Resetar Sistema
                  </Button>
                  <Button onClick={saveSystemSettings} disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving
                      ? "Salvando..."
                      : "Salvar Configurações do Sistema"}
                  </Button>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </Container>
      </div>
    </Layout>
  );
}
