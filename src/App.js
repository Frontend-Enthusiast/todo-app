import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import "./App.css";
import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import CreateTodo from "./Components/CreateTodo";

function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  useEffect(()=>{
    const dataRef = query(collection(db,"Todo"),orderBy("timestamp","asc"));
    onSnapshot(dataRef,(snapshot)=>{
      setTodo(snapshot.docs.map(doc=>({text: doc.data().text, id:doc.id})));
    })
  },[])
  const handleClick = async(event) => {
    event.preventDefault();
    const todoRef = collection(db,"Todo");
    await addDoc(todoRef,{
      text:input,
      timestamp:serverTimestamp()
    },orderBy('timestamp','desc'));
    setInput("");
  };
  return (
    <div className="App">
      <form>
        <FormControl>
          <InputLabel>👇 Todo</InputLabel>
          <Input
            id="my-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <Button variant="contained" type="submit" onClick={handleClick}>
          Add Todo
        </Button>
      </form>
      {todo.map((item, i) => (
        <CreateTodo key={i} listItem={item}/>
      ))}
    </div>
  );
}

export default App;
