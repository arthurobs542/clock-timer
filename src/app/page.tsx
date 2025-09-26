import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Layout, Container } from "@/components/layout";
import { Clock, Users, BarChart3, Shield, Smartphone, Zap } from "lucide-react";
import { APP_CONFIG } from "@/lib/constants";

export default function Home() {
  return (
    <Layout showFooter={true}>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <Container size="lg" className="text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Controle de Ponto{" "}
                <span className="text-primary">Inteligente</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {APP_CONFIG.description}. Sistema moderno e responsivo para
                micro empresas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/login">Começar Agora</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo">Ver Demo</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <Container size="lg">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Funcionalidades Principais
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar o ponto dos seus funcionários
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Clock In/Out</CardTitle>
                <CardDescription>
                  Registro simples e rápido de entrada e saída com
                  geolocalização
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Gerenciamento de Funcionários</CardTitle>
                <CardDescription>
                  Controle completo de escalas e atribuições de funcionários
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Relatórios Detalhados</CardTitle>
                <CardDescription>
                  Relatórios individuais e gerais com exportação em múltiplos
                  formatos
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>
                  Controle de acesso por roles e validação de dados
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Responsivo</CardTitle>
                <CardDescription>
                  Funciona perfeitamente em desktop, tablet e mobile
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Rápido e Moderno</CardTitle>
                <CardDescription>
                  Interface moderna e performance otimizada
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <Container size="lg" className="text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para começar?
            </h2>
            <p className="text-xl text-muted-foreground">
              Transforme o controle de ponto da sua empresa hoje mesmo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/register">Criar Conta</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Falar com Vendas</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
