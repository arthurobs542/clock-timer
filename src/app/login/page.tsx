import { LoginForm } from "@/components/auth/LoginForm";
import { Layout, Container } from "@/components/layout";

interface LoginPageProps {
  searchParams: {
    message?: string;
  };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <Layout showFooter={false}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/5 py-12">
        <Container size="sm">
          <LoginForm message={searchParams.message} />
        </Container>
      </div>
    </Layout>
  );
}
