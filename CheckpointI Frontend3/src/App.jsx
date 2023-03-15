import { useState } from "react";
//import {format} from 'date-fns'
import "./styles.css";

//import iconelixeira from "./assets/iconelixeira";

function App(){

  const [count, setCount] = useState(0); //contador de tarefas
  const [id, setId] = useState("");
  const [tituloInput, setTituloInput] = useState(""); //manipular itens formulario
  const [categoria, setCategoria] = useState("");
  const [date, setDate] = useState("");
  const [descricao, setDescricao] = useState("");

  const [listaTarefas, setListaTarefas] = useState([]);//manipular post formulario
  //testes de console log
  //console.log({descricao})
  //console.log({date});
  //console.log({tituloInput})
  //console.log({categoria})
  function adicionaTarefas(event){
    event.preventDefault();
    
    if(tituloInput === "" || categoria ==="" || date === "" || descricao ===""){
      //function informeCampo(){
     //   <p>informe os campos</p>
     // }
     alert("Preencha todos os campos!!");
     function informa(){
      <>Preencher o titulo</>
     }
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
      (tarefa)=>tarefa.id === id
    );
    
    copiaListaTarefas[index].tituloInput = tituloInput;
    copiaListaTarefas[index].categoria = categoria;
    copiaListaTarefas[index].date = date;
    copiaListaTarefas[index].descricao = descricao;

    setListaTarefas(copiaListaTarefas);
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
              <br />
              <input type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
              />
              <br />
              <textarea name="Descricao"
                style={{resize: "none"}}
                id="form-descricao"
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
                ></textarea>
              <br />
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
              <img src="https://img.icons8.com/external-becris-lineal-becris/256/external-edit-mintab-for-ios-becris-lineal-becris.png" alt="editar" width='20px'   onClick={()=>mudaCard(item)}/>
              <img src="https://img.icons8.com/ios/256/delete.png" alt="apagar" width='20px' onClick={()=>{excluirTarefa(item.id)}}/>
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