# Angular
Angular is a popular web development framework used to build dynamic web applications.It uses components (small, reusable pieces of code) to create the user interface.

It’s built using TypeScript, a superset ofsud JavaScript, which adds type safety and better tooling.

It is developed and maintained by google, intial release: 14 September 2016

# Framework
A framework is like a platform for developing single page web application.
Frameworks provide a set of tools and elements that help in the speedy development process. It acts like a template that can be used and even modified to meet the project requirements.

# To install angualar
sudo npm install -g @angular/cli@latest


# To check the version of angular
ng --version

# To create a new project in angular
ng new project-name

# Run the Development Server:
ng server
This will compile and run the Angular app locally.

# .editorconfig file
An .editorconfig file, which is used to define and maintain consis


# Decorator
decorator provides information about the class component, component is combination of thee files html,css and ts file.

# A One-Way Data Binding
One-way data binding in Angular means that the data flows in a single direction, from the component (the TypeScript/logic) to the view (HTML/template).
This type of binding ensures that changes in the component's data are reflected in the view, but changes in the view do not directly affect the component's data.

# A1. Interpolation {{}}
In interpolation ({{ expression }}), when a property in the component(ts file) changes, the updated value is automatically reflected in the HTML view.

# A2. Property Binding
     <input [value]="username"></input>

     <img [src]="imageUrl" alt="Sample Image">

     In property binding, the property inside the square brackets is the HTML element's property (like src, href, disabled,value etc.).

     The expression is evaluated in the component and its value is assigned to the property.

# A3. Event Binding
     <button (click)="handleClick()">Click me</button>

# B. Two-Way Data Binding

# B1. Using ngModel
To use ngModel you have to import FormsModule

ngModel is designed for form elements like <input>, <textarea> and <select>, which can capture user input, you cannot use it with <h1> tag etc.

# How [(ngModel)] Works ?

Two-Way Binding: When you use [(ngModel)]="currDate", Angular automatically sets up two bindings:

Property Binding: It binds the value of the input field to the currDate property in the component. This means that when the component is initialized, the input's value will be set to the current value of currDate.

Event Binding: It listens for changes in the input field. When a user types into the input, Angular captures the change event and updates the currDate property in the component.

# Fun Fact: The [(ngModel)] syntax is known as banana in a box syntax in Angular, and it represents a combination of two-way data binding. Square Brackets [ ] - Property Binding and Parentheses ( ) - Event Binding.

# Directive
 Structural, Attribute

<!-- Module -->
 Strutural ==> ngIf, ngFor
 Attribute ==> ngClass, ngStyle

===================================================================================================================================

# importing Commmon Module
To use features provided by Angular's common utilities, such as *ngIf, *ngFor, pipes, and more, you need to import the CommonModule

# TO use http service in application

<!-- HttpClient methods like post(), get(), etc., return cold Observables, meaning they won't send the request until they are subscribed to. -->

## 1. to use HttpClientService we have to add  provideHttpClient() method in the providers array of app.config.ts file.
provideHttpClient() tells Angular's dependency injection system to make the HttpClient service available throughout your application. This allows you to inject it into components and services to perform HTTP requests.

## 2. import { HttpClient } from '@angular/common/http'; 
import HttpClient in the file you want to send request.
Now you gain access to the HttpClient class itself, allowing you to create an instance of it via dependency injection.

## 3.  http=inject(HttpClient);
now we can use http services like get,post,etc.

## 4. ng OnInit ==> similar to useEffect of React
  ngOnInit(): void {
    this.getAllRoles();
  }

ngOnInit is called after the constructor and after Angular has finished initializing the component’s input properties.

## 5. To send a request we create a function

<!-- get request -->
getAllRoles(){
    this.http.get("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles").
    subscribe((res:any)=>{
      console.log(res);
      this.roleList=res.data;
    })
  }

<!-- post request  -->
addUpdate(obj:Client):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(environment.API_URL+"AddUpdateClient",obj);
  }
  
we send request using http.get and to catch the data returned by the api we use subscribe,
subscribe has a callback whose parameter res(can give any name) will contain the data,

# *ngFor
*ngFor is used for one-way binding to display data.
*ngFor is a structural directive in Angular that allows you to loop through an array (or iterable) and generate HTML for each item in that array.

  <li *ngFor="let item of roleList">
      <h2>{{item.role}}</h2> 
  </li>

=> Each <li> will be created for every element in the roleList array.
we can use *ngFor with any html tag,


# Using *ngIf with *ngFor using conditional rendering
<li *ngFor="let item of roleList" *ngIf="item.isActive">
        {{ item.role }}
</li>
We can also use *ngIf within *ngFor to conditionally display items based on certain criteria.


# Any function which is returning observable type of data we can subscribe that.

# Using interface with http.get<>

