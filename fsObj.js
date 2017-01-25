var readlineSync = require('readline-sync');
var prompt = require('prompt-sync')();
var exit = false;
var menu = [
    'Print current folder',
    'Change current folder',
    'Create file or folder',
    'Delete file or folder',
    'Search in file or folder',
    'Quit Program'
];

/* this will be the storage for our file system */
var fsStorage = [
    {
        id: 0,
        name: 'root',
        children: [{
            id: 1,
            name: 'sub1',
            children: [
                { id: 4, name: 'file1.txt', type: 'file' },
                {id: 5, name: 'wow', children: [], type: 'directory'}
            ],
            type: 'directory'
        },
            { id: 2, name: 'sub2', children: [], type: 'directory' },
            { id: 3, name: 'file2.txt',content:'text', type: 'file' }
        ],

        type: 'directory'
    }
];


var currentFolderId = 0;
var root = fsStorage[0];

function printChildren(id,file) {
    var result = undefined;
    if(file.id == id){
        return file;
    }
    for(var i = 0; i < file.children.length; ++i){
        if(file.children[i].id === id){
            return file.children[i];
        } else {
            if(file.children[i].type === 'directory'){
           result = printChildren(id,file.children[i]);
           if(result !== undefined){
               return result;
           }

        }
        }
    }

}

function printParent(currentObjId,file){
    var result = undefined;
    for(var i = 0; i < file.children.length; ++i){
        if(currentObjId === file.children[i].id){
            return file;
        } else{
            if(file.children[i].type === 'directory'){
            result = printParent(currentObjId, file.children[i]);
            if(result !== undefined){
                return result;}
            }
        }

    }
}






main();

function main() {
    while (!exit) {
        printMenu();
    }
    process.exit(0);
}

function printMenu() {
    var answer = readlineSync.keyInSelect(menu, 'Please make your choice:');
    switch (answer) {
        case 0: printCurrentFolder(); break;
        case 1: changeCurrentFolder(); break;
        case 2: createFileOrFolder(); break;
        case 3: deleteFileOrFolder(); break;
        case 4: searchInFileOrFolder(); break;
        case 5: quitProgram(); break;
    }
}

function printCurrentFolder() {
    var targetItem;
    console.log('printing current folder');

    targetItem = printChildren(currentFolderId,root);

    console.log("--"+targetItem.name);
    for(i = 0; i < targetItem.children.length; ++i){
        console.log("---"+ targetItem.children[i].name)
    }


}

function changeCurrentFolder() {
    var notFound = true;
    var currentObj = printChildren(currentFolderId,root);
    var fwrOrBck = prompt("move forward (..) or backward (cd/)")
    if( fwrOrBck === ".."){
    var answer = prompt("move to folder: ")
    for(var i = 0; i < currentObj.children.length; ++i ){
        if(currentObj.children[i].name === answer && currentObj.children[i].type === 'directory'){
            currentFolderId = currentObj.children[i].id;
            notFound = false;

        }
    }
    if(notFound === true){
        console.log("Directory not found")
    }

    }
    else if(fwrOrBck === "cd/"){
        if(currentFolderId > 0){
        var parent = printParent(currentFolderId,root)
            currentFolderId= parent.id;
        } else {
            currentFolderId == root.id;
            console.log("You are in Root")
        }
    }


}

function createFileOrFolder() {


     };

    function deleteFileOrFolder() {

    };




function searchInFileOrFolder() {

};

function quitProgram() {
    var answer = readlineSync.keyInYNStrict('Are you sure?');
    exit = answer ? true : false;
};


