import { useState } from "react";
//import {format} from 'date-fns'
import "./styles.css";

function App(){

  const [count, setCount] = useState(0);
  
  const [tituloInput, setTituloInput] = useState("");
  const [categoria, setCategoria] = useState("");
  const [date, setDate] = useState("");
  const [descricao, setDescricao] = useState("");

  const [listaTarefas, setListaTarefas] = useState([]);

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

  return(
    <div id='main'>
      <div id="formulario">
        <div id="formulario-dentro">
        <h1>Cadastrar Tarefa</h1>
      <form>
        <input type="text" 
        value={tituloInput}
        onChange={(event) => setTituloInput(event.target.value)}
        />

        <select
          value={categoria}
          onChange={(event) => setCategoria(event.target.value)}
        >
          <option value="" >Categoria</option>
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
        <textarea name="Descricao" cols="30" rows="10" 
        value={descricao}
        onChange={(event) => setDescricao(event.target.value)}
        ></textarea>
        <br />
        <input type="submit" onClick={adicionaTarefas} value="Salvar" />
      </form>
        </div>      
      </div>
      <div id="lista">
      <h1 className="tarefas">Minhas tarefas</h1>
      <h3 id="contador-tarefas">Total: {count} tarefas</h3>
      {listaTarefas.length > 0 ? (
        <ul>
        {listaTarefas.map((item)=>(
          <>
            <li key={item.id}>
            </li><p>{item.tituloInput}</p>
            <p>{item.categoria}</p>
            <p>{item.date}</p>
            <p>{item.descricao}</p>
            <img src="https://img.icons8.com/external-becris-lineal-becris/256/external-edit-mintab-for-ios-becris-lineal-becris.png" alt="editar" width='20px' />
            <img src="https://img.icons8.com/ios/256/delete.png" alt="apagar" width='20px'/>
          </>
        ))}
        </ul>
      ):(
        <p>Parabéns! Concluiu todas suas tarefas!</p>
      )}
      </div>
    </div>
  )

  
}

export default App;