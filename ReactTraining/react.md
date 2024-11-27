# Functional Components
Definition: These are JavaScript functions that return JSX to render UI.

## Characteristics:
Simpler and more concise.
Accept props as arguments.
Stateless prior to React 16.8 but can now use hooks (e.g., useState, useEffect) to manage state and lifecycle logic.

<!-- Code -->
function Greeting() {
  const name="Nirakar"
  return <h1>Hello, {name}!</h1>;
}

# Class Component
Definition: ES6 classes that extend React.Component to create a component.
Characteristics:
Support state and lifecycle methods natively.
Can manage more complex logic compared to functional components (prior to hooks).

class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

## state object
 React class components, the state object is used to manage and store the component's dynamic data. Any property of the component that might change over time (due to user interaction, data updates, etc.) should be stored in the state object.
 When you update the state using setState, React automatically re-renders the component to reflect the updated data in the UI.

## setState
How setState Works
React takes the object you pass to setState.
It shallowly merges this object with the current state.
Only the specified properties in the object are updated, and everything else in the state remains unchanged

## componentDidUpdate
The componentDidUpdate method provides both the previous state (prevState) and the current state (this.state). By comparing the two, we can determine whether the state has changed.

## render
It is responsible for describing what the UI should look like based on the component's state and props. This method must return a React element (which is a description of what should appear on the screen) or null. React automatically calls render() when there are changes to the component's state or props, causing the component to re-render and update the UI accordingly.

## ComponentDidMount 
ComponentDidMount is a lifecycle method in React class components. It is invoked immediately after a component is mounted (inserted into the DOM). 

Here’s the entire lifecycle sequence:

## Mounting Phase:

constructor(props)
getDerivedStateFromProps(props, state)
render()
componentDidMount()

## Updating Phase:

getDerivedStateFromProps(props, state)
shouldComponentUpdate(nextProps, nextState)
render()
getSnapshotBeforeUpdate(prevProps, prevState)
componentDidUpdate(prevProps, prevState)

## Unmounting Phase:

componentWillUnmount()


## Pure Components
Pure Components are components that only re-render when their props or state change. They are a type of component that automatically implements a shallow comparison of props and state to optimize performance by avoiding unnecessary renders.

Shallow Comparison:
A shallow comparison means that React compares the props and state by reference (not deeply). If the reference to the object or array changes, it will trigger a re-render. If the reference remains the same, the component will not re-render.

If you need deep comparisons or more complex checks, you might need to override shouldComponentUpdate() manually.

## PropTypes is a type-checking library built into React that helps validate the types of props passed to a component.

const MyComponent = ({ name, age, isAdmin }) => (
  <div>
    <h1>{name}</h1>
    <p>Age: {age}</p>
    <p>Admin: {isAdmin ? 'Yes' : 'No'}</p>
  </div>
);

MyComponent.propTypes = {
  name: PropTypes.string.isRequired, // Required string
  age: PropTypes.number,             // Optional number
  isAdmin: PropTypes.bool            // Optional boolean
};


<!-- If the prop values passed to a React component mismatch the declared PropTypes, React will display a warning in the developer console. However, the application will not crash or throw an error—PropTypes is only used during development for validation and debugging. -->

# Lazy loading
When you load a website or application, you typically load a lot of resources: HTML, CSS, JavaScript, images, fonts, etc. If all these resources are loaded at once, the initial page load can be very slow, especially for users with slower internet connections.

Lazy loading helps by only loading the critical resources (e.g., the content that's visible above the fold or the first part of a page that users see immediately). Other resources, like images, videos, or even additional components, are only loaded when they are needed (e.g., when the user scrolls down to them).


# Higher-Order Components (HOCs)
Definition: A higher-order component is a function that takes a component as input and returns a new component with additional functionality.
Purpose: To share logic or behavior between multiple components.

# Context-API

import React, { createContext, useState } from 'react'
import Child from '../components/Child'
export const GlobalInfo = createContext();

const ContextWork = () => {

  const [color,setColor]=useState("orange");
  const objProvider={bgColor:color};

  return (
    <GlobalInfo.Provider value={objProvider}>
        <div className='flex justify-center flex-col align-bottom p-20'>
         I am a Parent Component
        <Child/>
        </div>
    </GlobalInfo.Provider>
  )
}

export default ContextWork


 <!-- now we use it inside  child component -->
 import React, { useContext } from 'react'
import { GlobalInfo } from '../pages/ContextWork'

const Child = () => {

    const abc= useContext(GlobalInfo);
    const bgColor=abc.bgColor;

  return (
    <div style={{color:bgColor}}>First Child Component</div>
  )
}

export default Child;


# APIKEY
AIzaSyAJIohIOXkz2biPDQDB3jH565w1PLukGwg