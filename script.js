// Criar um array para armazenar os dados de cada aluno
let alunos = [];

function verificarPreenchimentoFormulario(cod, nome, sobrenome, email, n1, n2, n3) {
    if (!cod || !nome || !sobrenome || !email || !n1 || !n2 || !n3) {
        throw new Error("Todos os campos são obrigatórios");
    }
}

function verificarCampoVazio(valor) {
    if (!valor) {
        throw new Error("O campo não pode ser vazio");
    }
}

function exibirCampos(listaValores) {
    const tabela = document.getElementById("tabelaValores").querySelector("tbody");

    tabela.innerHTML = "";

    listaValores.forEach(valor => {
        const linha = document.createElement("tr");

        const colunaCod = document.createElement("td");
        colunaCod.textContent = valor.cod;
        linha.appendChild(colunaCod);

        const colunaNome = document.createElement("td");
        colunaNome.textContent = valor.nome;
        linha.appendChild(colunaNome);

        const colunaSobrenome = document.createElement("td");
        colunaSobrenome.textContent = valor.sobrenome;
        linha.appendChild(colunaSobrenome);

        const colunaEmail = document.createElement("td");
        colunaEmail.textContent = valor.email;
        linha.appendChild(colunaEmail);

        const colunaNotas = document.createElement("td");
        colunaNotas.textContent = valor.numerosArray.join(", ");
        linha.appendChild(colunaNotas);

        const colunaMedia = document.createElement("td");
        colunaMedia.textContent = valor.media;
        linha.appendChild(colunaMedia);

        const colunaAtivo = document.createElement("td");
        colunaAtivo.textContent = valor.opcaoSelecionada ? "Sim" : "Não";
        linha.appendChild(colunaAtivo);

        tabela.appendChild(linha);
    });
}

function ehNumero(n1, n2, n3) {
    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        throw new Error("Você deve por apenas números nos inputs das notas");
    }
}

function jaExiste(cod, nome, email) {
    const alunoExistente = alunos.find(aluno => aluno.cod === cod || aluno.nome === nome || aluno.email === email);
    if (alunoExistente) {
        throw new Error("Já existe um aluno com o mesmo código, nome ou email");
    }
}

function fazerMedia(n1, n2, n3) {
    const numerosArray = [Number(n1), Number(n2), Number(n3)];
    const somaNumeros = numerosArray.reduce((total, numero) => total + numero, 0);
    const media = somaNumeros / numerosArray.length;
    return media;
}

function salvarDados() {
    const cod = document.getElementById("cod");
    const nome = document.getElementById("nome");
    const sobrenome = document.getElementById("sobrenome");
    const email = document.getElementById("email");
    const n1 = document.getElementById("n1")
    const n2 = document.getElementById("n2")
    const n3 = document.getElementById("n3")
    const opcaoSelecionadaValue = document.querySelector('input[name="grupo_opcoes"]:checked').value;
    const opcaoSelecionada = opcaoSelecionadaValue === "true";
    try {
        verificarPreenchimentoFormulario(
            cod.value.trim(),
            nome.value.trim(),
            sobrenome.value.trim(),
            email.value.trim(),
            n1.value.trim(),
            n2.value.trim(),
            n3.value.trim()
        );

        ehNumero(n1.value.trim(), n2.value.trim(), n3.value.trim());
        jaExiste(cod.value.trim(), nome.value.trim(), email.value.trim());
        const media = fazerMedia(n1.value.trim(), n2.value.trim(), n3.value.trim());

        const aluno = {
            cod: cod.value.trim(),
            nome: nome.value.trim(),
            sobrenome: sobrenome.value.trim(),
            email: email.value.trim(),
            numerosArray: [Number(n1.value.trim()), Number(n2.value.trim()), Number(n3.value.trim())],
            media: media.toFixed(1),
            opcaoSelecionada: opcaoSelecionada
        };

        alunos.push(aluno);
        alert("Aluno " + aluno.nome + " " + aluno.sobrenome + " foi cadastrado com sucesso!");

    } catch (erro) {
        alert(erro.message);
    }
}

function listaDeAlunos() {
    exibirCampos(alunos);

}



function removerAluno() {
    const codigoParaRemover = document.getElementById("codigoParaRemover").value;
    try {
        verificarCampoVazio(codigoParaRemover);
        let alunoRemovido = false;

        for (let i = alunos.length - 1; i >= 0; i--) {
            if (alunos[i].cod === codigoParaRemover) {
                alunos.splice(i, 1);
                alunoRemovido = true;
                break;
            }
        }

        if (alunoRemovido) {
            alert(`Aluno com código ${codigoParaRemover} foi removido.`);
        } else {
            alert("Nenhum aluno com o código informado");
        }
    } catch (erro) {
        alert(erro.message);
    }
}


