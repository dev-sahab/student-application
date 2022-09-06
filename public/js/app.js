// data table 
$('.student-data-table').dataTable();

// get elements
const file = document.getElementById('add_file');
const photo = document.getElementById('pre_photo');
const stu_name = document.querySelector('#student_data_create input[name="name"]');
const stu_mail = document.querySelector('#student_data_create input[name="mail"]');
const stu_phone = document.querySelector('#student_data_create input[name="phone"]');
const stu_locat = document.querySelector('#student_data_create input[name="location"]');
const stu_submit = document.querySelector('#student_data_create input[type="submit"]');
const deleteBtn = document.querySelectorAll('.delete-btn')

if (deleteBtn) {
    
    deleteBtn.forEach(item => {

        item.onclick = () => {
            const conf = confirm("Are you sure ?");

            if (conf) {
                return true;
            }
            else {
                return false
            }
        }
    })

}

if (file) {

    photo.onclick = () => {
        file.click();
    }
    
    file.onchange = (e) => {
        const imageLink = URL.createObjectURL(e.target.files[0]);
        photo.src = imageLink
    }

}





// if (!stu_name.value || !stu_mail.value || !stu_phone.value || !stu_locat.value) {
//     stu_submit.style.opacity = ".7"
//     stu_submit.style.pointerEvents = "none";
// }
// else{
//     stu_submit.style.opacity = "1"
//     stu_submit.style.pointerEvents = "auto";
// }
// console.log( !stu_name);
// stopPropagation()