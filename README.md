# 📝 To-Do List App

Um aplicativo web moderno e responsivo para gerenciamento de tarefas com armazenamento local (Local Storage).

## ✨ Recursos

- ✅ **Adicionar Tarefas** - Crie novas tarefas rapidamente
- ✔️ **Marcar Concluídas** - Checkboxes para marcar tarefas como feitas
- 🗑️ **Deletar Tarefas** - Remova tarefas individuais
- 🔍 **Filtros Avançados** - Visualize todas, pendentes ou concluídas
- 📊 **Estatísticas** - Acompanhe o progresso com contadores em tempo real
- 💾 **Local Storage** - Suas tarefas são salvas automaticamente no navegador
- 📱 **Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- 🎨 **Design Moderno** - Interface limpa e intuitiva com gradientes
- ⌨️ **Atalhos** - Pressione Enter para adicionar tarefas rapidamente

## 🚀 Como Usar

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/HalksBlack/todo-list-app.git
cd todo-list-app
```

2. Abra o arquivo `index.html` no seu navegador:
   - Clique duplo no arquivo, ou
   - Use um servidor local (recomendado):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (http-server)
   npx http-server
   ```

3. Acesse `http://localhost:8000` no navegador

### Funcionalidades

#### ➕ Adicionar Tarefas
- Digite a tarefa no campo de entrada
- Clique no botão "+ Adicionar" ou pressione Enter
- A tarefa aparecerá no topo da lista

#### ✅ Marcar Concluída
- Clique no checkbox ao lado da tarefa
- A tarefa será marcada com risco e opacidade reduzida
- Clique novamente para desmarcar

#### 🗑️ Deletar Tarefas
- Clique no botão "Deletar" da tarefa
- Confirme a exclusão na janela de diálogo

#### 🔍 Filtrar Tarefas
- **Todas** - Mostra todas as tarefas
- **Pendentes** - Mostra apenas tarefas não concluídas
- **Concluídas** - Mostra apenas tarefas marcadas como feitas

#### 📊 Visualizar Estatísticas
- **Total** - Número total de tarefas
- **Pendentes** - Quantas tarefas faltam fazer
- **Concluídas** - Quantas tarefas foram finalizadas

#### 🧹 Limpar Tarefas
- **Limpar Concluídas** - Remove todas as tarefas marcadas como feitas
- **Limpar Tudo** - Remove todas as tarefas (com confirmação)

## 📁 Estrutura do Projeto

```
todo-list-app/
├── index.html      # Estrutura HTML
├── styles.css      # Estilos CSS
├── script.js       # Lógica JavaScript
└── README.md       # Documentação
```

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com gradientes e animações
- **JavaScript (ES6)** - Lógica da aplicação
- **Local Storage API** - Persistência de dados

## 💾 Armazenamento de Dados

O aplicativo usa `localStorage` para armazenar as tarefas:
- Os dados são salvos automaticamente quando você:
  - Adiciona uma tarefa
  - Marca/desmarca uma tarefa
  - Deleta uma tarefa
  - Limpa tarefas concluídas ou todas
  
- Dados são mantidos mesmo depois de fechar o navegador
- Cada domínio tem seu próprio espaço de armazenamento isolado

### Limite de Armazenamento
- Tipicamente 5-10MB por domínio
- Varia de acordo com o navegador

## 🎨 Tema Visual

### Cores
- **Primária**: Roxo (#6366f1)
- **Secundária**: Violeta (#8b5cf6)
- **Sucesso**: Verde (#10b981)
- **Perigo**: Vermelho (#ef4444)
- **Aviso**: Âmbar (#f59e0b)

### Responsividade
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (até 767px)

## 🔐 Segurança

- Proteção contra XSS (Cross-Site Scripting) via `textContent`
- Validação de entrada antes de adicionar tarefas
- Confirmações para ações destrutivas

## 📝 Estrutura do Arquivo `script.js`

### Classe `TaskManager`

```javascript
class TaskManager {
  constructor()      // Inicializa o gerenciador
  init()             // Configura listeners e renderiza
  addTask()          // Adiciona nova tarefa
  toggleTask(id)     // Marca/desmarca como concluída
  deleteTask(id)     // Deleta uma tarefa
  clearCompleted()   // Limpa concluídas
  clearAll()         // Limpa todas as tarefas
  getFilteredTasks() // Retorna tarefas filtradas
  saveToStorage()    // Salva no localStorage
  loadFromStorage()  // Carrega do localStorage
  updateStats()      // Atualiza contadores
  render()           // Renderiza interface
}
```

## 🐛 Troubleshooting

### As tarefas não estão sendo salvas?
- Verifique se o localStorage está habilitado no navegador
- Tente limpar o cache e recarregar
- Verifique o espaço disponível no navegador

### A interface está lenta?
- Limpe as tarefas concluídas regularmente
- Feche outras abas para liberar memória
- Tente atualizar a página

### Erros no console?
- Verifique a compatibilidade do navegador
- Certifique-se de que JavaScript está habilitado
- Abra DevTools (F12) e veja a aba Console

## 🌐 Compatibilidade

- ✅ Chrome/Edge (versões recentes)
- ✅ Firefox (versões recentes)
- ✅ Safari (versões recentes)
- ✅ Opera (versões recentes)
- ⚠️ Internet Explorer (não suportado)

## 📚 Recursos Adicionais

- [MDN - Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN - JavaScript Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [CSS Gradients Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient)

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📋 Roadmap Futuro

- [ ] Adicionar categorias/tags
- [ ] Suporte a temas (claro/escuro)
- [ ] Exportar tarefas em PDF
- [ ] Sincronizar com cloud (Firebase)
- [ ] Notificações de tarefas
- [ ] Prioridades customizáveis
- [ ] Datas de vencimento
- [ ] Histórico de tarefas

## 📄 Licença

Este projeto está licenciado sob a GNU General Public License v3.0 - veja o arquivo LICENSE para detalhes.

## 👨‍💻 Autor

**HalksBlack**
- GitHub: [@HalksBlack](https://github.com/HalksBlack)

## 💬 Feedback

Tem alguma sugestão ou encontrou um bug? Abra uma issue no repositório!

---

**Feito com ❤️ para ajudar você a ser mais produtivo!**

Acesse o aplicativo: [To-Do List App](https://github.com/HalksBlack/todo-list-app)
