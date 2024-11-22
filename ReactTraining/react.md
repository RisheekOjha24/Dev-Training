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


## Sequence
update Lifecycle Sequence

1) shouldComponentUpdate(nextProps, nextState)
Called before rendering to determine if the component should update or not.
If it returns false, the rendering process (including render() and componentDidUpdate()) is skipped.

2) render()
If shouldComponentUpdate() returns true, the component proceeds to re-render.
componentDidUpdate(prevProps, prevState)

3) componentDidUpdate(prevprops,prevState)
Called after the component has updated in the DOM. This is where you can perform side effects based on the update, such as fetching new data or working with DOM elements.

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