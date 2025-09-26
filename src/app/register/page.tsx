import { RegisterForm } from "@/components/auth/RegisterForm";
import { Layout, Container } from "@/components/layout";

export default function RegisterPage() {
  return (
    <Layout showFooter={false}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/5 py-12">
        <Container size="sm">
          <RegisterForm />
        </Container>
      </div>
    </Layout>
  );
}
