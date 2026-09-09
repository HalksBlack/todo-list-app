// Task Manager Class
class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.storageKey = 'todoList_tasks';
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Add button
        document.getElementById('addBtn').addEventListener('click', () => this.addTask());
        
        // Input enter key
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });

        // Clear buttons
        document.getElementById('clearCompletedBtn').addEventListener('click', () => this.clearCompleted());
        document.getElementById('clearAllBtn').addEventListener('click', () => this.clearAll());
    }

    addTask() {
        const input = document.getElementById('taskInput');
        const taskText = input.value.trim();

        if (taskText === '') {
            alert('Por favor, adicione uma tarefa!');
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            priority: 'medium',
            createdAt: new Date().toLocaleDateString('pt-BR')
        };

        this.tasks.unshift(task);
        this.saveToStorage();
        this.render();
        input.value = '';
        input.focus();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToStorage();
            this.render();
        }
    }

    deleteTask(id) {
        if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveToStorage();
            this.render();
        }
    }

    clearCompleted() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        if (completedCount === 0) {
            alert('Nenhuma tarefa concluída para limpar!');
            return;
        }

        if (confirm(`Deseja deletar ${completedCount} tarefa(s) concluída(s)?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveToStorage();
            this.render();
        }
    }

    clearAll() {
        if (this.tasks.length === 0) {
            alert('Não há tarefas para limpar!');
            return;
        }

        if (confirm('⚠️ Tem certeza que deseja deletar TODAS as tarefas? Esta ação não pode ser desfeita!')) {
            this.tasks = [];
            this.saveToStorage();
            this.render();
        }
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'pending':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Erro ao salvar no localStorage:', error);
            alert('Erro ao salvar suas tarefas. Verifique seu espaço de armazenamento.');
        }
    }

    loadFromStorage() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            this.tasks = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Erro ao carregar do localStorage:', error);
            this.tasks = [];
        }
    }

    updateStats() {
        const total = this.tasks.length;
        const pending = this.tasks.filter(t => !t.completed).length;
        const completed = this.tasks.filter(t => t.completed).length;

        document.getElementById('totalCount').textContent = total;
        document.getElementById('pendingCount').textContent = pending;
        document.getElementById('completedCount').textContent = completed;

        // Disable buttons if no tasks
        document.getElementById('clearCompletedBtn').disabled = completed === 0;
        document.getElementById('clearAllBtn').disabled = total === 0;
    }

    render() {
        const taskList = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');
        const filteredTasks = this.getFilteredTasks();

        // Clear previous tasks
        taskList.innerHTML = '';

        // Update stats
        this.updateStats();

        // Show/hide empty state
        if (filteredTasks.length === 0) {
            emptyState.classList.add('show');
            taskList.style.display = 'none';
        } else {
            emptyState.classList.remove('show');
            taskList.style.display = 'block';

            // Render tasks
            filteredTasks.forEach(task => {
                const li = this.createTaskElement(task);
                taskList.appendChild(li);
            });
        }
    }

    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', task.id);

        const priorityClass = task.priority || 'medium';
        const priorityLabel = this.getPriorityLabel(priorityClass);

        li.innerHTML = `
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.completed ? 'checked' : ''}
                data-id="${task.id}"
            >
            <span class="task-text">${this.escapeHtml(task.text)}</span>
            <span class="task-priority ${priorityClass}">${priorityLabel}</span>
            <span class="task-date">${task.createdAt}</span>
            <button class="delete-btn" data-id="${task.id}">Deletar</button>
        `;

        // Checkbox listener
        li.querySelector('.task-checkbox').addEventListener('change', (e) => {
            this.toggleTask(parseInt(e.target.dataset.id));
        });

        // Delete button listener
        li.querySelector('.delete-btn').addEventListener('click', (e) => {
            this.deleteTask(parseInt(e.target.dataset.id));
        });

        return li;
    }

    getPriorityLabel(priority) {
        const labels = {
            'high': '🔴 Alta',
            'medium': '🟡 Média',
            'low': '🟢 Baixa'
        };
        return labels[priority] || 'Média';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});

// Auto-save on visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Aplicativo em background - tarefas salvas');
    }
});

// Optional: Add periodic auto-save
setInterval(() => {
    if (window.taskManager) {
        window.taskManager.saveToStorage();
    }
}, 30000); // Save every 30 seconds
