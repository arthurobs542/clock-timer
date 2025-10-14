import { LoginForm } from "@/components/auth/LoginForm";
import { Layout, Container } from "@/components/layout";

interface LoginPageProps {
  searchParams: Promise<{
    message?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/5 py-12">
        <Container size="sm">
          <LoginForm message={params.message} />
        </Container>
      </div>
    </Layout>
  );
}
