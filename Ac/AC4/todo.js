let tasks = [];

function exibirMenu() {
    console.log("\nGerenciador de Tarefas");
    console.log("1. Adicionar nova tarefa");
    console.log("2. Remover uma tarefa");
    console.log("3. Listar todas as tarefas");
    console.log("4. Sair");
    
    let escolha = prompt("Escolha uma opção: ");
    return parseInt(escolha);
}

function adicionarTarefa() {
    let novaTarefa = prompt("Digite o nome da nova tarefa: ");
    tasks.push(novaTarefa);
    console.log(`Tarefa "${novaTarefa}" adicionada com sucesso!`);
}

function removerTarefa() {
    let indice = parseInt(prompt("Digite o número da tarefa que deseja remover: ")) - 1;
    if (indice >= 0 && indice < tasks.length) {
        let tarefaRemovida = tasks.splice(indice, 1);
        console.log(`Tarefa "${tarefaRemovida}" removida com sucesso!`);
    } else {
        console.log("Número inválido!");
    }
}

function listarTarefas() {
    console.log("\nLista de Tarefas:");
    if (tasks.length === 0) {
        console.log("Nenhuma tarefa adicionada.");
    } else {
        tasks.forEach((tarefa, indice) => {
            console.log(`${indice + 1}. ${tarefa}`);
        });
    }
}

let executando = true;
while (executando) {
    let escolha = exibirMenu();
    
    switch (escolha) {
        case 1:
            adicionarTarefa();
            break;
        case 2:
            removerTarefa();
            break;
        case 3:
            listarTarefas();
            break;
        case 4:
            executando = false;
            console.log("Encerrando o programa...");
            break;
        default:
            console.log("Opção inválida! Tente novamente.");
    }
}
