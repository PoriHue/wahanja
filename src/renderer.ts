import './index.css';
import { ipcRenderer, Menu } from 'electron';

const error = document.getElementById("error") as HTMLDivElement;
const correct = document.getElementById("correct") as HTMLDivElement;
const submit = document.getElementById("submit") as HTMLButtonElement;
const file = document.getElementById("file") as HTMLButtonElement;
const hanjaString = document.getElementById("hanja") as HTMLHeadingElement
const hunInput = document.getElementById("hun") as HTMLInputElement
const meanInput = document.getElementById("mean") as HTMLInputElement

let isLoad = false;
let point: number = 0;
let score: number = 0;

let hanja: string[][] = [];
const fileInput = document.createElement('input') as HTMLInputElement;
fileInput.type = 'file'; // 파일 선택 기능 활성화
fileInput.style.display = 'none';
fileInput.accept='.whj' 

var errorCount:number = 0;


file.addEventListener("click", (e) => {
    e.preventDefault()
    fileInput.click()
});
fileInput.addEventListener('change', (event: Event) => {
    event.preventDefault()
    const target = event.target as HTMLInputElement;
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const content = e.target?.result as string;
        const lines = content.split(/\r?\n/);
        console.log(lines[0])
        for(var i = 0; i < lines.length; i++){
            hanja[i] = lines[i].split(',')
        }
        if(hanja[0] != undefined){
            isLoad =true
            hanjaString.textContent = hanja[point][0];
        }else{
            isLoad = false
            alert("불러오기 실패")
        }
    };
    reader.readAsText(file);
})

const clickButton = () => {
    console.log(hanja)
    if(isLoad){
        if(submitFun()){
            console.log("a")
            score++;
            correct.textContent = "CORRECT! : "+ score
            if(hanja.length <= point)
                point = 0;
            hanjaString.textContent = hanja[point][0]
            console.log(point)
        }else{
            errorCount++;
            error.textContent = "ERROR! : "+errorCount;
        }
    }else{
        alert("로딩된 whj(wahanja)파일 없음")
    }
}

const submitFun = (): boolean => {
    if(meanInput.value == hanja[point][2] && hunInput.value == hanja[point][1]){
        console.log("asdass")
        return true;
    }else{
        return false;
    }
}

submit.addEventListener('click', (e) => {
    e.preventDefault()
    clickButton()
});



