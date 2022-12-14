let documentsUl = document.getElementsByClassName('documents');
let myDocuments = {
    my: [],
    unsigned: [],
    signed: []
};

async function getAllDocuments() {
    myDocuments.my = await myContracts();
    myDocuments.unsigned = await myUnsignedDocuments();
    myDocuments.unsigned = await mySignedDocuments();

    console.log(myDocuments);

    listDocuments();
}


function listDocuments() {
    
    let signeds = myDocuments.signed.map((file, index) => {
        return `<li class="signed-document" id="signed-document-${index}">
                    <p>chave: ${file.key}</p>
                    <p>nome do arquivo: ${file.name}</p>
                    <p>data: ${new Intl.DateTimeFormat('pt-br', {timeStyle: 'short', dateStyle: 'short'}).format(new Date(file.datetime))}</p>
                </li>`
    });

    let unsigneds = myDocuments.unsigned.map((file, index) => {
        return `<li class="unsigned-document" id="unsigned-document-${index}">
                    <p>chave: ${file.key}</p>
                    <p>nome do arquivo: ${file.name}</p>
                    <p>data: ${new Intl.DateTimeFormat('pt-br', {timeStyle: 'short', dateStyle: 'short'}).format(new Date(file.datetime))}</p>
                </li>`
    });

    let my = myDocuments.signed.map((file, index) => {
        return `<li class="my-document" id="my-document-${index}">
                    <p>chave: ${file.key}</p>
                    <p>nome do arquivo: ${file.name}</p>
                    <p>data: ${new Intl.DateTimeFormat('pt-br', {timeStyle: 'short', dateStyle: 'short'}).format(new Date(file.datetime))}</p>
                </li>`
    });

    documentsUl.appendChild(...unsigneds);
    documentsUl.appendChild(...signeds);
    documentsUl.appendChild(...my);
}