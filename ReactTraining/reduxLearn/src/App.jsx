import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { inc, dec, chgText } from '../redux/slice/counterSlice';

const App = () => {
  const count = useSelector((state) => state.counterSlice.counterVal);
  const text = useSelector((state) => state.counterSlice.text);

  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleInputBtnClick = () => {
    const inputVal = inputRef.current.value; 
    dispatch(chgText(inputVal));
    inputRef.current.value = '';
  };

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => dispatch(inc())}>+</button>
      <button onClick={() => dispatch(dec())}>-</button>
      <input type="text" ref={inputRef} />
      <button onClick={handleInputBtnClick}>Change Text</button>
      <h2>{text}</h2>
    </>
  );
}

export default App;
