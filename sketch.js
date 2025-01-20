let userInput;
let button;
let userLine;
let response;
let poem = [];

function setup() {
  createCanvas(400, 400);
  userInput = createInput();
  userInput.position(20,20);
  button = createButton('add words');
  button.position(userInput.x,userInput.y + 20);
  button.mousePressed(newLine);
}

function draw() {
  background(220);
  writePoem();
}
function newLine(){
  userLine = userInput.value();
  userInput.value('');
  poem.push(userLine);

  let words = RiTa.tokenize(userLine);
  response = '';
  for(x = 0; x < words.length; x++){
    let rhymes = RiTa.rhymesSync(words[x]);
    // let alliterations = RiTa.alliterations(words[x]);
    console.log(alliterations);
    if (rhymes.length === 0){
      if(RiTa.isNoun(words[x])){
        response += RiTa.randomWord({ pos: "nn"});
      }else if(RiTa.isVerb(words[x])){
        response += RiTa.randomWord({ pos: "vb"});
      }else if(RiTa.isAdjective(words[x])){
        response += RiTa.randomWord({ pos: "jj"});
      }else {
        response += words[x];
      }
    } else{
      let changedWord = random(rhymes);
      if(x % 2 == 0){
        response += RiTa.pluralize(changedWord);
      }else{
        response += changedWord;
      }
    }
    response += ' ';
  }
  poem.push(response);
}
function writePoem(){
  for(x = 0; x < poem.length; x++){
    text(poem[x], 20, 100 + x * 20);
  }
}