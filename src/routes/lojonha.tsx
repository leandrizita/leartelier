import { createFileRoute, redirect } from "@tanstack/react-router";

// O endereço antigo /lojonha foi renomeado para /lojinha.
// Esta rota mantém o link antigo funcionando com um redirecionamento permanente.
export const Route = createFileRoute("/lojonha")({
  beforeLoad: () => {
    throw redirect({ to: "/lojinha", statusCode: 301 });
  },
  component: () => null,
});
