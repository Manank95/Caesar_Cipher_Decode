let fs = require('fs');
let path = require('path');
let readline = require('readline');

let rl = readline.createInterface(process.stdin,process.stdout);

let ans;
rl.question("Enter the file name : ", function(name){
	ans =  name;
	outside();
	rl.close();
});

outside = function(){
	let text = fs.readFileSync(path.join(__dirname, ans),"utf8");

	console.log("\nEncoded text is : \n",text);

	let text2="";
	let num = 5;
	for (let i=0; i<text.length; i++){

		if(i && (i%3==0))
			num=num+2;

		if(text.charCodeAt(i)>64 && text.charCodeAt(i)<91){
			let mod = text.charCodeAt(i)-65-num;
			if (mod<0){
				let ns = (((mod%26)+26)%26)+65;
				text2 = text2 + String.fromCharCode(ns);
			}
			else{
				let ns = (mod%26)+65;
				text2 = text2 + String.fromCharCode(ns);
			}

		}


		else if(text.charCodeAt(i)>96 && text.charCodeAt(i)<123){
			let mod = text.charCodeAt(i)-97-num;
			if(mod<0){
				let ns = (((mod%26)+26)%26)+97;
				text2 = text2 + String.fromCharCode(ns);
			}
			else{
				let ns = (mod%26)+97;
				text2 = text2 + String.fromCharCode(ns);
			}
		}

		else text2 = text2 + text[i];
	}

	console.log("\n Decoded text is :\n",text2,"\n \ncheck the same in decoded.txt");
	fs.writeFileSync(path.join(__dirname, "decoded.txt"),text2);
}


