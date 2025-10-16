// Script para testar a página de perfil
import fetch from "node-fetch";

const API_BASE = "http://localhost:3001/api";

async function testProfileAPI() {
  console.log("🧪 Testando APIs da página de perfil...\n");

  try {
    // 1. Registrar um usuário para teste
    console.log("1. Registrando usuário para teste...");
    const registerData = {
      name: "João Silva Teste",
      email: "joao.perfil@example.com",
      phone: "11999999999",
      employeeId: "EMP_PROFILE_001",
      password: "MinhaSenh@123",
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

    console.log("✅ Usuário registrado:", registerResult.message);

    // 2. Fazer login
    console.log("\n2. Fazendo login...");
    const loginData = {
      email: "joao.perfil@example.com",
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

    // 3. Testar endpoint de perfil
    console.log("\n3. Testando endpoint de perfil...");
    const profileResponse = await fetch(`${API_BASE}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const profileResult = await profileResponse.json();

    if (profileResponse.ok) {
      console.log("✅ Perfil carregado:", profileResult.message);
      console.log("👤 Dados do usuário:");
      console.log("   - Nome:", profileResult.user.name);
      console.log("   - Email:", profileResult.user.email);
      console.log("   - ID Funcionário:", profileResult.user.employeeId);
      console.log("   - Role:", profileResult.user.role);
      console.log("   - Ativo:", profileResult.user.isActive);
    } else {
      console.log("❌ Erro ao carregar perfil:", profileResult.message);
    }

    // 4. Testar atualização de perfil
    console.log("\n4. Testando atualização de perfil...");
    const updateData = {
      name: "João Silva Atualizado",
      phone: "11888888888",
      avatar: "https://via.placeholder.com/150",
    };

    const updateResponse = await fetch(`${API_BASE}/users/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const updateResult = await updateResponse.json();

    if (updateResponse.ok) {
      console.log("✅ Perfil atualizado:", updateResult.message);
      console.log("🔄 Dados atualizados:");
      console.log("   - Nome:", updateResult.user.name);
      console.log("   - Telefone:", updateResult.user.phone);
      console.log("   - Avatar:", updateResult.user.avatar);
    } else {
      console.log("❌ Erro ao atualizar perfil:", updateResult.message);
    }

    // 5. Testar endpoint de estatísticas
    console.log("\n5. Testando endpoint de estatísticas...");
    const statsResponse = await fetch(`${API_BASE}/clock/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const statsResult = await statsResponse.json();

    if (statsResponse.ok) {
      console.log("✅ Estatísticas carregadas:", statsResult.message);
      console.log("📊 Estatísticas:");
      console.log("   - Total de horas:", statsResult.stats.totalHours);
      console.log("   - Total de dias:", statsResult.stats.totalDays);
      console.log(
        "   - Média por dia:",
        statsResult.stats.averageHoursPerDay.toFixed(2) + "h"
      );
      console.log(
        "   - Horas esta semana:",
        statsResult.stats.currentWeekHours
      );
      console.log("   - Horas este mês:", statsResult.stats.currentMonthHours);
    } else {
      console.log("❌ Erro ao carregar estatísticas:", statsResult.message);
    }

    // 6. Simular alguns registros de ponto para gerar estatísticas
    console.log("\n6. Criando registros de ponto para gerar estatísticas...");

    // Clock in
    const clockInResponse = await fetch(`${API_BASE}/clock/clock-in`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes: "Entrada teste perfil" }),
    });

    if (clockInResponse.ok) {
      console.log("✅ Clock in realizado");

      // Aguardar um pouco e fazer clock out
      setTimeout(async () => {
        const clockOutResponse = await fetch(`${API_BASE}/clock/clock-out`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notes: "Saída teste perfil" }),
        });

        if (clockOutResponse.ok) {
          console.log("✅ Clock out realizado");

          // Buscar estatísticas atualizadas
          const updatedStatsResponse = await fetch(`${API_BASE}/clock/stats`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          const updatedStatsResult = await updatedStatsResponse.json();

          if (updatedStatsResponse.ok) {
            console.log("\n📊 Estatísticas atualizadas:");
            console.log(
              "   - Total de horas:",
              updatedStatsResult.stats.totalHours.toFixed(2) + "h"
            );
            console.log(
              "   - Total de dias:",
              updatedStatsResult.stats.totalDays
            );
          }
        }
      }, 1000);
    }

    console.log("\n🎉 Testes da página de perfil concluídos!");
    console.log("\n💡 Para testar a interface:");
    console.log("   1. Acesse http://localhost:3000/profile");
    console.log(
      "   2. Faça login com: joao.perfil@example.com / MinhaSenh@123"
    );
    console.log("   3. Teste as funcionalidades da página de perfil");
  } catch (error) {
    console.log("❌ Erro na conexão:", error.message);
    console.log(
      "💡 Certifique-se de que o servidor backend está rodando na porta 3001"
    );
  }
}

// Executar testes
testProfileAPI();
