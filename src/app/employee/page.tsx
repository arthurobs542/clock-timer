import Link from "next/link";
import { Layout, Container, PageHeader } from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, TrendingUp, User, ArrowRight } from "lucide-react";

// Mock data para demonstração
const mockUser = {
  name: "João Silva",
  email: "joao.silva@empresa.com",
  role: "employee" as const,
};

const mockStats = {
  todayHours: "8h 30min",
  thisWeekHours: "42h 15min",
  thisMonthHours: "168h 45min",
  isClockedIn: false,
};

export default function EmployeeDashboardPage() {
  return (
    <Layout user={mockUser}>
      <PageHeader
        title="Dashboard do Funcionário"
        description="Acompanhe seus horários e registre seu ponto"
      />

      <Container className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Clock In/Out Card */}
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Controle de Ponto
              </CardTitle>
              <CardDescription>
                {mockStats.isClockedIn
                  ? "Você está trabalhando"
                  : "Você não está trabalhando"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                size="lg"
                variant={mockStats.isClockedIn ? "destructive" : "default"}
                asChild
              >
                <Link href="/clock">
                  {mockStats.isClockedIn
                    ? "Registrar Saída"
                    : "Registrar Entrada"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Today Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.todayHours}</div>
              <p className="text-sm text-muted-foreground">Horas trabalhadas</p>
            </CardContent>
          </Card>

          {/* This Week Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Esta Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.thisWeekHours}
              </div>
              <p className="text-sm text-muted-foreground">Horas trabalhadas</p>
            </CardContent>
          </Card>

          {/* This Month Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Este Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.thisMonthHours}
              </div>
              <p className="text-sm text-muted-foreground">Horas trabalhadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Seus últimos registros de ponto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Entrada</p>
                  <p className="text-sm text-muted-foreground">Hoje, 08:00</p>
                </div>
                <div className="text-green-600 font-medium">+8h 30min</div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Saída</p>
                  <p className="text-sm text-muted-foreground">Ontem, 17:30</p>
                </div>
                <div className="text-red-600 font-medium">-8h 30min</div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Entrada</p>
                  <p className="text-sm text-muted-foreground">Ontem, 08:00</p>
                </div>
                <div className="text-green-600 font-medium">+8h 30min</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
}
