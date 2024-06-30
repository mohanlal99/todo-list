import { useEffect, useState } from "react";
import Navbar from "./components/navbar";  // Ensure correct spelling of 'components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [tudos, setTudos] = useState([]);
  const [tudo, setTudo] = useState('');
  const [showfinish, setShowfinish] = useState(true)
const [clicked, setclicked] = useState(false)
const notify = () => toast("Todo Successfull Saved");


  const savetoL = (e) => {
    if(tudos.length > 0){
      localStorage.setItem("Tudos",JSON.stringify(tudos))
      

    }
  }

  useEffect(() => {
    const storedData = localStorage.getItem("Tudos");
    if (storedData) {
      setTudos(JSON.parse(storedData));
    }
  }, []); 


  useEffect(() => {
    savetoL();
  }, [tudos])
  
  

  const handlsave = (e) => {
    setclicked(true)
    setTimeout(() => {
      setclicked(false)
    }, 500);
    if (tudo.trim() !== '') {
      const newTask = {
        id: tudos.length + 1,
        text: tudo,
        isCompleted: false
      };
      setTudos([...tudos, newTask]);
      setTudo("");
      notify();
      savetoL()

    }

  };

  const handlchange = (e) => {
    setTudo(e.target.value);
  };

  const handlecheckbox = (id) => {
    return () => {
      const nt = tudos.map(item => {
        if (item.id === id) {
          return { ...item, isCompleted: !item.isCompleted };
        }
        return item;
      });
      setTudos(nt); // Reactivate state update
      savetoL()
    };
  };


  const handleEdit = (id) => {
    const itemToEdit = tudos.find(item => item.id === id);
    if (itemToEdit) {
      setTudo(itemToEdit.text);
      setTudos(prevTudos => prevTudos.filter(item => item.id !== id));
      
    }
    // Again, savetoL will be called due to useEffect after state update
  };
  

  // const handleEdit = (id) => {
  //   tudos.filter(item =>{
  //     if(item.id == id){
  //       setTudo(item.text)
  //     }
  //     tudo.autoFocus
  //     setTudos(tudos.filter(item => item.id !== id));
  //   })
    
  // }
  const handleDelete = (id) => { 
    let a = confirm("Are you sure to delete this tudo")
    if(tudos.length < 2){
      localStorage.removeItem("Tudos");

    }
    if(a){
      setTudos(tudos.filter(item => item.id !== id));
      toast("Deleted Success!")
      savetoL()
    }
  }
  
const showfinished = ()=>{
  // setShowfinish(showfinish ? false:true)

  setShowfinish(!showfinish)
  // if (showfinish){
  //   setShowfinish(false)
  // }
  // else{
  //   setShowfinish(true)
  // }
}




  return (
    <>
      <div className="container md:w-1/2 m-auto">
        <div className="maincontent overflow-auto m-auto  min-h-screen bg-gray-800">
        <Navbar />
          <div className="heading text-center font-bold text-md p-2">
            iTask - Manage Your Todos at one place
          </div>
          <div className="input p-5">
          <div><h2 className="text-xl">Create Your Task ! </h2></div>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 p-4">
  <input
    className="font-bold rounded-md w-full p-2 ps-6 capitalize text-black outline-none"
    type="text"
    autoFocus
    value={tudo}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        handlsave(e);
      }
    }}
    onChange={handlchange}
  />
  <button
    className="bg-gray-200  text-black hover:bg-slate-300 font-bold p-2 rounded-md px-6"
    onClick={handlsave}
  >
    Save
  </button>
</div>


            <div className="finish py-5 flex gap-3 items-center border border-b-black border-x-0 border-t-0">
              <input
                className="text-green-600"
                type="checkbox"
                onChange={showfinished}
                checked={!showfinish}
                name=""
                id="show"
              />
              <label htmlFor="show" className="font-bold">Show Finished</label>
            </div>
          </div>
          <div className="tasks">
            {tudos.length === 0 && <div className="m-5">Add Tudos and display</div>}
            {tudos.map((item) => {
              return (!showfinish || !item.isCompleted) && <div key={item.id} className="task flex gap-2 justify-between p-3 m-2 bg-gray-900">
                <div className="inputt flex gap-2 items-center">
                  <input
                    onChange={handlecheckbox(item.id)}
                    checked={item.isCompleted}
                    type="checkbox"
                    id={`checkbox-${item.id}`} // Unique ID for each checkbox
                  />
                  <label
                    htmlFor={`checkbox-${item.id}`} // Correctly link the label
                    className={item.isCompleted ? "line-through" : ""}
                  >
                    {item.text}
                  </label>
                </div>
                <div className="buttons flex gap-3 text-xl">
                  <i onClick={(e)=>handleEdit(item.id)} className="cursor-pointer hover:scale-125 hover:text-green-600 fa-regular fa-pen-to-square"></i>
                  <i onClick={(e)=>handleDelete(item.id)} className="cursor-pointer hover:scale-125 hover:text-green-600 fa-solid fa-trash"></i>
                </div>
              </div>
})}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}




// function App (){
//   const [text, settext] = useState('Mohanlal')
//   const handlchange = (e)=>{
//     settext(e.target.value)
//   }
//   return (
//     <div>
//       <div className="container mx-auto m-5">
//       <input value={text} onChange={handlchange} className="w-1/2 bg-white border border-red-500 rounded-full text-black"  type="text" name="" id="" />
//       <div>Your text is {text}</div>
//       </div>
//     </div>
//   )
// }



export default App;
