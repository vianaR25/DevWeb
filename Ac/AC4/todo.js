let tasks = []; // Lista para armazenar as tarefas

// Função para adicionar nova tarefa
function addTask(task) {
    tasks.push(task);
    console.log(`Tarefa '${task}' adicionada com sucesso!`);
}

// Função para remover uma tarefa
function removeTask(index) {
    if (index >= 0 && index < tasks.length) {
        const removed = tasks.splice(index, 1);
        console.log(`Tarefa '${removed}' removida com sucesso!`);
    } else {
        console.log('Índice inválido! Tente novamente.');
    }
}

// Função para listar todas as tarefas
function listTasks() {
    if (tasks.length === 0) {
        console.log('Nenhuma tarefa encontrada.');
    } else {
        console.log('Tarefas:');
        tasks.forEach((task, index) => {
            console.log(`${index}: ${task}`);
        });
    }
}

// Função principal para o menu
function manageTasks() {
    let choice;
    while (choice !== 4) {
        console.log("\nGerenciador de Tarefas:");
        console.log("1. Adicionar Tarefa");
        console.log("2. Remover Tarefa");
        console.log("3. Listar Tarefas");
        console.log("4. Sair");
        choice = parseInt(prompt("Escolha uma opção: "));

        switch (choice) {
            case 1:
                const newTask = prompt("Digite a nova tarefa: ");
                addTask(newTask);
                break;
            case 2:
                const index = parseInt(prompt("Digite o índice da tarefa a ser removida: "));
                removeTask(index);
                break;
            case 3:
                listTasks();
                break;
            case 4:
                console.log("Saindo do gerenciador de tarefas...");
                break;
            default:
                console.log("Opção inválida! Tente novamente.");
        }
    }
}

// Iniciar o gerenciador de tarefas
manageTasks();
