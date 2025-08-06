import { useState, useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import ProductListings from './pages/ProductListings/ProductListings';
import Header from './components/Header/Header';
import About from './components/About/About';
import Spinner from './components/Spinner/Spinner';
import ProductDetails from './pages/ProductDetails/ProductDetails';

function App() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [cart, setCart] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);

  // const param = useParams();
  // const id = param.id;

  // Toast configuration
  const showToast = (type, message) => {
    if (type === "success") {
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    } else if (type === "error") {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
  };

  // Fetching the products
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();

    return data;
  };

  // Fetch product
  const fetchProduct = async (id) => {
    const res = await fetch(`http://localhost:3001/products/${id}`);
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsFromServer = await fetchProducts();
        setProducts(productsFromServer);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setLoading(false);
        showToast("error", "Failed to fetch products");
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={ <ProductListings products={products} /> } />
        <Route path="/products/:id" element={ <ProductDetails /> } />
        <Route path="/about" element={ <About /> } />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App;


// import "./App.css";
// import Header from "./components/Header";
// import Tasks from "./components/Tasks";
// import { useState, useEffect } from "react";
// import AddTask from "./components/AddTask";
// import Footer from "./components/Footer";
// import About from "./components/About";
// import UState from "./components/topics/UState";
// import TaskDetails from "./components/TaskDetails";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// function App() {
//   const [tasks, setTasks] = useState([]);

//   const [showAddTask, setShowAddTask] = useState(false);

//   useEffect(() => {
//     const getTasks = async () => {
//       const tasksFromServer = await fetchTasks();
//       setTasks(tasksFromServer);
//     };

//     getTasks();
//   }, []);

//   // Fetching the tasks
//   const fetchTasks = async () => {
//     const res = await fetch("http://localhost:5000/tasks");

//     const data = await res.json();

//     return data;
//   };

//   // Fetch the task
//   const fetchTask = async (id) => {
//     const res = await fetch(`http://localhost:5000/tasks/${id}`);

//     const data = await res.json();
//     return data;
//   };

//   // Delete a task

//   const deleteTask = async (id) => {
//     // go and use the setTasks and remove the task with passed id and show rest of them
//     // filter( )
//     await fetch(`http://localhost:5000/tasks/${id}`, {
//       method: "DELETE",
//     });

//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   // Toggle reminder

//   const toggleReminder = async (id) => {
//     const taskToToggle = await fetchTask(id);
//     const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

//     const res = await fetch(`http://localhost:5000/tasks/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(updTask),
//     });

//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, reminder: !task.reminder } : task
//       )
//     );
//   };

//   // To add a new task

//   const addTask = async (task) => {
//     //  produce and id..
//     // const id = Math.floor(Math.random() * 1000) + 1;
//     // let id = tasks.length + 1;
//     const res = await fetch("http://localhost:5000/tasks", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(task),
//     });

//     const data = await res.json();

//     // const newTask = { id, ...task };

//     setTasks([...tasks, data]);
//   };
//   return (
//     <Router>
//       <div className="container">
//         <Header
//           title="Task Tracker"
//           onAdd={() => setShowAddTask(!showAddTask)}
//           showAdd={showAddTask}
//         />

//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 {showAddTask && <AddTask onAdd={addTask} />}
//                 {tasks.length > 0 ? (
//                   <Tasks
//                     tasks={tasks}
//                     onDelete={deleteTask}
//                     onToggle={toggleReminder}
//                   />
//                 ) : (
//                   "No tasks to display"
//                 )}
//               </>
//             }
//           />
//           <Route path="/about" element={<About />} />
//           <Route path="/topics" element={<UState />} />

//           <Route path="/task/:id" element={<TaskDetails />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;
