# Pipes
Pipes are simple functions that take in data, transform it, and then return the transformed data to the view. 

FormsModule=> ngModel
{ CommonModule, NgFor,NgIf } from '@angular/common';

# *ngIf is used to display or hide elements based on a condition. If the condition evaluates to true, the element is rendered; if false, it is removed from the DOM.\

[class.selected]="selectedHero && selectedHero.id==eachhero.id" ==> it will add the class name selected if condition is true.

# Directives
directive is a special marker on a DOM element (such as an attribute, element name, or class) that tells Angular to do something with that element or its children. Directives extend the HTML's capabilities by adding behavior and logic to DOM elements.

# this.activatedRoute.params.subscribe((res: any) => { ... });:
params: This is an observable that emits the route parameters whenever they change (such as when navigating to a route with dynamic parameters).

# *ngIf="eventData$ | async as EventData":

The *ngIf directive conditionally renders the div only if eventData$ emits a value.
The async pipe extracts the emitted value from the observable and assigns it to the EventData variable.