document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "index.html" || currentPage === "") {
        handleHomePage();
    } else if (currentPage === "page3.html") {
        if (!localStorage.getItem('homepageCompleted')) {
            alert("Please complete the tasks on the Home page first!");
            window.location.href = 'index.html';
        } else {
            handlePage3();
        }
    } else if (currentPage === "page2.html") {
        if (!localStorage.getItem('page3Completed')) {
            alert("Please complete the tasks on Page 3 first!");
            window.location.href = 'page3.html';
        } else {
            handlePage2();
        }
    }

    function handleHomePage() {

        const colorSelector = document.getElementById('colorSelector');
        const changeColorBtn = document.getElementById('changeColorBtn');
        const nameInput = document.getElementById('nameInput');
        const submitNameBtn = document.getElementById('submitNameBtn');
        const taskStatus = document.getElementById('taskStatus');
        const nextPageBtn = document.getElementById('nextPageBtn');
        const radioButtons = document.querySelectorAll('input[type="radio"]');

        let colorChanged = false;
        let nameSubmitted = false;
        let radioSelected = false;

        changeColorBtn.addEventListener('click', function() {
            const selectedColor = colorSelector.value;
            if (selectedColor !== 'default') {
                document.body.style.backgroundColor = selectedColor;
                colorChanged = true;
                updateTaskStatus();
            }
        });

        submitNameBtn.addEventListener('click', function() {
            if (nameInput.value.trim() !== '') {
                nameSubmitted = true;
                updateTaskStatus();
            }
        });

        radioButtons.forEach(radio => {
            radio.addEventListener('change', function() {
                radioSelected = true;
                updateTaskStatus();
            });
        });

        function updateTaskStatus() {
            if (colorChanged && nameSubmitted && radioSelected) {
                taskStatus.textContent = "All tasks completed! You can now proceed to Page 2.";
                nextPageBtn.style.display = 'inline-block';
                localStorage.setItem('homepageCompleted', 'true');
            } else {
                taskStatus.textContent = "Please complete all tasks to proceed.";
                nextPageBtn.style.display = 'none';
            }
        }

        nextPageBtn.addEventListener('click', function() {
            if (localStorage.getItem('homepageCompleted')) {
                window.location.href = 'page2.html';
            }
        });

        function updateTaskStatus() {
            if (colorChanged && nameSubmitted && radioSelected) {
                taskStatus.textContent = "All tasks completed! You can now proceed to Page 3.";
                nextPageBtn.style.display = 'inline-block';
                localStorage.setItem('homepageCompleted', 'true');
            } else {
                taskStatus.textContent = "Please complete all tasks to proceed.";
                nextPageBtn.style.display = 'none';
            }
        }

        nextPageBtn.addEventListener('click', function() {
            if (localStorage.getItem('homepageCompleted')) {
                window.location.href = 'page3.html';
            }
        });
    }
    function handlePage3() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const slider = document.getElementById('slider');
        const sliderValue = document.getElementById('sliderValue');
        const taskStatus = document.getElementById('taskStatus');
        const nextPageBtn = document.getElementById('nextPageBtn');
    
        slider.addEventListener('input', function() {
            sliderValue.textContent = slider.value;
            updateTaskStatus();
        });
    
        checkboxes.forEach(checkbox => checkbox.addEventListener('change', updateTaskStatus));
    
        function updateTaskStatus() {
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            const sliderAtMax = parseInt(slider.value) === 100;
            
            if (allChecked && sliderAtMax) {
                taskStatus.textContent = "All tasks completed! You can now proceed to Page 2.";
                nextPageBtn.style.display = 'inline-block';
                localStorage.setItem('page3Completed', 'true');
            } else {
                taskStatus.textContent = "Please complete all tasks to proceed.";
                nextPageBtn.style.display = 'none';
            }
        }
    
        nextPageBtn.addEventListener('click', function() {
            if (localStorage.getItem('page3Completed')) {
                window.location.href = 'page2.html';
            }
        });
    }

    function handlePage2() {

        const slider = document.getElementById('slider');
        const sliderValue = document.getElementById('sliderValue');
        const itemList = document.getElementById('itemList');
        const taskStatus = document.getElementById('taskStatus');
        const nextPageBtn = document.getElementById('nextPageBtn');

        slider.addEventListener('input', function() {
            sliderValue.textContent = slider.value;
            updateTaskStatus();
        });

        itemList.addEventListener('change', updateTaskStatus);

        function updateTaskStatus() {
            if (parseInt(slider.value) === 100 && itemList.value !== "") {
                taskStatus.textContent = "All tasks completed! You can now proceed to Page 3.";
                nextPageBtn.style.display = 'inline-block';
                localStorage.setItem('page2Completed', 'true');
            } else {
                taskStatus.textContent = "Please complete all tasks to proceed.";
                nextPageBtn.style.display = 'none';
            }
        }

        nextPageBtn.addEventListener('click', function() {
            if (localStorage.getItem('page2Completed')) {
                window.location.href = 'page3.html';
            }
        });

        function updateTaskStatus() {
            if (parseInt(slider.value) === 100 && itemList.value !== "") {
                taskStatus.textContent = "All tasks completed! Congratulations on finishing all pages!";
                completeBtn.style.display = 'inline-block';
                localStorage.setItem('page2Completed', 'true');
            } else {
                taskStatus.textContent = "Please complete all tasks to proceed.";
                completeBtn.style.display = 'none';
            }
        }

        completeBtn.addEventListener('click', function() {
            alert("Congratulations! You've completed all tasks on all pages!");
            localStorage.clear(); // Reset for demonstration purposes
        });
    }
});