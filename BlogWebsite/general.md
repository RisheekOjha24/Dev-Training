# To us enotification in angular
we can use  Ngxsweetalter2,ngx-toastr,  Angular Material Snackbar

# Sweetalert2

1. # npm i @sweetalert2/ngx-sweetalert2

2. In style.css or angular.json file import the css for sweetalert2 similar to bootstrap.

# @import "../node_modules/sweetalert2/dist/sweetalert2.min.css";


3. In app.config.ts file
under providers add SweetAlert2Module
=========================
Example
providers: [ SweetAlert2Module,
    provideHttpClient()]

3. In the file you have to use sweetalert notificaiton, fo the filename.ts file and import Swal from  js file of sweetalert2 present in nodemodules directly.

# import Swal from "sweetalert2/dist/sweetalert2.js"

4. Now you can use it on any button click

# An async function in JavaScript (and TypeScript) always returns a Promise by default, If you omit the return statement, the function will still return a Promise that resolves to undefined.

async logout(): Promise<void> {

       const result=await Swal.fire({
        title: 'Are you sure?',
        reverseButtons: true,
        text: 'You will be logged out!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout!',
        cancelButtonText: 'Cancel'
      })

      if(result.isConfirmed){
         localStorage.clear();
         this.router.navigate(['/login']);
      }
    
  }

# date in angualar

 <p class="card-text text-muted">{{ blog.createdAt | date: 'MMM d, y, h:mm a' }}</p>
 
## Explanation of the Format String
MMM: Abbreviated month name (e.g., "Oct").
d: Day of the month.
y: Full year (e.g., "2024").
h:mm: Hour in 12-hour format followed by minutes.
a: AM/PM marker.