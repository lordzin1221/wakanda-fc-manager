export const generateReport = (type: string, data: any) => {
  let content = '';
  const date = new Date().toLocaleDateString('pt-BR');
  const time = new Date().toLocaleTimeString('pt-BR');

  if (type === 'users') {
    content = `WAKANDA FC - RELATÓRIO DE USUÁRIAS\n${date} ${time}\n\nTotal: ${data.totalUsers}\nAtivas: ${data.activeUsers}\n`;
  } else if (type === 'games') {
    content = `WAKANDA FC - RELATÓRIO DE JOGOS\n${date} ${time}\n\nTotal: ${data.totalGames}\nPresença: 87%\n`;
  } else if (type === 'communication') {
    content = `WAKANDA FC - RELATÓRIO DE COMUNICAÇÃO\n${date} ${time}\n\nMensagens: ${data.totalMessages}\nEngajamento: 8.5/10\n`;
  } else if (type === 'growth') {
    content = `WAKANDA FC - RELATÓRIO DE CRESCIMENTO\n${date} ${time}\n\nCrescimento: +100%\nComunidade: Consolidada\n`;
  }

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `relatorio-${type}.txt`;
  link.click();
  URL.revokeObjectURL(url);
};
