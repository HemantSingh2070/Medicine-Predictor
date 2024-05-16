import { GoogleGenerativeAI } from "@google/generative-ai";
let age = document.getElementById("age");
let day = document.getElementById("day");
let symptom = document.getElementById("symptom");
let submit = document.getElementById("submit");
let output = document.getElementById("generatedText");
const API_KEY = "AIzaSyAGArg8y-tifLLaB3W3EQ5uVRJdzPOtXUA"; 
const genAI = new GoogleGenerativeAI(API_KEY);
document.getElementById("reset").addEventListener('click',()=>{
    window.location.reload();
})
async function textGenerate(itext) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const prompt = itext;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);

  return text;
}

function out() {
  let inp = `Can predict the medicine and cause of ${symptom.value} from past ${day.value} my current age is ${age.value}`;
  textGenerate(inp).then(text => {
  output.innerHTML ="<p>"+ text.split(/\*\*/g).map((item,index)=>{
  return `<span>${item}</span>`.replace(/\*/g,`<br><br>`).replace(/,/g,'');
  }).join("");
  })+"</p>";
}

submit.addEventListener('click', out);
