import { useState } from "react";
import "./styles.css";

function App(){

  const [count, setCount] = useState(0); //contador de tarefas
  const [id, setId] = useState("");
  const [tituloInput, setTituloInput] = useState(""); //manipular itens formulario
  const [categoria, setCategoria] = useState("");
  const [date, setDate] = useState("");
  const [descricao, setDescricao] = useState("");

  const [listaTarefas, setListaTarefas] = useState([]);//manipular post formulario

  function adicionaTarefas(event){
    event.preventDefault();
    
    if(tituloInput === "" || categoria ==="" || date === "" || descricao ===""){//validação via alert

     alert("Preencha todos os campos!!");
     return;
    }
    
    setListaTarefas([
      ...listaTarefas,
      {
        id: Date.now(),
        tituloInput: tituloInput,
        categoria: categoria,
        date: date,
        descricao: descricao
      },
    ]);
    setId("");
    setTituloInput("");
    setCategoria("");
    setDate("");
    setDescricao("");
    setCount(count+1);
  }

  function editaTarefa(event){
    event.preventDefault();

    const copiaListaTarefas = [...listaTarefas];

    const index = copiaListaTarefas.findIndex(
      (tarefa) => tarefa.id === id
    );

    copiaListaTarefas[index].tituloInput = tituloInput;
    copiaListaTarefas[index].categoria = categoria;
    copiaListaTarefas[index].date = date;
    copiaListaTarefas[index].descricao = descricao;

    setListaTarefas(copiaListaTarefas);

    setId("");
    setTituloInput("");
    setCategoria("");
    setDate("");
    setDescricao("");
  }

  function excluirTarefa(id){
    if(confirm("Excluir tarefa?")){
      const resposta = listaTarefas.filter((item) => item.id !== id);
      setListaTarefas(resposta);
      setCount(count-1);
    }
  }
  function mudaCard(item){

    setTituloInput(item.tituloInput);
    setCategoria(item.categoria);
    setDate(item.date);
    setDescricao(item.descricao);
    setId(item.id);

  }

  return(
    <div id='main'>
 
        <div id="formulario-dentro">
          <div id="formulario-interno">
           <h1>Cadastrar Tarefa</h1>
            <form onSubmit={id ? editaTarefa : adicionaTarefas}>
              <input type="text" 
              value={tituloInput}
              onChange={(event) => setTituloInput(event.target.value)}
              placeholder="Titulo"
              />

              <select
                value={categoria}
                onChange={(event) => setCategoria(event.target.value)}                
              >
                <option value="" disabled >Categoria</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Lazer">Lazer</option>
                <option value="Prioridade">Prioridade</option>
                <option value="Outros">Outros</option>
              </select>
              <input type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"                
              />
              <textarea name="Descricao"
                
                id="form-descricao"
                value={descricao}
                placeholder="Descrição"
                onChange={(event) => setDescricao(event.target.value)}
                ></textarea>
              <input className="save" type="submit"  value={id ? "Salvar" : "Cadastrar"}/>
              
          </form>
        </div> 
      </div>

      <div id="lista">
        <h1 className="tarefas">Minhas tarefas</h1>
        <h3 id="contador-tarefas">Total: {count} tarefas</h3>
        <div id="container-tarefas">
        {listaTarefas.length > 0 ? (
          <ul>
          {listaTarefas.map((item)=>(
            <div id="select-categorias">
              <li key={item.id} style={{ listStyleType: "none" }}>
              </li>
              <p id="titulo-card">{item.tituloInput}</p>
              <p id="categoria-card">{item.categoria}</p>
              <p id="data-card">{item.date}</p>
              <p id="descricao-card">{item.descricao}</p>
              <div id="image">
                <img src="https://img.icons8.com/external-becris-lineal-becris/256/external-edit-mintab-for-ios-becris-lineal-becris.png" alt="editar" width='20px'   onClick={()=>mudaCard(item)}/>
                <img src="https://img.icons8.com/ios/256/delete.png" alt="apagar" width='20px' onClick={()=>{excluirTarefa(item.id)}}/>
              </div>
            </div>
          ))}
          </ul>
        ):(
          <p>Parabéns! Concluiu todas suas tarefas!</p>
        )}
        </div>
      </div>
    </div>
  )
}
export default App;