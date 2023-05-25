function form_validation(){
    let project_ID = document.forms['new_project_form']['project_ID'].value;
    let project_name = document.forms['new_project_form']['project_name'].value;
    let project_start_date = document.forms['new_project_form']['project_start_date'].value;
    let est_end_date = document.forms['new_project_form']['est_end_date'].value;
    let est_labour_cost = document.forms['new_project_form']['est_labour_cost'].value;
    let est_total_cost = document.forms['new_project_form']['est_total_cost'].value;

    if (project_ID = '' || project_name == '' || project_start_date == '' || est_end_date == '' || est_labour_cost == '' || est_total_cost == ''){
        alert('Basic info not given properly. Please enter all info')
        return false
    }
    var date1 = new Date(project_start_date);
    var date2 = new Date(est_end_date);
    
    var difference_in_time = date2.getTime() - date1.getTime();
    var difference_in_days = difference_in_time / (1000 * 3600 * 24);

    if (difference_in_days <=0) {
        alert('Invalid pair of dates. Please change')
        return false
    }

    if (est_labour_cost >= est_total_cost){
        alert('Labour Cost cant be more than Total Cost')
        console.log(est_labour_cost)
        console.log(est_total_cost)
        return false
    }
}

function download_csv_file() {

const mongoexport = require('mongoexport');
const options = {
uri: 'mongodb+srv://Kavignaani:STE952R@cluster0.dp6plma.mongodb.net/FabHeads',
collection: 'projects_lists',
fields: 'project_ID,project_name,project_start_date,est_end_date,est_labour_cost,est_total_cost,cumulative_total_expense',
out: 'output.csv'
};
}
