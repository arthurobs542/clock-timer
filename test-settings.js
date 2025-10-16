// Script para testar a página de configurações
const fetch = require("node-fetch");

const API_BASE = "http://localhost:3001/api";

async function testSettingsAPI() {
  console.log("🧪 Testando APIs da página de configurações...\n");

  try {
    // 1. Registrar um usuário admin para teste
    console.log("1. Registrando usuário admin para teste...");
    const registerData = {
      name: "Admin Config Teste",
      email: "admin.config@example.com",
      phone: "11999999999",
      employeeId: "ADM_CONFIG_001",
      password: "MinhaSenh@123",
      role: "ADMIN",
    };

    const registerResponse = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const registerResult = await registerResponse.json();

    if (!registerResponse.ok) {
      console.log("❌ Erro no registro:", registerResult.message);
      return;
    }

    console.log("✅ Usuário admin registrado:", registerResult.message);

    // 2. Fazer login
    console.log("\n2. Fazendo login...");
    const loginData = {
      email: "admin.config@example.com",
      password: "MinhaSenh@123",
    };

    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const loginResult = await loginResponse.json();

    if (!loginResponse.ok) {
      console.log("❌ Erro no login:", loginResult.message);
      return;
    }

    console.log("✅ Login realizado:", loginResult.message);
    const token = loginResult.token;

    // 3. Testar configurações do usuário
    console.log("\n3. Testando configurações do usuário...");

    const userSettings = {
      notifications: {
        email: true,
        push: false,
        clockReminder: true,
        reportGenerated: false,
      },
      preferences: {
        theme: "dark",
        language: "en-US",
        timezone: "America/New_York",
        dateFormat: "MM/DD/YYYY",
        timeFormat: "12h",
      },
      privacy: {
        showOnlineStatus: false,
        allowDataExport: true,
        profileVisibility: "private",
      },
    };

    const userSettingsResponse = await fetch(`${API_BASE}/settings/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userSettings),
    });

    if (userSettingsResponse.ok) {
      console.log("✅ Configurações do usuário salvas com sucesso");
    } else {
      console.log("❌ Erro ao salvar configurações do usuário");
    }

    // 4. Testar configurações do sistema (Admin)
    console.log("\n4. Testando configurações do sistema...");

    const systemSettings = {
      general: {
        companyName: "Clock Timer System - Test",
        companyEmail: "test@clocktimer.com",
        companyPhone: "+55 11 88888-8888",
        workingHours: {
          start: "09:00",
          end: "17:00",
        },
        breakDuration: 45,
        maxHoursPerDay: 10,
      },
      security: {
        sessionTimeout: 240,
        passwordPolicy: {
          minLength: 10,
          requireUppercase: true,
          requireNumbers: true,
          requireSymbols: true,
        },
        twoFactorAuth: true,
        ipWhitelist: ["192.168.1.0/24", "10.0.0.0/8"],
      },
      integrations: {
        emailProvider: "smtp",
        smsProvider: "twilio",
        backupEnabled: true,
        backupFrequency: "weekly",
      },
    };

    const systemSettingsResponse = await fetch(`${API_BASE}/settings/system`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(systemSettings),
    });

    if (systemSettingsResponse.ok) {
      console.log("✅ Configurações do sistema salvas com sucesso");
    } else {
      console.log("❌ Erro ao salvar configurações do sistema");
    }

    // 5. Buscar configurações salvas
    console.log("\n5. Buscando configurações salvas...");

    const getUserSettingsResponse = await fetch(`${API_BASE}/settings/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (getUserSettingsResponse.ok) {
      const userSettingsData = await getUserSettingsResponse.json();
      console.log("✅ Configurações do usuário carregadas:");
      console.log("   - Tema:", userSettingsData.settings.preferences.theme);
      console.log(
        "   - Idioma:",
        userSettingsData.settings.preferences.language
      );
      console.log(
        "   - Notificações email:",
        userSettingsData.settings.notifications.email
      );
      console.log(
        "   - Status online:",
        userSettingsData.settings.privacy.showOnlineStatus
      );
    } else {
      console.log("❌ Erro ao carregar configurações do usuário");
    }

    const getSystemSettingsResponse = await fetch(
      `${API_BASE}/settings/system`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (getSystemSettingsResponse.ok) {
      const systemSettingsData = await getSystemSettingsResponse.json();
      console.log("✅ Configurações do sistema carregadas:");
      console.log(
        "   - Nome da empresa:",
        systemSettingsData.settings.general.companyName
      );
      console.log(
        "   - Horário de trabalho:",
        `${systemSettingsData.settings.general.workingHours.start} - ${systemSettingsData.settings.general.workingHours.end}`
      );
      console.log(
        "   - 2FA habilitado:",
        systemSettingsData.settings.security.twoFactorAuth
      );
      console.log(
        "   - Backup habilitado:",
        systemSettingsData.settings.integrations.backupEnabled
      );
    } else {
      console.log("❌ Erro ao carregar configurações do sistema");
    }

    // 6. Testar usuário comum (sem acesso às configurações do sistema)
    console.log("\n6. Testando usuário comum...");

    const regularUserData = {
      name: "User Config Teste",
      email: "user.config@example.com",
      phone: "11888888888",
      employeeId: "USR_CONFIG_001",
      password: "MinhaSenh@123",
      role: "USER",
    };

    const regularUserResponse = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regularUserData),
    });

    if (regularUserResponse.ok) {
      const regularLoginData = {
        email: "user.config@example.com",
        password: "MinhaSenh@123",
      };

      const regularLoginResponse = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(regularLoginData),
      });

      if (regularLoginResponse.ok) {
        const regularLoginResult = await regularLoginResponse.json();
        const regularToken = regularLoginResult.token;

        // Tentar acessar configurações do sistema (deve falhar)
        const unauthorizedSystemResponse = await fetch(
          `${API_BASE}/settings/system`,
          {
            headers: {
              Authorization: `Bearer ${regularToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (unauthorizedSystemResponse.status === 403) {
          console.log(
            "✅ Usuário comum corretamente bloqueado das configurações do sistema"
          );
        } else {
          console.log(
            "❌ Usuário comum não foi bloqueado das configurações do sistema"
          );
        }
      }
    }

    console.log("\n🎉 Testes da página de configurações concluídos!");
    console.log("\n💡 Para testar a interface:");
    console.log("   1. Acesse http://localhost:3000/settings");
    console.log(
      "   2. Faça login com: admin.config@example.com / MinhaSenh@123"
    );
    console.log("   3. Teste as configurações pessoais e do sistema");
    console.log(
      "   4. Faça login com: user.config@example.com / MinhaSenh@123"
    );
    console.log(
      "   5. Verifique que apenas configurações pessoais estão disponíveis"
    );
  } catch (error) {
    console.log("❌ Erro na conexão:", error.message);
    console.log(
      "💡 Certifique-se de que o servidor backend está rodando na porta 3001"
    );
  }
}

// Executar testes
testSettingsAPI();
