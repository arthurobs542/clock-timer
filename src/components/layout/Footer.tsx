import Link from "next/link";
import { APP_CONFIG } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  CT
                </span>
              </div>
              <span className="font-bold text-xl">{APP_CONFIG.name}</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              {APP_CONFIG.description}
            </p>
          </div>

          {/* Links úteis */}
          <div>
            <h3 className="font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Ajuda
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/docs"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentação
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Suporte Técnico
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/arthurobs542/clock-timer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória e copyright */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {APP_CONFIG.name}. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Desenvolvido por {APP_CONFIG.author}
          </p>
        </div>
      </div>
    </footer>
  );
}
