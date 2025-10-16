// Script simples para testar a API
import fetch from "node-fetch";

const API_BASE = "http://localhost:3001/api";

async function testAPI() {
  console.log("🧪 Testando API...\n");

  try {
    // Teste 1: Health Check
    console.log("1. Testando Health Check...");
    const healthResponse = await fetch(
      `${API_BASE.replace("/api", "")}/health`
    );
    const healthData = await healthResponse.json();
    console.log("✅ Health Check:", healthData.message || "OK");
    console.log("");

    // Teste 2: Registrar usuário
    console.log("2. Testando registro de usuário...");
    const registerData = {
      name: "João Silva",
      email: "joao@example.com",
      phone: "11999999999",
      employeeId: "EMP001",
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

    if (registerResponse.ok) {
      console.log("✅ Usuário registrado:", registerResult.message);
    } else {
      console.log("❌ Erro no registro:", registerResult.message);
    }
    console.log("");

    // Teste 3: Login
    console.log("3. Testando login...");
    const loginData = {
      email: "joao@example.com",
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

    if (loginResponse.ok) {
      console.log("✅ Login realizado:", loginResult.message);
      console.log("🔑 Token recebido:", loginResult.token ? "Sim" : "Não");

      // Teste 4: Clock In
      console.log("\n4. Testando clock in...");
      const clockInResponse = await fetch(`${API_BASE}/clock/clock-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginResult.token}`,
        },
        body: JSON.stringify({ notes: "Entrada teste" }),
      });

      const clockInResult = await clockInResponse.json();

      if (clockInResponse.ok) {
        console.log("✅ Clock in realizado:", clockInResult.message);
      } else {
        console.log("❌ Erro no clock in:", clockInResult.message);
      }
    } else {
      console.log("❌ Erro no login:", loginResult.message);
    }
  } catch (error) {
    console.log("❌ Erro na conexão:", error.message);
    console.log(
      "💡 Certifique-se de que o servidor está rodando na porta 3001"
    );
  }
}

// Executar testes se o servidor estiver rodando
testAPI();
