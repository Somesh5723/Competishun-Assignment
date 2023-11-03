//Defines UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clrBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const oldHead = document.querySelector('#task-title');
const headParent = document.querySelector('.card-action')


//Fake Trial Database
const dataBase = [
        {
        username: "Somesh",
        password: "2001"
        }
];

    

    function isUserValid(username, password)
    {
        if(dataBase[0].username === username && 
                dataBase[0].password === password) {
                    return true;
                }
            return false;
    }
        
     /*can add more user data to databse and use the following syntax to validate it!
            function isUserValid(username, password){
                for( let i=0; i<dataBase.length; i++){
                    if(dataBase[i].username === username && 
                        dataBase[i].password === password) {
                            return true;
                            
                        }
                
                    }
                    return false;
                }
    */            

        


    function signIn(username, password) 
    {
        if (isUserValid(username , password)) {
        alert('you are welcome!')
        
        
        loadEventlistener();

        //Load all Event listeners
        function loadEventlistener()
        {
            //DOM Load event
            document.addEventListener('DOMContentLoaded', getTasks);
            //add task
            form.addEventListener('submit', addTask);
            //remove task
            taskList.addEventListener('click', removeTask);
            //clear task fast
            clrBtn.addEventListener('click', clearTaskFast);
            //Filter Tasks
            filter.addEventListener('keyup', filterTasks);
            
        }


        //Get tasks from Local Storage 
        function getTasks()
        {
            let tasks;
            if(localStorage.getItem('tasks')===null) {
                tasks = [];
            
            } else {
                tasks = JSON.parse(localStorage.getItem('tasks'));
            }

            tasks.forEach(function(task) {
                //Create li element
                const li = document.createElement('li');
                //Add Clas
                li.className = 'collection-item';
                //Create a textNode and append it to li
                li.appendChild(document.createTextNode(task));
                //Create new link element
                const link = document.createElement('a');
                //Adding a class
                link.className = 'delete-item secondary-content';
                //Add icon html
                link.innerHTML = '<i class="fa fa-remove"></i>';
                //append the link to li
                li.appendChild(link);

                //apend li to ul
                taskList.appendChild(li);
            });
        }
        
        //Add Task
        function addTask(e)
        {
            if(taskInput.value === '') {
                alert('Add a task');
                
            }

            else {
            //Create li element
            const li = document.createElement('li');
            //Add Clas
            li.className = 'collection-item';
            //Create a textNode and append it to li
            li.appendChild(document.createTextNode(taskInput.value));
            //Create new link element
            const link = document.createElement('a');
            //Adding a class
            link.className = 'delete-item secondary-content';
            //Add icon html
            link.innerHTML = '<i class="fa fa-remove"></i>';
            //append the link to li
            li.appendChild(link);

            //apend li to ul
            taskList.appendChild(li);
            
            //Store task in local storage
            storeInLocalStorage(taskInput.value);

            //clear input
            taskInput.value = '';
            
            //head change
            
            }



            
            e.preventDefault();
        }
        

        //Store Task(s) in local Storage
        function storeInLocalStorage(task)
        {
            let tasks;
            if(localStorage.getItem('tasks')===null) {
                tasks = [];
            } else {
                tasks = JSON.parse(localStorage.getItem('tasks')); 

            }

            tasks.push(task);

            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        //Remove Task
        function removeTask(e)
        {
            if(e.target.parentElement.classList.contains('delete-item')) {
                if(confirm("Are you sure?")){
                e.target.parentElement.parentElement.remove();
                
                //Remove from Local Storage
                removeTaskFromLocalStorage(e.target.parentElement.parentElement);
                }
            }

            e.preventDefault();

        
        }


        //Remove From Local Storage
        function removeTaskFromLocalStorage(taskItem)
        {
            let tasks;
            if(localStorage.getItem('tasks')===null) {
                tasks = [];
            } else {
                tasks = JSON.parse(localStorage.getItem('tasks')); 

            }
            
            tasks.forEach(function(task, index){
                if(taskItem.textContent === task) {
                   tasks.splice(index,1);
                }
            });

            localStorage.setItem('tasks', JSON.stringify(tasks));

        }
        
        //clear tasks faster
        function clearTaskFast(e)
        {
            if(confirm('Are You Sure?'))
            {
              while(taskList.firstChild){
                taskList.removeChild(taskList.firstChild);
               }
            }

            clearTasksFromlocalStorage();
            e.preventDefault();
        }

        //Clear Tasks from Local Storage
        function clearTasksFromlocalStorage() 
        {
            localStorage.clear();
        }
            
        //Filter Task
        function filterTasks(e)
        {
            const text = e.target.value.toLowerCase();
            
            document.querySelectorAll('.collection-item').forEach
            (
                function(task)
                {
                    const item = task.firstChild.textContent;
                    if(item.toLowerCase().indexOf(text) != -1) {
                        task.style.display = 'block';


                    } else {
                        task.style.display = 'none';
                    }
                }
            );
            

            e.preventDefault();
        }



        } 
        
        
        else{
            alert("Sorry, Access Denied!! Check your username and password"); 
            window.location.reload();
        }
            
        
    }



var person = prompt("Please enter your name\n *For the demo Username is 'Somesh'");
var password = prompt("Enter your password\n *For the demo Password is '2001' ");

signIn(person,password);
    