function pesquisarAluno() {
    const codigoPesquisa = document.getElementById("codigoPesquisa").value;
    try {
        verificarCampoVazio(codigoPesquisa);
        const alunoEncontrado = alunos.find(aluno => aluno.cod === codigoPesquisa);
        const tabelaAlunoEncontrado = document.getElementById("tabelaValores").querySelector("tbody");
        tabelaAlunoEncontrado.innerHTML = "";
        if (alunoEncontrado) {
            const linha = criarLinhaTabela(alunoEncontrado);
            tabelaAlunoEncontrado.appendChild(linha);
        } else {
            alert("Nenhum aluno com o código informado");
            return;
        }
    } catch (erro) {
        alert(erro.message);
    }
}

function criarLinhaTabela(aluno) {
    const linha = document.createElement("tr");

    const colunaCod = document.createElement("td");
    colunaCod.textContent = aluno.cod;
    linha.appendChild(colunaCod);

    const colunaNome = document.createElement("td");
    colunaNome.textContent = aluno.nome;
    linha.appendChild(colunaNome);

    const colunaSobrenome = document.createElement("td");
    colunaSobrenome.textContent = aluno.sobrenome;
    linha.appendChild(colunaSobrenome);

    const colunaEmail = document.createElement("td");
    colunaEmail.textContent = aluno.email;
    linha.appendChild(colunaEmail);

    const colunaNotas = document.createElement("td");
    colunaNotas.textContent = aluno.numerosArray.join(", ");
    linha.appendChild(colunaNotas);

    const colunaMedia = document.createElement("td");
    colunaMedia.textContent = aluno.media;
    linha.appendChild(colunaMedia);

    const colunaAtivo = document.createElement("td");
    colunaAtivo.textContent = aluno.opcaoSelecionada ? "Sim" : "Não";
    linha.appendChild(colunaAtivo);

    return linha;
}

function desativarAluno() {
    const codigoPesquisa = document.getElementById("codigoDesativa").value;
    try {
        verificarCampoVazio(codigoPesquisa);
        const alunoEncontrado = alunos.find(aluno => aluno.cod === codigoPesquisa);

        if (alunoEncontrado) {
            alunoEncontrado.opcaoSelecionada = !alunoEncontrado.opcaoSelecionada;
            alert("O aluno " + codigoPesquisa + " foi desativado");
        } else {
            alert("O aluno " + codigoPesquisa + " não pode ser encontrado");
        }
    } catch (erro) {
        alert(erro.message);
    }
}



function listaAtivos() {
    const alunosAtivos = alunos.filter((aluno) => aluno.opcaoSelecionada);
    const tabelaAlunoEncontrado = document.getElementById("tabelaValores").querySelector("tbody");
    tabelaAlunoEncontrado.innerHTML = "";
    if (alunosAtivos.length > 0) {
        alunosAtivos.forEach((aluno) => {
            const linha = criarLinhaTabela(aluno);
            tabelaAlunoEncontrado.appendChild(linha);
        });
    } else {
        alert("Não existem alunos ativos");
    }
}


function listaInativos() {
    const alunosInativos = alunos.filter((aluno) => !aluno.opcaoSelecionada);
    const tabelaAlunoEncontrado = document.getElementById("tabelaValores").querySelector("tbody");
    tabelaAlunoEncontrado.innerHTML = "";
    if (alunosInativos.length > 0) {
        alunosInativos.forEach((aluno) => {
            const linha = criarLinhaTabela(aluno);
            tabelaAlunoEncontrado.appendChild(linha);
        });
    } else {
        alert("Não existem alunos inativos");
    }
}

function mediaEsperada() {
    const alunosAprovados = alunos.filter(aluno => aluno.media >= 6);
    const tabelaAlunoEncontrado = document.getElementById("tabelaValores").querySelector("tbody");
    tabelaAlunoEncontrado.innerHTML = "";
    if (alunosAprovados.length > 0) {
        alunosAprovados.forEach((aluno) => {
            const linha = criarLinhaTabela(aluno);
            tabelaAlunoEncontrado.appendChild(linha);
        });
    } else {
        alert("Não existem alunos com a media esperada");
    }


}


function mediaNaoEsperada() {
    const alunosReprovados = alunos.filter(aluno => aluno.media < 6);
    const tabelaAlunoEncontrado = document.getElementById("tabelaValores").querySelector("tbody");
    tabelaAlunoEncontrado.innerHTML = "";
    if (alunosReprovados.length > 0) {
        alunosReprovados.forEach((aluno) => {
            const linha = criarLinhaTabela(aluno);
            tabelaAlunoEncontrado.appendChild(linha);
        });
    } else {
        alert("Não existem alunos abaixo da média");
    }
}