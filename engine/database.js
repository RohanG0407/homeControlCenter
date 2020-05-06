window.$ = window.jquery = require('jquery');
window.dt = require('datatables.net')();
const {ipcRenderer} = require('electron');
const tick = Date.now();
const log = (v) => console.log(`${v} \n Elapsed: ${Date.now() - tick}ms`);

var dat = window.$('#table_id').DataTable({
    'scrollY': "650px",
    "scrollCollapse": true,
    "lengthChange": true,
    'paging': true,
    "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
    "stateSave": true
});
let inside_table = document.getElementById('table_body');

ipcRenderer.send('firebaseM', "Hello");

ipcRenderer.on('firebaseR', (event, args) => {
   let newText;
   log("Started drawing")
   for(var a = 0; a < Object.keys(args).length; a++) {
       let dt =  args[a].t.getFullYear() + "-" + (args[a].t.getMonth() + 1) + "-" +  args[a].t.getDate();
       let tm = args[a].t.getHours() + "-" + args[a].t.getMinutes() + "-" + args[a].t.getSeconds();
       dat.row.add([
           dt,
           tm,
           args[a].y,
           'N/A',
       ])
   }

   dat.draw(false);
});

dat.on('draw', () => {
    log("Done drawing");
});







