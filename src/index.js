'use strict';
import '../assets/css/style.css';

const app = document.getElementById('app');
app.innerHTML = `<h1>JavaScript HTML5 APIs</h1>
    <div class="uploader">
        <h2 class="head2">Drag any file to upload it 📦</h2>
        <p>Only allowed is .png ,.jpg ,.svg </p>
        <input type="file" class="files" accept="image/*" multiple>
        <div class="dropzone">📂 Upload your file here</div>
        <div class="list"></div>
    </div>


    <style>
        .uploader{
            box-sizing:border-box;
            width:90%;
            margin: 25px auto;
            border-bottom:2px solid #999;
            background-color:#fff;
            padding:25px;
            border-radius:10px;
        }

        .dragme{
            height:30px;
            width:30px;
            padding:10px;
            border-radius:4px;
            background:cyan;
        }

        .dropzone{
            margin-top: 20px;
            padding:20px;
            border: 3px dotted #555;
            background:#f1f2f5;
            font-size:15px;
        }

        .active{
            background:#B5FFD9;
            border: 3px dotted #8FC1D4;
        }

        .head2{
            color:#F43B86;
            background:transparent;
            font-size:17px;
            margin-bottom:20px;
            padding:10px;
        }
    </style>
`;



const init = () => {
    const files = document.querySelector('.files');
    const list = document.querySelector('.list');
    const dropzone = document.querySelector('.dropzone');

    dropzone.addEventListener('dragenter',(e)=> e.target.classList.add('active'))
    dropzone.addEventListener('dragleave',(e)=> e.target.classList.remove('active'))

    dropzone.addEventListener('dragover', (e)=>{
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy'
    })

    dropzone.addEventListener('drop',(e)=>{
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.remove('active');
        const {files} = e.dataTransfer;
        handleFileToUpload(files);
    })

    const showFiles = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load',(e) =>{
            const div = document.createElement('div');
            div.innerHTML= `
            <div style="display:flex; ">
                <img style="width:40px; padding:10px;" 
                src="${e.target.result}"
                alt="${file.name}"> 
            <p>${file.name} <span>${file.size} bytes</span></p>
            
            </div>
            `
            list.append(div);
        })
    }

    files.addEventListener('change',(e)=>{
        const {files} = e.target;
        handleFileToUpload(files);
    })

    const uploadFiles = async (files) =>{
        const form = new FormData();
        [...files].forEach((file) => form.append(file.name,file))
        const request = await fetch('//dragdropfiles.glitch.me/upload',{
            method:'POST',
            body:form
        })

        return await request.json()
    }

    const isAllowedType = (file) => ['image/jpeg','image/png','imgage/svg+xml'].includes(file.type)
    
    const handleFileToUpload = async (files) => {
        const filesToUpload = [...files].filter(isAllowedType)
        filesToUpload.forEach(showFiles)
        const upload= uploadFiles(filesToUpload);

        if(upload){
            for(const imgs of upload.imges){
                console.log(imgs);
            }
        }
    } 


    document.addEventListener('dragover',(e) => e.preventDefault());
    document.addEventListener('drop',(e) => e.preventDefault())
}

if('draggable' in document.createElement('div')){
    init();
}

/////

let user = {
    firstname:'mohamed',
    lastname:'abdelaal',
    age:25
}

const func = function(){
    console.log(this.firstname);
}

let funcuser = func.bind(user);
funcuser();