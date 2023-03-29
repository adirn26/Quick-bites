# Quick-bites
This is a web application built with React for the frontend and Django for the backend that helps manage orders in a college canteen. It has both an admin dashboard and a user interface that allows users to place orders and administrators to manage the orders.

## Getting Started
### Prerequisites
- Node.js and NPM installed on your system
- Python 3.x and pip installed on your system
- Django 3.x and Django Rest Framework installed on your system

## Installation
1. Clone the repository
```
git clone https://github.com/<username>/college-canteen.git
```
2. Install the dependencies
```
cd college-canteen
npm install
```
3. Start the React development server
```
npm start
```
4. Start the Django development server
```
cd backend
python manage.py runserver
```
## Usage
### Admin Dashboard  
To access the admin dashboard, go to http://localhost:3000/admin in your browser. You will be prompted to log in with your admin credentials.  

From the admin dashboard, you can manage the orders placed by users. You can view the list of orders, update the status of orders, and delete orders.

### User Interface  
To access the user interface, go to http://localhost:3000 in your browser. From here, users can view the menu, select items to order, and place their order. Users will receive a confirmation message once their order has been placed.

### Authentication   
The admin dashboard requires authentication to access. To create a new admin user, run the following command:

```
python manage.py createsuperuser
````
