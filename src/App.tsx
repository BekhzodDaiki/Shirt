import './App.css';
import Editor from './Editor';
import Konva from './Konva';
import Selected from './Selected';
import Sidebar from './Sidebar';

const App = () => {
  return (
    <div className="container">
      {/* <Sidebar /> */}
      {/* <Editor /> */}
      <Konva />
      {/* <Selected /> */}
    </div>
  );
};

export default App;

// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "./store";
// import { increment, decrement, changeIncrementAmount, } from "./store/counterReducer";

// function App() {
//   const count = useSelector((state: RootState) => state.counter.value);
//   const dispatch = useDispatch();

//   const incrementAmount = useSelector(
//     (state: RootState) => state.counter.incrementAmount
//   );

//   function handleChange(incrementAmountValue: string) {
//     dispatch(changeIncrementAmount(Number(incrementAmountValue)));
//   }

//   return (
    
//        Counter 
      
//          dispatch(decrement())}>
//           -
        
//         {count}
//          dispatch(increment())}>
//           +
        
      
//       Change Increment Amount
//        handleChange(e.target.value)}
//       />
    
//   );
// }

// export default App;