<!-- Below ApiResponse is a user defined interface which contains type of data we are getting. -->
1. When you use <ApiResponse> with this.http.get<ApiResponse>(), you are asserting that the API response will match the structure defined in the ApiResponse interface.

<!-- Example -->
this.http.get<ApiResponse>("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles")
.subscribe((res: ApiResponse) => {
    console.log(res); // TypeScript knows res is of type ApiResponse
});

2. If you omit the type (just use this.http.get()), TypeScript treats the response as any, meaning you lose the benefits of type checking.

<!-- Example -->
this.http.get("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles")
.subscribe((res:any) => {
    console.log(res); // TypeScript treats res as any
});

# old subscribe
Handling success and error

observable.subscribe(
  (response) => {
    // Handle successful response
  },
  (error) => {
    // Handle error response
  }
);

# new subscribe
observable.subscribe({
  next: (response) => {
    // Handle successful response
  },
  error: (error) => {
    // Handle error response
  },
  complete: () => {
    // Optional: Handle when observable completes
  }
});

<!-- next: Runs whenever a value is emitted (success case).
error: Runs if an error occurs, and no further emissions will happen.
complete: Runs when the observable finishes emitting values without errors. -->

# Module, Component, Directive and DirectiveModules:

## Module
Definition: Modules in Angular are containers for a block of related code. They organize an application into cohesive chunks.

## Component
Components are the building blocks of an Angular application. Each component controls a part of the user interface (UI).
Purpose: A component combines logic (TypeScript class), a template (HTML view), and styles (CSS) to create a UI element.

## Directive
Directives in Angular allows you to extend HTML elements by adding behavior or modifying the DOM dynamically.

Attribute Directives: These change the appearance or behavior of an element, component, or other directives (e.g., ngClass, ngStyle).
Structural Directives: These change the DOM structure by adding or removing elements (e.g., *ngIf, *ngFor, *ngSwitch).

## Decorator
 Decorators are functions that add metadata to classes, properties, methods, or parameters. They tell Angular how to process and use the items.
 @Component,@Injectable,etc.



# Modern Control flow statement from Angular 17

## @if
@if (a > b) {
  {{a}} is greater than {{b}}

} @else if (b > a) {

  {{a}} is less than {{b}}

} @else {

  {{a}} is equal to {{b}}

}

## @for
@for (item of items; track item.id; let idx = $index) {
  Item:{{ idx }} = {{ item.name }}
}
@empty {
  <li>There are no items.</li>
}
if array items is empty, it will display "There are no items."

<!-- track in @for -->
 When you specify a track expression, Angular can determine which items in the list have changed (added, removed, or reordered). This allows Angular to perform minimal DOM updates, enhancing performance.

@for (item of items; track item.id) {
  <li>{{ item.name }}</li>
}
track item.id tells Angular to use the id property of each item to track its identity in the DOM.

## @switch
@switch (condition) {
  @case (caseA) {
    Case A.
  }
  @case (caseB) {
    Case B.
  }
  @default {
    Default case.
  }
}

# Routes

In the app.routes.ts file , make an object inside Routes array and define the props like path,component,etc.

export const routes: Routes = [
    {
        path:"",
        redirectTo:"master",
        pathMatch:"full"
    },
    {
        path:"master",
        component:MasterComponent
    },
]

<!-- In Angular's routing configuration, paths should #not# have a leading slash -->

1. path: An empty string "" indicates the base URL of the application (e.g., http://localhost:4200/).

2. redirectTo: If the base URL is accessed, the user will be redirected to the "master" path.

3. pathMatch: The "full" option means that the entire URL must match the empty string for the redirect to occur. This is important to ensure that only the base URL triggers the redirect, not any sub-paths.

4. component: Specifies the component that should be displayed when the route is activated.

writing nested Routes
{
    path: "master",
    component: MasterComponent,
    children: [
        { path: "details", component: MasterDetailsComponent }
    ]
}

In this case, accessing /master/details would display the MasterDetailsComponent.

# <router-outlet/>
Now to render the component associated with the specific route you have to place
<router-outlet/> in the app component.

Purpose: It is used to display the components associated with the currently active route. 
When the URL changes and a route is matched, the associated component is rendered in the <router-outlet/>.


# RouterLink for naviagting to differnt routes
RouterLink is a directive in Angular that allows you to navigate between different routes in your application
First, you need to import the RouterModule and place it inside the imports array of @Component decorator.

Now you can use routerlink
<nav>
  <ul>
    <li><a routerLink="/">Home</a></li>
    <li><a routerLink="/about">About</a></li>
  </ul>
</nav>


Alternatively, you can use property binding with [routerLink] when you are using varibales in the ts file.
<nav>
  <ul>
    <li><a [routerLink]="routerPath">Home</a></li>
  </ul>
</nav>

# To get current URL of web page

1. import { Router } from '@angular/router';

2. router=inject(Router);

3. const currentUrl = this.router.url;

currentUrl will not contain th domain address.It will only give you the path part of the URL.

For exact location, one can use ==> window.location.href

# Apply custom class when condition is true.

<a class="nav-link" [class.my-custom-class]="someCondition">Link</a>
Here, the my-custom-class will be applied if someCondition is true.

# Apply a custom class to link which is activated
<a routerLink="/home" routerLinkActive="custom-active-class">Home</a>
the custom-active-class will be applied to the anchor tag when the /home route is active.


# Using Enviroment Variables
"ng g environments" this will create an enviroments folder with two files environment.ts and 
enviroment.development.ts

inside environment.ts file, we will write a demo url

export const environment = {
    API_URL:'https://freeapi.miniprojectideas.com/api/ClientStrive/'
};

## Now below is the way how you are going to use it
  
  getAllClients():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(environment.API_URL+"GetAllClients");
  }



