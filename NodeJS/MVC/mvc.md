# MVC (Model-View-Controller)
MVC is a pattern in software design used to separate concerns in application development, enhancing maintainability, scalability, and testability by clearly defining the roles of data (Model), user interface (View), and application logic (Controller). It emphasizes a separation between the software's business logic and display.

 Some other design patterns are based on MVC, such as MVVM (Model-View-Viewmodel), MVP (Model-View-Presenter), and MVW (Model-View-Whatever).

## Model View Controller example
Imagine a simple shopping list app. All we want is a list of the name, quantity and price of each item we need to buy this week. Below we'll describe how we could implement some of this functionality using MVC.

### The Model
The model defines what data the app should contain. 
If the state of this data changes, then the model will usually notify the view (so the display can change as needed) and sometimes the controller (if different logic is needed to control the updated view).

Going back to our shopping list app, the model would specify what data the list items should contain — item, price, etc. — and what list items are already present.

### The View
The view defines how the app's data should be displayed.

In our shopping list app, the view would define how the list is presented to the user, and receive the data to display from the model.

### The Controller
The controller contains logic that updates the model and/or view in response to input from the users of the app.

So for example, our shopping list could have input forms and buttons that allow us to add or delete items. These actions require the model to be updated, so the input is sent to the controller, which then manipulates the model as appropriate, which then sends updated data to the view.

You might however also want to just update the view to display the data in a different format, e.g., change the item order to alphabetical, or lowest to highest price. In this case the controller could handle this directly without needing to update the model.

## Summary
View: The view defines how the app's data should be displayed. It Captures user interaction (button click).

Controller: Processes the incoming request,, calls the model to modify data and It sends a response back to the client, indicating success or failure..

Model: Manages data operations with the database (adding items to the cart).

## In MERN Stack
Frontend (React):

View: React components for rendering the UI.

Controller: Components managing user interactions and calling APIs.

Backend (Node.js/Express):

Model: Code interacting with MongoDB for data operations.
Controller: Express routes handling incoming requests and coordinating between the model and the view.