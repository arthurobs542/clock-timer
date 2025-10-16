
const fetch = require("node-fetch");

const API_BASE = "http:

async function testNotificationSystem() {
  console.log("🧪 Testando sistema de notificações...\n");

  try {

    console.log("1. Registrando usuários para teste...");

    const adminData = {
      name: "Admin Notifications",
      email: "admin.notifications@example.com",
      phone: "11999999999",
      employeeId: "ADM_NOTIF_001",
      password: "MinhaSenh@123",
      role: "ADMIN",
    };

    const userData = {
      name: "User Notifications",
      email: "user.notifications@example.com",
      phone: "11888888888",
      employeeId: "USR_NOTIF_001",
      password: "MinhaSenh@123",
      role: "USER",
    };

    const adminRegisterResponse = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminData),
    });

    if (!adminRegisterResponse.ok) {
      console.log("❌ Erro no registro do admin");
      return;
    }

    const userRegisterResponse = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!userRegisterResponse.ok) {
      console.log("❌ Erro no registro do usuário");
      return;
    }

    console.log("✅ Usuários registrados com sucesso");

    console.log("\n2. Fazendo login como usuário...");
    const userLoginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "user.notifications@example.com",
        password: "MinhaSenh@123",
      }),
    });

    const userLoginResult = await userLoginResponse.json();
    if (!userLoginResponse.ok) {
      console.log("❌ Erro no login do usuário:", userLoginResult.message);
      return;
    }

    const userToken = userLoginResult.token;
    console.log("✅ Login do usuário realizado");

    console.log("\n3. Fazendo login como admin...");
    const adminLoginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin.notifications@example.com",
        password: "MinhaSenh@123",
      }),
    });

    const adminLoginResult = await adminLoginResponse.json();
    if (!adminLoginResponse.ok) {
      console.log("❌ Erro no login do admin:", adminLoginResult.message);
      return;
    }

    const adminToken = adminLoginResult.token;
    console.log("✅ Login do admin realizado");

    console.log("\n4. Testando configurações de notificação...");

    const notificationSettings = {
      email: true,
      push: false,
      clockReminder: true,
      reportGenerated: true,
      systemUpdates: false,
      securityAlerts: true,
      scheduleChanges: false,
      passwordExpiry: true,
    };

    const settingsResponse = await fetch(`${API_BASE}/notifications/settings`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notificationSettings),
    });

    if (settingsResponse.ok) {
      console.log("✅ Configurações de notificação salvas");
    } else {
      console.log("❌ Erro ao salvar configurações de notificação");
    }

    console.log("\n5. Testando notificações automáticas (clock in/out)...");

    const clockInResponse = await fetch(`${API_BASE}/clock/clock-in`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes: "Entrada teste notificações" }),
    });

    if (clockInResponse.ok) {
      console.log("✅ Clock in realizado - notificação de entrada criada");
    } else {
      console.log("❌ Erro no clock in");
    }

    setTimeout(async () => {
      const clockOutResponse = await fetch(`${API_BASE}/clock/clock-out`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes: "Saída teste notificações" }),
      });

      if (clockOutResponse.ok) {
        console.log("✅ Clock out realizado - notificação de saída criada");
      } else {
        console.log("❌ Erro no clock out");
      }
    }, 2000);

    console.log("\n6. Criando notificações manuais como admin...");

    const notificationData = {
      userId: userLoginResult.user.id,
      title: "Teste de Notificação",
      message: "Esta é uma notificação de teste criada pelo admin",
      type: "GENERAL",
      priority: "HIGH",
      actionUrl: "/notifications",
    };

    const createNotificationResponse = await fetch(
      `${API_BASE}/notifications`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationData),
      }
    );

    if (createNotificationResponse.ok) {
      console.log("✅ Notificação manual criada pelo admin");
    } else {
      console.log("❌ Erro ao criar notificação manual");
    }

    console.log("\n7. Buscando notificações do usuário...");

    const getNotificationsResponse = await fetch(`${API_BASE}/notifications`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });

    if (getNotificationsResponse.ok) {
      const notificationsData = await getNotificationsResponse.json();
      console.log("✅ Notificações carregadas:");
      console.log(`   - Total: ${notificationsData.data.notifications.length}`);
      console.log(
        `   - Não lidas: ${
          notificationsData.data.notifications.filter((n) => !n.isRead).length
        }`
      );

      notificationsData.data.notifications.forEach((notification, index) => {
        console.log(
          `   ${index + 1}. ${notification.title} (${notification.type}) - ${
            notification.isRead ? "Lida" : "Não lida"
          }`
        );
      });
    } else {
      console.log("❌ Erro ao buscar notificações");
    }

    console.log("\n8. Buscando estatísticas de notificações...");

    const statsResponse = await fetch(`${API_BASE}/notifications/stats`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });

    if (statsResponse.ok) {
      const statsData = await statsResponse.json();
      console.log("✅ Estatísticas carregadas:");
      console.log(`   - Total: ${statsData.data.total}`);
      console.log(`   - Não lidas: ${statsData.data.unread}`);
      console.log("   - Por prioridade:", statsData.data.byPriority);
    } else {
      console.log("❌ Erro ao buscar estatísticas");
    }

    console.log("\n9. Marcando notificação como lida...");

    const getNotificationsResponse2 = await fetch(`${API_BASE}/notifications`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });

    if (getNotificationsResponse2.ok) {
      const notificationsData = await getNotificationsResponse2.json();
      const unreadNotification = notificationsData.data.notifications.find(
        (n) => !n.isRead
      );

      if (unreadNotification) {
        const markReadResponse = await fetch(
          `${API_BASE}/notifications/${unreadNotification.id}/read`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (markReadResponse.ok) {
          console.log("✅ Notificação marcada como lida");
        } else {
          console.log("❌ Erro ao marcar notificação como lida");
        }
      } else {
        console.log("ℹ️ Nenhuma notificação não lida encontrada");
      }
    }

    console.log("\n10. Testando notificação em lote...");

    const bulkNotificationData = {
      userIds: [userLoginResult.user.id],
      title: "Atualização do Sistema",
      message: "O sistema será atualizado hoje às 18:00. Salve seu trabalho.",
      type: "SYSTEM_UPDATE",
      priority: "MEDIUM",
    };

    const bulkNotificationResponse = await fetch(
      `${API_BASE}/notifications/bulk`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bulkNotificationData),
      }
    );

    if (bulkNotificationResponse.ok) {
      console.log("✅ Notificação em lote criada");
    } else {
      console.log("❌ Erro ao criar notificação em lote");
    }

    console.log("\n🎉 Testes do sistema de notificações concluídos!");
    console.log("\n💡 Para testar a interface:");
    console.log("   1. Acesse http:
    console.log(
      "   2. Faça login com: user.notifications@example.com / MinhaSenh@123"
    );
    console.log("   3. Teste as funcionalidades da página de notificações");
    console.log("   4. Verifique o centro de notificações no header");
  } catch (error) {
    console.log("❌ Erro na conexão:", error.message);
    console.log(
      "💡 Certifique-se de que o servidor backend está rodando na porta 3001"
    );
  }
}

testNotificationSystem();