# Template Driven Forms

## 1. import formsModule

if ngModel is used in inside the form tag then name attribute must be set.

<form #formRef="ngForm" (ngSubmit)="onSubmit(formRef)">
  <input type="text" [(ngModel)]="user.name" name="name" required />
  <input type="email" [(ngModel)]="user.email" name="email" required />
  <button type="submit" [disabled]="formRef.invalid">Submit</button>
</form>

## 2. Reactive Forms

## In the ts file
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.css'
})
export class ReactiveComponent {

  studentForm:FormGroup = new FormGroup({
      firstName:new FormControl(),
      lastName:new FormControl(),
      userName:new FormControl(),
      city:new FormControl(),
      state:new FormControl(),
      zipCode:new FormControl(),
      isAcceptTerms:new FormControl()
  });
}


## In the HTML file
we use property binding to specify which form we are binding.
 <form [formGroup]="studentForm"  >

In input we specify the the object properties
<input type="text" class="form-control" formControlName="firstName" required="">

# Observable
Observables are cold by default, meaning they create a new execution context for each subscriber.
When you subscribe to an Observable, it starts emitting data just for that subscriber. Each subscription gets its own set of emitted values.
This is why you can subscribe after the data is defined, and it will still emit values to the subscriber.

<!-- Example -->
const observable = new Observable(observer => {
  console.log('Observable started');
  observer.next(Math.random()); //emits a value.
});

observable.subscribe(val => console.log('Subscriber 1:', val));
observable.subscribe(val => console.log('Subscriber 2:', val));


Each subscription starts a new execution, so each will get different values.Each time observer.next() is executed it will emit a value. 

# Subject
Subjects are hot by default, meaning they share the same execution context for all subscribers.
A Subject acts like both an Observable and an Observer.

When you emit a value using subject.next(), it pushes that value to all subscribers that are currently subscribed.

With Subjects, if you emit a value before subscribing, any new subscribers won’t be able to access the already emitted values because Subjects do not store previous values (unlike ReplaySubject or BehaviorSubject, which store and replay values for late subscribers).

A Subject doesn't "execute" when a subscriber subscribes.
Execution happens when subject.next() is called.

<!-- Example -->
const subject = new Subject();

// Subscribe BEFORE emitting values
subject.subscribe(val => console.log('Subscriber 1:', val));
subject.subscribe(val => console.log('Subscriber 2:', val));

// Emit a value
subject.next(Math.random());

# to convert an observable to subject

const subject = new Subject();

const data=ajax('https://demo4609591.mockable.io/GetAllClients');

<!-- data is an observable -->

subject.subscribe(d=> console.log(d));
subject.subscribe(d=> console.log(d));

data.subscribe(d=>console.log(d));
data.subscribe(d=>console.log(d));
data.subscribe(subject);


# Behaviour Subject
Just like subject, Behaviour Subject will execute once when it emits a value. The result of this single execution is then sent to all subscribers.

## How Behaviour Subject different than Subject ?
Behaviour Subject holds the initial value or the last emitted value.
A new subscriber will receive the most recent value, even if the subscribe after the value was emitted.

<!-- Create a BehaviorSubject with an initial value -->
    const bsubject = new BehaviorSubject<number>(10);

<!-- Subscribe to the BehaviorSubject, it will emit the initialize value -->
    bsubject.subscribe(d=>console.log("Behaviour Subject 1 = ",d));
    bsubject.subscribe(d=>console.log("Behaviour Subject 2 = ",d));
    
    
<!-- Emit a new value -->
    bsubject.next(1010);

<!-- receive the last emiited value  -->
    bsubject.subscribe(d=>console.log("Behaviour Subject 3 = ",d));


## Replay Subject
Unlike a Subject or BehaviorSubject, which either doesn't store values or only keeps the latest one, 
a ReplaySubject can store a specific number of past emissions and "replay" them to any future subscribers.

You can specify how many past values to store when creating the ReplaySubject.

<!-- Example -->
const message$= new ReplaySubject(1);
message$.next('Hello..');
message$.next(10);
      
message$.subscribe((d)=>console.log(d));
<!-- It wil receive Hello.. and 10 -->

message$.subscribe((d)=>console.log(d));
<!-- It will also receive Hello.. and 10 -->

message$.next(100);
<!-- now the above subscriber will only print 100 -->

## Working
Replay for New Subscribers: New subscribers receive all previously emitted values when they subscribe.
Already Received Values: Existing subscribers do not receive the values again that as they have already recieved that value, when you emit a new value they will receive that new value.

Behavior of ReplaySubject:

When you emit a value using next(), that value is stored in the ReplaySubject.
Subscribers:
When a new subscriber subscribes, ReplaySubject will replay all previously emitted values that are still stored.Each subscriber receives the stored values in the order they were emitted.


## We can also specify the buffer size of Replay Subject
const message$ = new ReplaySubject(2); // Buffer size of 2
Buffer size is two means last two emiited values will be stored and emitted to the new subscriber.

// Emit values
message$.next('First message');      // Stored
message$.next('Second message');     // Stored
message$.next('Third message');      // Stored (overwrites 'First message')

// First subscriber
message$.subscribe(d => console.log('Subscriber 1:', d)); 
// This subscriber will get 'Second message' and 'Third message'

# Async Subject
An AsyncSubject in RxJS is a type of subject that only emits the last value it receives to its subscribers once the subject is completed.
It is useful in scenarios where you only care about the final result of an operation that might take some time.

<!-- Exmaple -->
const asyncSubject$ = new AsyncSubject();

<!-- Emitting values -->
asyncSubject$.next("Value 1"); // Not emitted yet
asyncSubject$.next("Value 2"); // Not emitted yet
asyncSubject$.next("Value 3"); // Not emitted yet

// First subscriber
asyncSubject$.subscribe((data) => console.log(data));

<!-- Completing the subject -->
asyncSubject$.complete(); // Emits 'Value 3' to the first subscriber

asyncSubject$.next("Value 4"); // does not matter as we have already called the compete function and now it will emit only value 3.
<!-- Second subscriber -->
asyncSubject$.subscribe((data) => console.log(data)); // receive only value 3.

<!-- asyncSubject$.complete(); is called to signal that no more values will be emitted. At this moment, the AsyncSubject emits the last value that was emitted before completion, which is "Value 3". -->



# @ViewChild
@ViewChild is a decorator in Angular that allows you to access the template of same component or of its child component.

1. Import @ViewChild
import { Component, ViewChild, ElementRef } from '@angular/core';


Let this is your template to be rendered : <h2 #header>Header Text</h2>
here #header is the refernce variable.
<!-- Syntax -->
@ViewChild('header') headerElement!: ElementRef;

<!-- Explanation -->
@ViewChild('header'): This tells Angular to look for an element in the template with the reference #header
The headerElement is a variable that will hold a reference to that element.

<!-- Example -->

export class HomeComponent implements OnInit,AfterViewInit{

    @ViewChild("secondHead")marker!:ElementRef;

    ngOnIt():void{

    }

    ngAfterViewInit(): void {
        this.marker.nativeElement.style.color='red';
    }

}


<!-- Important Points  -->
When you use @ViewChild with a template reference variable, it will only reference the first occurrence of that variable in the template. If there are multiple elements with the same reference variable, only the first one will be accessed.

The exclamation mark (!) you see after marker in  in the context of TypeScript and Angular is known as the non-null assertion operator. It's used to inform the TypeScript compiler that a variable (in this case, marker) is guaranteed to be defined at that point in the code,

# ngAfterViewInit 
ngAis one of Angular's lifecycle hooks. It is called after Angular has fully initialized a component's view, which includes any child components, directives, and DOM elements.

import { AfterViewInit, OnInit } from '@angular/core';

export class ExampleComponent implements OnInit, AfterViewInit {
  
  @ViewChild('header') header!: ElementRef;

  ngOnInit() {
    console.log("ngOnInit: ", this.header); // This will log `undefined`
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit: ", this.header.nativeElement.innerText); // This will log "Header"
  }
}


# @ViewChildren()
Unlike @ViewChild, which only retrieves the first matching element, @ViewChildren retrieves all instances that match the provided selector.
The result is a QueryList, which is an iterable collection of the matched elements.

<!-- Syntax -->
  @ViewChildren('header') headers!: QueryList<ElementRef>;

    ngAfterViewInit(): void {
      
        this.marker2.forEach((header) => {
          header.nativeElement.style.color='green'; //will set green color to all matching selector tags
        });
    }
